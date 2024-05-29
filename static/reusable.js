'use strict'



const body = document.querySelector('body');
const sections = document.querySelectorAll("section");
const header = document.querySelector(".header");

// Dropdown Navigation
const menuList = document.querySelector(".nav-items--list");
const menuOpen = document.querySelector(".menu-btn--open");
const menuClose = document.querySelector(".menu-btn--close");
const dropdown = document.querySelector(".dropdown");
const box = document.querySelector(".box");
const navItems = document.querySelectorAll(".nav-link-box");
const subMenus = document.querySelectorAll(".nav-submenu-list");

const arrowsOpen = document.querySelectorAll(".arrow--open");
const arrowsClose = document.querySelectorAll(".arrow--close");

// Grid View Options
const gridViewOptions = document.querySelector('.caixa-de-opcoes')
const gridViewBtns = document.querySelectorAll('.opcao-de-visualizacao')

// Modal Window and Overlay
const overlay = document.querySelector(`.overlay`);
const modalWindow = document.querySelector(".modal--conquistas");
const btnOpenModal = document.querySelector(".modal--btn-open");
const btnCloseModal = document.querySelector(".modal--btn-close");



// const gridView = document.querySelector(".modal-lista--conquistas");
// const gridItems = document.querySelectorAll(".item-conquista");

// gridList.style.gridTemplateColumns = 'repeat(3, 1fr)';

// gridViewOptions.addEventListener("click", (e) => {
//   const clicked = e.target;

//   gridViewBtns.forEach((btn) =>
//     btn.classList.remove("opcao-de-visualizacao--active")
//   );

//   // return gridView.style.gridTemplateColumns = 'auto'
//   if (clicked.classList.contains("opcao-lista")) {
//     clicked.classList.add("opcao-de-visualizacao--active");
//     gridView.style.gridTemplateColumns = "auto";
//   }

//   if (clicked.classList.contains("opcao-colunas")) {
//     clicked.classList.add("opcao-de-visualizacao--active");
//     gridView.style.gridTemplateColumns = "repeat(2,  1fr)";
//   }
// });

// Open Mobile Nav
const controlMenu = function () {
  if (dropdown.classList.contains("hidden")) {
    body.style.overflow = "hidden";
    sections.forEach((section) => (section.style.filter = "blur(5px)"));
  } else {
    sections.forEach((section) => (section.style.filter = "none"));
    body.style.overflow = "visible";
  }

  box.classList.toggle("active");
  dropdown.classList.toggle("hidden");
};

menuOpen.addEventListener("click", controlMenu);
menuClose.addEventListener("click", controlMenu);

// Cada link possui uma classe que o associa ao seu respectivo sub-menu.
subMenus.forEach((menu) => menu.classList.remove("nav-submenu-list--active"));
menuList.addEventListener("click", function (e) {
  // Seleciona o
  const clicked = e.target.closest(".nav-link-box");

  if (!clicked) return;

  // Faz parte do mecanismo que permite apenas um sub-menu aberto por vez.
  let curMenu = document.querySelector(
    `.nav-submenu-list--${clicked.dataset.id}`
  );

  if (!curMenu) return;

  const isActive = curMenu.classList.contains("nav-submenu-list--active");
  console.log(curMenu);

  subMenus.forEach((menu) => menu.classList.remove("nav-submenu-list--active"));
  arrowsClose.forEach((arrow) => arrow.classList.add(`arrow--hidden`));
  arrowsOpen.forEach((arrow) => arrow.classList.remove(`arrow--hidden`));

  if (isActive && curMenu.dataset.id !== clicked.dataset.id) {
    if (curMenu.dataset.id) {
      document
        .querySelector(`.arrow--open--${curMenu.dataset.id}`)
        .classList.remove("arrow--hidden");
      document
        .querySelector(`.arrow--close--${curMenu.dataset.id}`)
        .classList.add("arrow--hidden");
    }
  } else {
    // Ativar
    curMenu.classList.add("nav-submenu-list--active");

    // Ativar / Desativar setas indicativas
    document
      .querySelector(`.arrow--open--${clicked.dataset.id}`)
      .classList.add("arrow--hidden");
    document
      .querySelector(`.arrow--close--${clicked.dataset.id}`)
      .classList.remove("arrow--hidden");
  }
});






btnOpenModal.addEventListener("click", function() {
  body.style.overflow = "hidden";
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
});


[btnCloseModal, overlay].forEach(function(item) {
  item.addEventListener('click', () => {

    body.style.overflow = "auto";
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  })
})

// btnCloseModal.addEventListener("click", function() {
// });

// overlay.addEventListener('click', () => {

// })