-- Add columns to store dynamic service detail content
-- This allows managing service page content directly from the admin dashboard
-- instead of hardcoding it in app.js

ALTER TABLE public.pixel_services
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS image_alt_ar TEXT,
ADD COLUMN IF NOT EXISTS deliverables_ar JSONB,
ADD COLUMN IF NOT EXISTS requirements_ar JSONB,
ADD COLUMN IF NOT EXISTS workflow_ar JSONB,
ADD COLUMN IF NOT EXISTS turnaround_ar TEXT,
ADD COLUMN IF NOT EXISTS revisions_ar TEXT;

-- Add comments to describe the new columns for future reference
COMMENT ON COLUMN public.pixel_services.image_url IS 'URL for the main service detail image.';
COMMENT ON COLUMN public.pixel_services.image_alt_ar IS 'Arabic alt text for the service detail image.';
COMMENT ON COLUMN public.pixel_services.deliverables_ar IS 'JSON array of strings describing service deliverables in Arabic. Example: ["Deliverable 1", "Deliverable 2"]';
COMMENT ON COLUMN public.pixel_services.requirements_ar IS 'JSON array of strings describing service requirements in Arabic. Example: ["Requirement 1", "Requirement 2"]';
COMMENT ON COLUMN public.pixel_services.workflow_ar IS 'JSON array of strings describing the service workflow in Arabic. Example: ["Step 1", "Step 2"]';
COMMENT ON COLUMN public.pixel_services.turnaround_ar IS 'Text describing the expected turnaround time in Arabic.';
COMMENT ON COLUMN public.pixel_services.revisions_ar IS 'Text describing the revision policy in Arabic.';

-- Note: After running this, you might want to run a one-time script
-- to migrate the existing hardcoded content from app.js into these new columns for existing services.
