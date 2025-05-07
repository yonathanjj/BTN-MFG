document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500);
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') ||
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Update icon based on current theme
    if (savedTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Toggle icon
        if (newTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize Swiper sliders
    const projectsSlider = new Swiper('.projects-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });

    // Block Calculator Functionality
    const blockTypeSelect = document.getElementById('block-type');
    const wallLengthInput = document.getElementById('wall-length');
    const wallHeightInput = document.getElementById('wall-height');
    const wasteFactorInput = document.getElementById('waste-factor');
    const calculateBtn = document.getElementById('calculate-btn');
    const wastePercent = document.getElementById('waste-percent');

    const resultType = document.getElementById('result-type');
    const resultArea = document.getElementById('result-area');
    const resultBlocks = document.getElementById('result-blocks');
    const resultTotal = document.getElementById('result-total');

    const wallGrid = document.querySelector('.wall-grid');
    const wallLengthDimension = document.querySelector('.dimension.length');
    const wallHeightDimension = document.querySelector('.dimension.height');

    // Update waste percentage display
    wasteFactorInput.addEventListener('input', () => {
        wastePercent.textContent = `${wasteFactorInput.value}%`;
    });

    // Calculate blocks function
    function calculateBlocks() {
        const blockType = blockTypeSelect.value;
        const length = parseFloat(wallLengthInput.value) || 0;
        const height = parseFloat(wallHeightInput.value) || 0;
        const wasteFactor = parseFloat(wasteFactorInput.value) || 0;

        // Calculate wall area in square meters
        const area = length * height;

        // Blocks per square meter based on block type
        let blocksPerSqm;
        let blockName;
        let blockWidth, blockHeight;

        switch(blockType) {
            case 'standard':
                blocksPerSqm = 12.5; // 400x200mm blocks
                blockName = 'Standard Blocks';
                blockWidth = 0.4; // meters
                blockHeight = 0.2; // meters
                break;
            case 'hollow':
                blocksPerSqm = 12.5; // 400x200mm blocks
                blockName = 'Hollow Blocks';
                blockWidth = 0.4;
                blockHeight = 0.2;
                break;
            case 'paving':
                blocksPerSqm = 50; // 200x100mm pavers
                blockName = 'Paving Blocks';
                blockWidth = 0.2;
                blockHeight = 0.1;
                break;
            default:
                blocksPerSqm = 12.5;
                blockName = 'Blocks';
                blockWidth = 0.4;
                blockHeight = 0.2;
        }

        // Calculate total blocks needed
        const blocksNeeded = Math.ceil(area * blocksPerSqm);
        const totalWithWaste = Math.ceil(blocksNeeded * (1 + wasteFactor/100));

        // Update results
        resultType.textContent = blockName;
        resultArea.textContent = area.toFixed(1) + ' m²';
        resultBlocks.textContent = blocksNeeded;
        resultTotal.textContent = totalWithWaste + ' blocks';

        // Update wall visualization
        wallLengthDimension.textContent = length.toFixed(1) + 'm';
        wallHeightDimension.textContent = height.toFixed(1) + 'm';

        // Create block grid pattern
        wallGrid.style.backgroundSize = `${blockWidth * 100}% ${blockHeight * 100}%`;
    }

    // Initial calculation
    calculateBlocks();

    // Recalculate on input changes
    [blockTypeSelect, wallLengthInput, wallHeightInput, wasteFactorInput].forEach(input => {
        input.addEventListener('input', calculateBlocks);
    });

    calculateBtn.addEventListener('click', calculateBlocks);

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;

            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Sending...';

            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.classList.remove('primary-btn');
                submitBtn.classList.add('success-btn');

                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.classList.remove('success-btn');
                    submitBtn.classList.add('primary-btn');
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
