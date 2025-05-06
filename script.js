document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
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

    // Form submission
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            messageForm.reset();
        });
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Block Calculator Functionality
    const blockTypeSelect = document.getElementById('block-type');
    const wallLengthInput = document.getElementById('wall-length');
    const wallHeightInput = document.getElementById('wall-height');
    const wasteFactorInput = document.getElementById('waste-factor');
    const calculateBtn = document.getElementById('calculate-btn');

    const resultType = document.getElementById('result-type');
    const resultArea = document.getElementById('result-area');
    const resultBlocks = document.getElementById('result-blocks');
    const resultTotal = document.getElementById('result-total');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBlocks);

        // Calculate on input change
        [blockTypeSelect, wallLengthInput, wallHeightInput, wasteFactorInput].forEach(input => {
            input.addEventListener('change', calculateBlocks);
        });

        // Initial calculation
        calculateBlocks();
    }

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

        switch(blockType) {
            case 'standard':
                blocksPerSqm = 12.5; // 400x200mm blocks
                blockName = 'Standard Blocks';
                break;
            case 'hollow':
                blocksPerSqm = 12.5; // 400x200mm blocks
                blockName = 'Hollow Blocks';
                break;
            case 'paving':
                blocksPerSqm = 50; // 200x100mm pavers
                blockName = 'Paving Blocks';
                break;
            default:
                blocksPerSqm = 12.5;
                blockName = 'Blocks';
        }

        // Calculate total blocks needed
        const blocksNeeded = Math.ceil(area * blocksPerSqm);
        const totalWithWaste = Math.ceil(blocksNeeded * (1 + wasteFactor/100));

        // Update results
        resultType.textContent = blockName;
        resultArea.textContent = area.toFixed(1) + ' m²';
        resultBlocks.textContent = blocksNeeded;
        resultTotal.textContent = totalWithWaste + ' blocks';
    }

    // Simple animation for sections when they come into view
    function animateOnScroll() {
        const sections = document.querySelectorAll('.products-section, .calculator-section, .about-section, .contact-section');

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial check
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});