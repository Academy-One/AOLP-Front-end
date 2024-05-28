'use strict'



const body = document.querySelector('body');
const header = document.querySelector('.header');

// Dropdown Navigation
const menuList = document.querySelector('.nav-items--list')
const menuOpen = document.querySelector('.menu-btn--open')
const menuClose = document.querySelector('.menu-btn--close')
const dropdown = document.querySelector('.dropdown')
const box = document.querySelector('.box')
const navItems = document.querySelectorAll('.nav-link-box')
const subMenus = document.querySelectorAll('.nav-submenu-list')

const arrowsOpen = document.querySelectorAll('.arrow--open');
const arrowsClose = document.querySelectorAll('.arrow--close');




// Open Mobile Nav
const controlMenu = function() {

    if (dropdown.classList.contains('hidden'))  body.style.overflow = 'hidden';
    else  body.style.overflow = 'visible';

    box.classList.toggle('active')
    dropdown.classList.toggle('hidden');   
}


menuOpen.addEventListener('click', controlMenu);
menuClose.addEventListener('click', controlMenu);


// Open Mobile Nav Sub-Menu
subMenus.forEach((menu) => menu.classList.remove('nav-submenu-list--active'))
menuList.addEventListener('click', function(e) {
    const clicked = e.target.closest('.nav-link-box')
    
    if (!clicked) return
    
    let curMenu = document.querySelector(`.nav-submenu-list--${clicked.dataset.id}`)
    const isActive = curMenu.classList.contains('nav-submenu-list--active')
    console.log(curMenu)
    
    
    // Manage hidden classes
    subMenus.forEach((menu) => menu.classList.remove('nav-submenu-list--active'))
    arrowsClose.forEach((arrow) => arrow.classList.add(`arrow--hidden`))
    arrowsOpen.forEach((arrow) => arrow.classList.remove(`arrow--hidden`))
    
    // Already active link
    if (isActive && curMenu.dataset.id !== clicked.dataset.id) {
        if (curMenu.dataset.id)  {
           document.querySelector(`.arrow--open--${curMenu.dataset.id}`).classList.remove('arrow--hidden');
           document.querySelector(`.arrow--close--${curMenu.dataset.id}`).classList.add('arrow--hidden');
        }
        
    }  else {
        
        // Activate content area
        curMenu.classList.add('nav-submenu-list--active');

        // Activate / Deactivate arrows
        document.querySelector(`.arrow--open--${clicked.dataset.id}`).classList.add('arrow--hidden');
        document.querySelector(`.arrow--close--${clicked.dataset.id}`).classList.remove('arrow--hidden');  
    }
})




// Carousel Slider
const slider = document.querySelector('.slider');
const innerSlider = document.querySelector('.slider--inner');
const slides = document.querySelectorAll('.slide');
const carouselArrow = document.querySelector('.carousel-arrow')
const carouselArrowLeft = document.querySelector('.carousel-arrow__left')
const carouselArrowRight = document.querySelector('.carousel-arrow__right')


let pressed = false;
let startx = 0;
let x;
const slideEls = Array.from(slides);
const slideWidth = slideEls[0].offsetWidth; 
const maxLeft = 0;
const maxRight = -(slideWidth * (slideEls.length - 1));

// Function to handle movement of slider
function moveSlider(e) {
    if (!pressed) return;
    e.preventDefault();

    x = e.clientX || e.touches[0].clientX;
    const move = x - startx;
    let newLeft = parseFloat(innerSlider.style.left || 0) + move;
    if (newLeft > maxLeft) {
        newLeft = maxLeft;
    } 
    if (newLeft < maxRight) {
        newLeft = maxRight;
    }
    innerSlider.style.left = `${newLeft}px`;
    startx = x;
}

innerSlider.style.left = 0;
carouselArrowRight.addEventListener('click', () => {
    let curLeft = parseFloat(innerSlider.style.left || 0);
    if (curLeft > maxRight) {
        innerSlider.style.left = `${curLeft - slideWidth}px`;
    }
});

carouselArrowLeft.addEventListener('click', () => {
    let curLeft = parseFloat(innerSlider.style.left || 0);
    if (curLeft < maxLeft) {
        innerSlider.style.left = `${curLeft + slideWidth}px`;
    }
});

// Mobile Devices
slider.addEventListener('touchstart', (e) => {
    pressed = true;
    startx = e.touches[0].clientX - innerSlider.offsetLeft;
    slider.style.cursor = 'grabbing';
    moveSlider(e);
});

window.addEventListener('touchend', () => {
    pressed = false;
    slider.style.cursor = 'grab';
});

slider.addEventListener('mousemove', moveSlider);
slider.addEventListener('touchmove', moveSlider);