const nav= document.querySelector(".navbar")
const card= document.querySelectorAll(".card-body")
const icon = document.querySelector(".icon")
const icon1 = document.querySelector(".icon-1")
// const offcanvasNavbar = document.querySelector("#offcanvasNavbar")
const toggle = document.querySelector(".toggleButton")
function changeDarkMode(){
        const element = document.body
        element.classList.toggle("bg-dark")
        element.classList.toggle("text-white")
        nav.classList.toggle('bg-dark')
        nav.classList.toggle('navbar-dark')
        // offcanvasNavbar.classList.toggle('bg-dark')
        // offcanvasNavbar.classList.toggle('navbar-dark')
        // for(let i = 0 ; i < card.length; i++){
        //     card[i].classList.toggle('bgColor')
        //     // card[i].classList.toggle('text-dark')
        // }
        icon.classList.toggle("text-white")
        icon1.classList.toggle("text-white")
        toggle.classList.toggle("text-white")
    
}
