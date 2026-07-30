/* =====================================
ARDZ STORE PREMIUM
Hero Slider
===================================== */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index){

slides.forEach(slide=>{

slide.classList.remove("active");

});

dots.forEach(dot=>{

dot.classList.remove("active");

});

slides[index].classList.add("active");

dots[index].classList.add("active");

}

function nextSlide(){

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

showSlide(currentSlide);

}

setInterval(nextSlide,5000);

/* Klik Dot */

dots.forEach((dot,index)=>{

dot.addEventListener("click",()=>{

currentSlide=index;

showSlide(index);

});

});
/* =====================================
Navbar Mobile
===================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

/* Buka / Tutup Menu */

if(menuToggle && navbar){

menuToggle.addEventListener("click",()=>{

navbar.classList.toggle("active");

/* Ganti Icon */

if(navbar.classList.contains("active")){

menuToggle.innerHTML="✖";

}else{

menuToggle.innerHTML="☰";

}

});

/* Tutup Menu Saat Klik Link */

const navLinks=document.querySelectorAll(".navbar a");

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

navbar.classList.remove("active");

menuToggle.innerHTML="☰";

});

});

/* Tutup Menu Saat Klik di Luar */

document.addEventListener("click",(e)=>{

if(

!navbar.contains(e.target) &&

!menuToggle.contains(e.target)

){

navbar.classList.remove("active");

menuToggle.innerHTML="☰";

}

});

}

/* Tutup Menu Saat Ukuran Layar Besar */

window.addEventListener("resize",()=>{

if(window.innerWidth>992){

navbar.classList.remove("active");

menuToggle.innerHTML="☰";

}

});
/* =====================================
Sticky Header + Active Menu
===================================== */

const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".navbar a");

/* Sticky Header */

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

/* Active Menu */

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop &&
           window.scrollY < sectionTop + sectionHeight){

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if(href === "#" + current){

            link.classList.add("active");

        }

    });

});

/* Klik Menu Scroll Halus */

navItems.forEach(link=>{

    link.addEventListener("click",function(e){

        const href=this.getAttribute("href");

        if(href.startsWith("#")){

            e.preventDefault();

            const target=document.querySelector(href);

            if(target){

                window.scrollTo({

                    top:target.offsetTop-70,

                    behavior:"smooth"

                });

            }

        }

    });

});
/* =====================================
Back To Top
===================================== */

const backTop = document.getElementById("backTop");

/* Tampilkan / Sembunyikan Tombol */

window.addEventListener("scroll", () => {

    if (!backTop) return;

    if (window.scrollY > 300) {

        backTop.style.display = "flex";

        backTop.style.opacity = "1";

        backTop.style.pointerEvents = "auto";

    } else {

        backTop.style.opacity = "0";

        backTop.style.pointerEvents = "none";

        setTimeout(() => {

            if (window.scrollY <= 300) {

                backTop.style.display = "none";

            }

        }, 250);

    }

});

/* Scroll Ke Atas */

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* Keyboard Accessibility */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Home"){

        scrollToTop();

    }

});
/* =====================================
Counter Statistik
===================================== */

const counters = document.querySelectorAll(".counter");

function animateCounter(counter){

    const text = counter.innerText.trim();

    /* Jangan animasikan rating */

    if(text.includes("/")){

        return;

    }

    /* Ambil angka */

    const target = parseInt(
        text.replace(/\D/g,"")
    );

    if(isNaN(target)) return;

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 120));

    const timer = setInterval(()=>{

        current += increment;

        if(current >= target){

            current = target;

            clearInterval(timer);
        }

        /* Kembalikan format */

        if(text.includes("+")){

            counter.innerText = current.toLocaleString("id-ID") + "+";

        }else if(text.includes("%")){

            counter.innerText = current + "%";

        }else{

            counter.innerText = current.toLocaleString("id-ID");

        }

    },20);

}

/* Jalankan Saat Terlihat */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{

    observer.observe(counter);

});
/* =====================================
Fade In Scroll Animation
===================================== */

/* Semua elemen yang akan dianimasikan */

const fadeElements = document.querySelectorAll(

`
.section-title,
.game-card,
.promo-card,
.best-card,
.why-card,
.step-card,
.stat-card,
.partner-card,
.testimonial-card,
.payment-card,
.service-card,
.cta-box,
.footer-item
`

);

/* Observer */

const fadeObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-in");

fadeObserver.unobserve(entry.target);

}

});

},

{

threshold:0.15,

rootMargin:"0px 0px -60px 0px"

}

);

/* Persiapan */

fadeElements.forEach((element,index)=>{

element.style.opacity="0";

element.style.transform="translateY(40px)";

/* Delay sedikit agar muncul bergantian */

element.style.transition=

`opacity .7s ease ${index*0.05}s,
 transform .7s ease ${index*0.05}s`;

fadeObserver.observe(element);

});
/* =====================================
Slider Testimoni
===================================== */

const testimonialGrid = document.querySelector(".testimonial-grid");
const testimonialCards = document.querySelectorAll(".testimonial-card");

let testimonialIndex = 0;

if(testimonialGrid && testimonialCards.length > 0){

    function updateTestimonial(){

        testimonialCards.forEach((card,index)=>{

            if(index===testimonialIndex){

                card.style.display="block";

                card.style.opacity="0";

                card.style.transform="translateX(40px)";

                setTimeout(()=>{

                    card.style.transition="all .5s ease";

                    card.style.opacity="1";

                    card.style.transform="translateX(0)";

                },50);

            }else{

                card.style.display="none";

            }

        });

    }

    function nextTestimonial(){

        testimonialIndex++;

        if(testimonialIndex>=testimonialCards.length){

            testimonialIndex=0;

        }

        updateTestimonial();

    }

    function prevTestimonial(){

        testimonialIndex--;

        if(testimonialIndex<0){

            testimonialIndex=testimonialCards.length-1;

        }

        updateTestimonial();

    }

    updateTestimonial();

    setInterval(nextTestimonial,5000);

    /* Tombol Next */

    const nextBtn=document.querySelector(".testimonial-next");

    if(nextBtn){

        nextBtn.addEventListener("click",nextTestimonial);

    }

    /* Tombol Previous */

    const prevBtn=document.querySelector(".testimonial-prev");

    if(prevBtn){

        prevBtn.addEventListener("click",prevTestimonial);

    }

}
/* =====================================
Popup Promo Premium
===================================== */

const promoPopup = document.querySelector(".promo-popup");
const promoClose = document.querySelector(".promo-close");

/* Tampilkan Popup */

window.addEventListener("load",()=>{

    if(!promoPopup) return;

    if(sessionStorage.getItem("promoShown")) return;

    setTimeout(()=>{

        promoPopup.classList.add("show");

        sessionStorage.setItem("promoShown","true");

    },2000);

});

/* Tombol Tutup */

if(promoClose){

    promoClose.addEventListener("click",()=>{

        promoPopup.classList.remove("show");

    });

}

/* Tutup Saat Klik Background */

if(promoPopup){

    promoPopup.addEventListener("click",(e)=>{

        if(e.target===promoPopup){

            promoPopup.classList.remove("show");

        }

    });

}

/* Tombol ESC */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape" && promoPopup){

        promoPopup.classList.remove("show");

    }

});
