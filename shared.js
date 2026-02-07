document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('yimby-lang') || 'nl';
    setLang(savedLang);

    document.querySelectorAll('.lang-toggle button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setLang(btn.dataset.switchLang);
        });
    });

    function setLang(lang) {
        if (lang === 'nl') {
            document.body.classList.add('nl');
        } else {
            document.body.classList.remove('nl');
        }
        document.querySelectorAll('.lang-toggle button').forEach(b => {
            if (b.dataset.switchLang === lang) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        // Swap placeholders based on language
        document.querySelectorAll('[data-placeholder-en][data-placeholder-nl]').forEach(el => {
            if (lang === 'nl') {
                el.placeholder = el.dataset.placeholderNl;
            } else {
                el.placeholder = el.dataset.placeholderEn;
            }
        });

        localStorage.setItem('yimby-lang', lang);
    }

    // Mobile hamburger
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-links');
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => navList.classList.toggle('open'));
        navList.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => navList.classList.remove('open'))
        );
    }

    // Mark active nav link
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active');
    });

    // Form submission handling
    const form = document.getElementById('storyForm');
    const successMsg = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            const delays = [];
            document.querySelectorAll('input[name="delays"]:checked').forEach(checkbox => {
                delays.push(checkbox.value);
            });
            if (delays.length > 0) {
                formData.append('delays', delays.join(', '));
            }

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    form.style.display = 'none';
                    if (successMsg) { successMsg.style.display = 'block'; }
                    successMsg.scrollIntoView({ behavior: 'smooth' });
                } else {
                    const currentLang = document.body.classList.contains('nl') ? 'nl' : 'en';
                    const errorMsg = currentLang === 'nl'
                        ? 'Er was een probleem met je indiening. Probeer opnieuw.'
                        : 'There was an issue with your submission. Please try again.';
                    alert(errorMsg);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const currentLang = document.body.classList.contains('nl') ? 'nl' : 'en';
                const errorMsg = currentLang === 'nl'
                    ? 'Er was een probleem met je indiening. Probeer opnieuw.'
                    : 'There was an issue with your submission. Please try again.';
                alert(errorMsg);
            });
        });
    }
});
