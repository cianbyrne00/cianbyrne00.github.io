let slideIndex = -1;
var timer;
let slides = document.getElementsByClassName("mySlides");
// Next/previous controls
    function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
    function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
function showSlides() {
  slideIndex++;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (slideIndex > slides.length-1) {slideIndex = 0}
  if(slideIndex < 0) {
    slideIndex = 2;
} 
  slides[slideIndex].style.display = "block";
  timer = setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function ClickSlide(n) {
    clearTimeout(timer);
    slideIndex += n;
    showSlides();
    
}