document.addEventListener('DOMContentLoaded', () => {
    // Mobile hamburger
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-links');
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => navList.classList.toggle('open'));
        navList.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => navList.classList.remove('open'))
        );
    }

    // Form submission handling
    const form = document.getElementById('storyForm');
    const successMsg = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const delays = [];
            document.querySelectorAll('input[name="delays"]:checked').forEach(checkbox => {
                delays.push(checkbox.value);
            });

            const data = {
                naam: form.name.value,
                email: form.email.value,
                gemeente: form.municipality.value,
                projecttype: form.projectType.value,
                oorzaken: delays.join(', '),
                verhaal: form.story.value,
                vertraging_maanden: form.delayMonths.value,
                toestemming_review: form.elements['consent-review'].checked,
                toestemming_contact: form.elements['consent-contact'].checked,
                toestemming_content: form.elements['consent-feature'].checked,
                toestemming_naam: form.elements['consent-named'].checked,
                datum: new Date().toISOString()
            };

            fetch(form.action, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(data)
            })
            .then(() => {
                form.style.display = 'none';
                if (successMsg) { successMsg.style.display = 'block'; }
                successMsg.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Er was een probleem met je indiening. Probeer opnieuw.');
            });
        });
    }
});
