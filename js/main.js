(function ($) {
    "use strict";

    // 1. Initialise Animations (WOW.js)
    new WOW().init();

    // 2. Preloader / Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    //test

    // 3. Theme Switcher Manager
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check saved local storage preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'bi bi-sun-fill';
            $('#navbar').removeClass('navbar-dark').addClass('navbar-light');
        } else {
            themeIcon.className = 'bi bi-moon-fill';
            $('#navbar').removeClass('navbar-light').addClass('navbar-dark');
        }
    }

    // 4. Facts Counter (Counter-Up)
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1500
    });

    // 5. Scroll Spy & Navbar Sticky Class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar-glass').addClass('shadow-sm py-2').removeClass('py-3');
        } else {
            $('.navbar-glass').removeClass('shadow-sm py-2').addClass('py-3');
        }

        // Back to top button
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').css('display', 'flex').fadeIn('slow');
        } else {
            $('#back-to-top').fadeOut('slow');
        }

        // Active navigation link tracking on scroll
        const scrollPos = $(window).scrollTop() + 150;
        $('section').each(function () {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();
            const id = $(this).attr('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                $('.navbar-nav .nav-link').removeClass('active');
                $('#nav-link-' + id).addClass('active');
            }
        });
    });

    // 6. Typed.js Initialization
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 60,
            backSpeed: 30,
            smartBackspace: true,
            loop: true
        });
    }

    // 7. Smooth scrolling to sections
    $('a.nav-link, a.btn-scroll, .navbar-brand').on('click', function (event) {
        const hash = this.hash;
        if (hash !== "" && $(hash).length) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 1000, 'easeInOutExpo');

            // Collapse mobile menu if open
            $('.navbar-collapse').collapse('hide');
        }
    });

    // 8. Dynamic Skill Bar Waypoint Animation
    $('.skills-section, #skills').waypoint(function () {
        $('.skill-bar-fill').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {
        offset: '85%'
    });

    // 9. Portfolio Filter and Isotope Integration
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters button').on('click', function () {
        $("#portfolio-flters button").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({
            filter: $(this).data('filter')
        });
    });

    // 10. Contact Form Interactive Feedback
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading / sending status on button
            const submitBtn = document.getElementById('contact-form-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';

            // Simulate form dispatch delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;

                // Show success alert
                contactSuccess.classList.remove('d-none');
                contactForm.reset();

                // Fade alert after 5 seconds
                setTimeout(() => {
                    $(contactSuccess).fadeOut('slow', function () {
                        $(this).addClass('d-none').show();
                    });
                }, 5000);
            }, 1200);
        });
    }

    // 11. Back to Top Action
    $('#back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
        return false;
    });

})(jQuery);
