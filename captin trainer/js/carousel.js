
// Carousel Logic
let slideIndex = 0;
// Start the carousel if the elements exist
if (document.querySelector('.carousel-slide')) {
    showSlides();
}

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0) {
        dots[slideIndex - 1].className += " active-dot";
    }

    setTimeout(showSlides, 8000); // Change image every 8 seconds
}
