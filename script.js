document.addEventListener('DOMContentLoaded', () => {

    /* --- Security: Anti-Copying Measures --- */
    
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Disable keyboard shortcuts used for DevTools and copying
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
        }
        // Ctrl+Shift+I (Inspector) / Ctrl+Shift+J (Console) / Ctrl+U (Source)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
            e.preventDefault();
        }
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
        }
        // Ctrl+C (Copy), Ctrl+A (Select All)
        if (e.ctrlKey && (e.key === 'C' || e.key === 'c' || e.key === 'A' || e.key === 'a')) {
            e.preventDefault();
        }
    });

    // Prevent drag and drop of text/images
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });


    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    /* --- Scroll Animations (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // adding slight delay based on css var if present
                const delay = entry.target.style.getPropertyValue('--delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* --- Modal Interaction Logic --- */
    const modal = document.getElementById('bookingModal');
    const bookBtns = document.querySelectorAll('#bookCallNav, #bookCallHero');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('contactForm');

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    bookBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form submission mock
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Booking...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.textContent = 'Successfully Booked!';
            btn.style.background = '#10b981'; // green
            btn.style.opacity = '1';
            
            setTimeout(() => {
                closeModal();
                form.reset();
                btn.textContent = originalText;
                btn.style.background = ''; // reset to default gradient
            }, 2000);
        }, 1500);
    });
});
