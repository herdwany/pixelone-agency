const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../pixelone/content');
const files = fs.readdirSync(dir).filter(f => f.startsWith('service-') && f.endsWith('.ar.json'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // CRO for Meta Description and Title based on filename
    if (parsed.title) {
        parsed.title = parsed.title.replace(' | Pixel One Visuals', ' | نتائج واقعية لعملك');
    }
    if (parsed.metaDescription) {
        // Less exaggerated, more trust focused for Moroccan market
        parsed.metaDescription = parsed.metaDescription.replace('عالية التحويل', 'فعالة ومدروسة');
        parsed.metaDescription += ' تواصل معنا لاستشارة مجانية.';
    }

    // Modal Array CRO Update
    if (parsed.texts && parsed.texts.length === 12) {
        // 2: إرسال طلب الخدمة -> الحصول على تفاصيل الخدمة
        parsed.texts[2] = "تواصل لمناقشة التفاصيل";
        // 10: إرسال الطلب عبر واتساب -> تواصل معنا الآن عبر واتساب
        parsed.texts[10] = "تأكيد الطلب عبر واتساب";
        // 11: تم استلام طلبك بنجاح...
        parsed.texts[11] = "توصلنا بطلبك بنجاح! فريقنا غيتواصل معاك فقرب وقت عبر واتساب لمناقشة التفاصيل والأسعار بكل شفافية.";
    }

    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 4), 'utf8');
}
console.log('Updated ' + files.length + ' service files with CRO copy.');