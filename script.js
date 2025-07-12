document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. DYNAMIC & INTERACTIVE CURSOR
    // =========================================================================
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorCircle = document.createElement('div');
    cursorCircle.className = 'cursor-circle';
    document.body.appendChild(cursorCircle);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let circleX = 0, circleY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Dot movement (immediate)
        dotX = mouseX;
        dotY = mouseY;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

        // Circle movement (eased)
        const dX = mouseX - circleX;
        const dY = mouseY - circleY;
        circleX += dX * 0.15;
        circleY += dY * 0.15;
        cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add styles for the cursor
    const cursorStyles = `
        .cursor-dot, .cursor-circle {
            position: fixed;
            top: -20px; left: -20px;
            pointer-events: none;
            border-radius: 50%;
            z-index: 9999;
            transition: transform 0.15s ease-out, opacity 0.3s, width 0.3s, height 0.3s;
        }
        .cursor-dot {
            width: 8px; height: 8px;
            background-color: var(--primary-color);
        }
        .cursor-circle {
            width: 40px; height: 40px;
            border: 2px solid var(--primary-color);
            background-color: transparent;
        }
        .cursor-hover {
            transform: scale(2.5);
            opacity: 0.5;
        }
        body { cursor: none; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = cursorStyles;
    document.head.appendChild(styleSheet);

    // Cursor hover effects on links and buttons
    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursorCircle.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorCircle.classList.remove('cursor-hover'));
    });


    // =========================================================================
    // 2. PROFESSIONAL TYPING ANIMATION
    // =========================================================================
    const professionTextElement = document.querySelector('.profession-text');
    if (professionTextElement) {
        const professions = ["Creative Web Developer", "Full-Stack Innovator", "UI/UX Enthusiast", "Problem Solver"];
        let professionIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeAnimation() {
            const currentProfession = professions[professionIndex];
            let displayText = '';

            if (isDeleting) {
                displayText = currentProfession.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentProfession.substring(0, charIndex + 1);
                charIndex++;
            }
            
            professionTextElement.textContent = displayText;
            professionTextElement.classList.add('typing'); // Add cursor effect via CSS

            let typeSpeed = isDeleting ? 75 : 150;

            if (!isDeleting && charIndex === currentProfession.length) {
                typeSpeed = 2000; // Pause at the end of the word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length;
                typeSpeed = 500; // Pause before typing new word
            }

            setTimeout(typeAnimation, typeSpeed);
        }
        typeAnimation();
        
        // Add CSS for typing cursor
        const typingStyles = `.profession-text.typing::after {
            content: '|';
            animation: blink 0.7s infinite;
            color: var(--primary-color);
        } @keyframes blink { 50% { opacity: 0; } }`;
        const typingStyleSheet = document.createElement("style");
        typingStyleSheet.innerText = typingStyles;
        document.head.appendChild(typingStyleSheet);
    }
    

    // =========================================================================
    // 3. ENHANCED SCROLL REVEAL ANIMATION
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on the element's order in the DOM
                const delay = (entry.target.dataset.revealDelay || 0);
                entry.target.style.transitionDelay = `${delay}ms`;
                
                // Add a class to trigger the animation
                entry.target.classList.add('active');
                
                // Unobserve after revealing to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start animation a bit before it's fully in view
    });

    revealElements.forEach((el, index) => {
        // You can add a default stagger if you want, e.g., by setting data-reveal-delay
        // el.dataset.revealDelay = index * 100; 
        revealObserver.observe(el);
    });
    

    // =========================================================================
    // 4. "MAGNETIC" SOCIAL MEDIA ICONS
    // =========================================================================
    const magneticIcons = document.querySelectorAll('.home .social-links a');
    magneticIcons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            icon.style.transition = 'transform 0.1s linear';
            icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            icon.style.transform = 'translate(0, 0) scale(1)';
        });
    });


    // =========================================================================
    // 5. HEADER & NAVIGATION LOGIC
    // =========================================================================
    const header = document.querySelector('.header');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('header nav a');

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 100);
    });

    // Mobile menu toggle
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Close mobile menu and handle smooth scrolling on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile nav
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');

            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Highlight active nav link on scroll
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - header.offsetHeight - 50;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = sec.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});