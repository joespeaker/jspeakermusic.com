document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');

    // Header border once scrolled
    function handleScroll() {
        if (header) header.classList.toggle('scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile menu
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
            toggle.textContent = open ? 'close' : 'menu';
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = 'menu';
            });
        });
    }

    // Reveal sections as they come into view
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in'));
    }

    // Highlight the nav link for the section in view
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    if ('IntersectionObserver' in window && navLinks.length) {
        const navObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
    }
});
