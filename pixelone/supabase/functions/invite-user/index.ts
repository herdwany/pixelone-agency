// @ts-nocheck
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type InvitePayload = {
  email?: string;
  role?: 'client' | 'admin';
  redirectTo?: string;
};

const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') || 'https://www.pixelonevisuals.tech,https://pixelonevisuals.tech')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function getCorsHeaders(origin: string | null) {
  const fallbackOrigin = allowedOrigins[0] || 'https://www.pixelonevisuals.tech';
  const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : fallbackOrigin;

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

function json(status: number, body: Record<string, unknown>, corsHeaders: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' }, corsHeaders);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return json(500, { error: 'Server env is not configured' }, corsHeaders);
  }

  const authHeader = req.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) {
    return json(401, { error: 'Missing bearer token' }, corsHeaders);
  }

  const userScopedClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userError } = await userScopedClient.auth.getUser();
  if (userError || !userData.user?.email) {
    return json(401, { error: 'Invalid session token' }, corsHeaders);
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const requesterEmail = userData.user.email.toLowerCase();
  const { data: adminRow, error: adminCheckError } = await adminClient
    .from('pixel_admin_users')
    .select('email')
    .eq('email', requesterEmail)
    .maybeSingle();

  if (adminCheckError || !adminRow) {
    return json(403, { error: 'Only admins can invite users' }, corsHeaders);
  }

  let payload: InvitePayload;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: 'Invalid JSON body' }, corsHeaders);
  }

  const email = String(payload.email || '').trim().toLowerCase();
  const role = payload.role === 'admin' ? 'admin' : 'client';
  const redirectTo = String(payload.redirectTo || '').trim();

  if (!email || !email.includes('@')) {
    return json(400, { error: 'Valid email is required' }, corsHeaders);
  }

  const inviteResult = await adminClient.auth.admin.inviteUserByEmail(email, {
    redirectTo: redirectTo || undefined,
    data: { role },
  });

  if (inviteResult.error) {
    return json(400, { error: inviteResult.error.message }, corsHeaders);
  }

  if (role === 'admin') {
    const { error: upsertAdminError } = await adminClient
      .from('pixel_admin_users')
      .upsert({ email }, { onConflict: 'email' });

    if (upsertAdminError) {
      return json(500, {
        error: 'Invite sent but failed to register admin role',
        details: upsertAdminError.message,
      }, corsHeaders);
    }
  }

  const { error: auditError } = await adminClient
    .from('pixel_invite_audit')
    .insert({
      inviter_email: requesterEmail,
      invited_email: email,
      invited_role: role,
    });

  if (auditError) {
    return json(500, {
      error: 'Invite sent but failed to write invite audit log',
      details: auditError.message,
    }, corsHeaders);
  }

  return json(200, {
    success: true,
    message: 'Invitation sent successfully',
    invitedEmail: email,
    role,
  }, corsHeaders);
});
