// script.js - Dengle Landing Interactivity

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. View Switcher (B2C vs B2B) ---
    const btnB2c = document.getElementById('btn-b2c');
    const btnB2b = document.getElementById('btn-b2b');
    const viewB2c = document.getElementById('view-b2c');
    const viewB2b = document.getElementById('view-b2b');
    
    function switchView(target) {
        if (target === 'b2c') {
            btnB2c.classList.add('active');
            btnB2b.classList.remove('active');
            viewB2c.style.display = 'block';
            viewB2b.style.display = 'none';
        } else {
            btnB2b.classList.add('active');
            btnB2c.classList.remove('active');
            viewB2c.style.display = 'none';
            viewB2b.style.display = 'block';
        }
    }

    btnB2c.addEventListener('click', () => switchView('b2c'));
    btnB2b.addEventListener('click', () => switchView('b2b'));

    // --- 2. Store Horizontal Scroll (Drag to scroll) ---
    const storeContainer = document.querySelector('.store-scroll-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    if(storeContainer) {
        storeContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            storeContainer.classList.add('active');
            startX = e.pageX - storeContainer.offsetLeft;
            scrollLeft = storeContainer.scrollLeft;
        });
        storeContainer.addEventListener('mouseleave', () => {
            isDown = false;
            storeContainer.classList.remove('active');
        });
        storeContainer.addEventListener('mouseup', () => {
            isDown = false;
            storeContainer.classList.remove('active');
        });
        storeContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - storeContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            storeContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // --- 3. Simple Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --- 4. B2B Problem Cart Remove Item ---
    const removeIcons = document.querySelectorAll('.cart-items li i.fa-times');
    removeIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const li = this.parentElement;
            li.style.opacity = '0';
            setTimeout(() => {
                li.remove();
            }, 300);
        });
    });

    // --- 5. Donut Chart Animation Trigger ---
    // The CSS animation handles the initial load, 
    // but we ensure it plays nicely when scrolled into view if needed.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target.querySelector('.circle');
                if(circle) {
                    // Reset animation trick
                    circle.style.animation = 'none';
                    circle.offsetHeight; /* trigger reflow */
                    circle.style.animation = null; 
                }
            }
        });
    });
    
    const chartCard = document.querySelector('.result-card');
    if(chartCard) observer.observe(chartCard);

});
