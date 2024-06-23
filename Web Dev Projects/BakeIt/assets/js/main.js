/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}   

navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    if(this.scrollY >= 50) header.classList.add('blur-header'); else header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
onst scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),

            sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }   
    })
}

window.addEventListener('scroll', scrollActive)


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    opacity: 1,
    scale : 1.1,
    // reset: true
})

sr.reveal(`.home-data, .about__img, .about__data, .visit__data`)
sr.reveal (`.home-img, .footer__img-1, .footer__img-2`, {rotate: {z: -15}})
sr.reveal (`.home-bread`, {rotate: {z: 15}})
sr.reveal (`.home-footer`, {scale: 1, origin: 'bottom'})

sr.reveal (`.new__card:nth-child(1) img`, {rotate: {z: -30}, distance: 0})
sr.reveal (`.new__card:nth-child(2) img`, {rotate: {z: -15}, distance: 0, delay: 600})
sr.reveal (`.new__card:nth-child(3) img`, {rotate: {z: -30}, distance: 0, delay: 900})

sr.reveal (`.favorite__card img`, {interval: 100, rotate: {z: 15}, distance: 0})

sr.reveal (`.footer__container`, {scale: 1})
