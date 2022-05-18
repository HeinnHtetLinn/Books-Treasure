const nav= document.querySelector(".navbar")
const card= document.querySelectorAll(".card-body")
const icon = document.querySelector(".fa-moon")
const offcanvasNavbar = document.querySelector("#offcanvasNavbar")
changeDarkMode=()=>{
        const element = document.body
        element.classList.toggle("bg-dark")
        element.classList.toggle("text-white")
        nav.classList.toggle('bg-dark')
        nav.classList.toggle('navbar-dark')
        offcanvasNavbar.classList.toggle('bg-dark')
        offcanvasNavbar.classList.toggle('navbar-dark')
        for(let i = 0 ; i < card.length; i++){
            card[i].classList.toggle('bgColor')
            // card[i].classList.toggle('text-dark')
        }
        icon.classList.toggle("text-white")
    
}
