const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((el) => revealObserver.observe(el));

const leadForm = document.querySelector('.lead-form');
const WHATSAPP_NUMBER = '966500000000';

if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(leadForm);
        const name = String(formData.get('name') || '').trim();
        const phone = String(formData.get('phone') || '').trim();
        const time = String(formData.get('time') || '').trim();

        const message = [
            'السلام عليكم،',
            'أرغب بحجز زيارة ميدانية للشقة في حي النرجس.',
            `الاسم: ${name}`,
            `رقم الجوال: ${phone}`,
            `الوقت المناسب للتواصل: ${time}`,
        ].join('\n');

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.location.assign(whatsappUrl);
    });
}
