const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav_list');
    const navLinks = document.querySelectorAll('.nav_list li');
   
    //toggle nav
    burger.addEventListener('click', ()=>{
    nav.classList.toggle('nav-active');
    //burger animation 
    burger.classList.toggle('toggle');
    });
}
// function startAnimations(){
//     const homeImage = document.querySelector('#homeImage');
//     homeImage.style.animation = `navLinkFade 0.5s ease forwards 10s`;
// }
navSlide();