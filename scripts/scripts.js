var customMessage = "Hi! Funny seeing you here. My landing page at www.ickysailor.com is manually coded. Then I import it into shop.ickysailor.com, which is wordpress based."; 
console.log(customMessage);

window.logCustom = function(msg) {
    console.log(msg);
};

// ---------------------------
// Viewport Fix
// ---------------------------
function setRealViewportHeight() {
  const vh = window.visualViewport ? window.visualViewport.height * 0.01 : window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setRealViewportHeight);
window.addEventListener('orientationchange', setRealViewportHeight);
setRealViewportHeight();

// ---------------------------
// DOM
// ---------------------------
document.addEventListener('DOMContentLoaded', function() {

    // -------- IntersectionObserver Fade-in --------
    var elements = document.querySelectorAll('aside, section, article, footer');
    var observer = new IntersectionObserver(function(entries, observer) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('show');
                observer.unobserve(entries[i].target);
            }
        }
    }, { threshold: 0.1 });

    for (var j = 0; j < elements.length; j++) {
        observer.observe(elements[j]);
    }

// ---------------------------
// Freeze! Mobile Menu
// ---------------------------
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    let locked = false;
    let scrollY = 0;

    function lockBody() {
        scrollY = window.scrollY || document.documentElement.scrollTop;
        document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.documentElement.classList.add('menu-open');
        document.body.classList.add('menu-open');
        document.addEventListener('touchmove', preventTouch, { passive: false });
        locked = true;
    }

    function unlockBody() {
        document.removeEventListener('touchmove', preventTouch, { passive: false });
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        const storedY = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--scroll-y') || '0', 10);
        window.scrollTo(0, storedY || scrollY);
        document.documentElement.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
        locked = false;
    }

    function preventTouch(e) { e.preventDefault(); }

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                const isOpen = navLinks.classList.toggle('active');
                if (isOpen) lockBody();
                else unlockBody();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (locked) unlockBody();
            }
        });

        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                if (locked) unlockBody();
            }
        });
    }

// ---------------------------
// Slideshow
// ---------------------------
    const imgEl = document.getElementById("slideshow");
    const images = [
        "img/imgsample1.webp",
        "img/imgsample2.webp",
        "img/imgsample3.webp",
        "img/imgsample4.webp",
        "img/imgsample5.webp",
        "img/imgsample6.webp"
    ];
    let current = 0;
    let slideshow;

    if (imgEl) {
        function fadeToNextImage() {
            imgEl.style.opacity = 0;
            setTimeout(() => {
                current = (current + 1) % images.length;
                imgEl.src = images[current];
                imgEl.style.opacity = 1;
            }, 1000);
        }

        function startSlideshow() {
            slideshow = setInterval(fadeToNextImage, 4000);
        }

        function stopSlideshow() {
            clearInterval(slideshow);
        }

        startSlideshow();

        // Desktop hover pause
        imgEl.addEventListener("mouseenter", stopSlideshow);
        imgEl.addEventListener("mouseleave", startSlideshow);

        // Mobile touch pause
        imgEl.addEventListener("touchstart", stopSlideshow);
        imgEl.addEventListener("touchend", startSlideshow);
        imgEl.addEventListener("touchcancel", startSlideshow);
    }

});
