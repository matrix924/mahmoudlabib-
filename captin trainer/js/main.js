document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Simple mobile menu styling injection for active active state
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'fixed'; /* Fixed to cover screen */
                navLinks.style.top = '80px'; /* Below header */
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.height = 'calc(100vh - 80px)';
                navLinks.style.backgroundColor = '#0a0a0a';
                navLinks.style.padding = '40px 20px';
                navLinks.style.borderBottom = '1px solid var(--primary-color)';
                navLinks.style.alignItems = 'center';
                navLinks.style.gap = '25px';
                navLinks.style.zIndex = '999';
            } else {
                navLinks.style.cssText = ''; // Reset inline styles
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                navLinks.style.cssText = '';
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section-header, .package-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS class for animation via JS
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- Carousel Logic (Interactive) ---
    let slideIndex = 1;
    let timer;

    // Initial call
    if (document.querySelector('.carousel-slide')) {
        showSlides(slideIndex);
        // Start auto-play
        timer = setInterval(function () {
            plusSlides(1);
        }, 8000);
    }

    // Expose functions to global scope for HTML onclick
    window.plusSlides = function (n) {
        clearInterval(timer); // Reset timer on interaction
        showSlides(slideIndex += n);
        timer = setInterval(function () { plusSlides(1); }, 8000); // Restart timer
    };

    window.currentSlide = function (n) {
        clearInterval(timer);
        showSlides(slideIndex = n);
        timer = setInterval(function () { plusSlides(1); }, 8000);
    };

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        let dots = document.getElementsByClassName("dot");

        if (!slides || slides.length === 0) return;

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }

        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active-dot";
        }
    }

    // --- Subscription Modal Logic ---
    const modal = document.getElementById('subscriptionModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const subscriptionForm = document.getElementById('subscriptionForm');
    const modalPackageNameInput = document.getElementById('modalPackageName');

    // Open Modal on Button Click
    document.querySelectorAll('a[data-package]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const packageName = this.getAttribute('data-package');

            // Set package name in hidden input
            if (modalPackageNameInput) modalPackageNameInput.value = packageName;

            // Update modal header title using innerHTML properly
            const headerTitle = modal.querySelector('.modal-header h2');
            if (headerTitle) headerTitle.innerText = `اشتراك في: ${packageName}`;

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal Logic
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close when clicking outside content
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // --- Form Submission & WhatsApp ---
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect Data
            const packageName = modalPackageNameInput.value;
            const name = document.getElementById('modalName').value;
            const phone = document.getElementById('modalPhone').value;
            const email = document.getElementById('modalEmail').value;
            const height = document.getElementById('modalHeight').value;
            const weight = document.getElementById('modalWeight').value;
            const age = document.getElementById('modalAge').value;

            const healthIssues = document.querySelector('input[name="healthIssues"]:checked').value;
            const supplements = document.querySelector('input[name="supplements"]:checked').value;
            const hormones = document.querySelector('input[name="hormones"]:checked').value;
            const location = document.querySelector('input[name="location"]:checked').value;
            const trainingLevel = document.querySelector('input[name="trainingLevel"]:checked').value;

            // File upload check (just to warn if user selected files)
            const photoFront = document.getElementById('modalPhotoFront').files.length > 0;
            const photoBack = document.getElementById('modalPhotoBack').files.length > 0;
            const photoSide = document.getElementById('modalPhotoSide').files.length > 0;

            let photosNote = "";
            if (photoFront || photoBack || photoSide) {
                photosNote = " (سيتم إرسال الصور يدوياً من قبل العميل)";
            }

            // WhatsApp Number
            const phoneNumber = "201044383928";

            // Construct Message with better formatting
            const whatsappMessage =
                `*طلب اشتراك جديد - ${packageName}*%0a` +
                `------------------%0a` +
                `*البيانات الشخصية:*%0a` +
                `*الاسم:* ${name}%0a` +
                `*رقم الهاتف:* ${phone}%0a` +
                `*البريد:* ${email}%0a` +
                `*السن:* ${age} سنة%0a` +
                `*الطول:* ${height} سم%0a` +
                `*الوزن:* ${weight} كجم%0a` +
                `------------------%0a` +
                `*المعلومات الصحية:*%0a` +
                `*مشاكل صحية:* ${healthIssues}%0a` +
                `*استخدام مكملات:* ${supplements}%0a` +
                `*استخدام هرمونات:* ${hormones}%0a` +
                `------------------%0a` +
                `*تفضيلات التمرين:*%0a` +
                `*مكان التمرين:* ${location}%0a` +
                `*مستوى التدريب:* ${trainingLevel}%0a` +
                `*صور الجسم:* ${photosNote ? 'يوجد صور (سيتم إرسالها يدوياً)' : 'لا يوجد صور'}%0a` +
                `%0a` +
                `_أرجو مراجعة البيانات والرد لتأكيد الاشتراك._`;

            // Redirect
            // const url = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            // Prepare URL
            const url = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

            // Check if files are selected and warn user
            let hasFiles = (document.getElementById('modalPhotoFront').files.length > 0 ||
                document.getElementById('modalPhotoBack').files.length > 0 ||
                document.getElementById('modalPhotoSide').files.length > 0);

            if (hasFiles) {
                // Show a confirmation dialog explaining the limitation
                const userConfirmed = confirm(
                    "⚠️ تنبيه هام:\n\n" +
                    "بسبب قيود واتساب، لا يمكن إرفاق الصور تلقائياً مع الرسالة.\n\n" +
                    "سيتم نقلك الآن إلى المحادثة، من فضلك قم بإرسال الصور التي اخترتها يدوياً داخل الشات.\n\n" +
                    "هل تريد المتابعة؟"
                );

                if (userConfirmed) {
                    window.open(url, '_blank');
                    closeModal();
                }
            } else {
                // No files, just open
                window.open(url, '_blank');
                closeModal();
            }

            // Optional: Close modal after sending
            closeModal();
            // Optional: Reset form
            // subscriptionForm.reset();
        });
    }

});
