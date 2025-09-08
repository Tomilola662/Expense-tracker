const menuBtn = document.querySelector(".menu-btn");
const navBar = document.getElementById("navbar");
const closeMenu = document.querySelector(".close-button");
const yearText = document.getElementById("yearText");
const yearValue = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  navBar.classList.add("showNavBar");
});

closeMenu.addEventListener("click", () => {
  navBar.classList.remove("showNavBar");
});

yearText.innerText = yearValue;
