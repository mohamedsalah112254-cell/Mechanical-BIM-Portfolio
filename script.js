/* ============ Typing effect (types + deletes) ============ */

const roles = [
    "Mechanical Technical Office Engineer",
    "Mechanical Design Engineer",
    "BIM Engineer",
    "HVAC Engineer",
    "Plumbing Engineer",
    "Fire Fighting Engineer"
];

const typingEl = document.getElementById("typing");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
    if(!typingEl) return;

    const current = roles[roleIndex];

    if(!deleting){
        charIndex++;
        typingEl.textContent = current.slice(0, charIndex);
        if(charIndex === current.length){
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }
    } else {
        charIndex--;
        typingEl.textContent = current.slice(0, charIndex);
        if(charIndex === 0){
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeLoop, deleting ? 35 : 65);
}

if(typingEl){
    if(reduceMotion){
        typingEl.textContent = roles[0];
    } else {
        typeLoop();
    }
}

/* ============ Mobile nav toggle ============ */

const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector("nav ul");

if(navToggle && navList){
    navToggle.addEventListener("click", () => {
        navList.classList.toggle("open");
    });

    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => navList.classList.remove("open"));
    });
}

/* ============ Scrollspy: highlight active nav link ============ */

const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll("nav ul a");

if(sections.length && navLinks.length){
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                });
            }
        });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach(section => spyObserver.observe(section));
}

/* ============ Scroll reveal ============ */

const revealTargets = document.querySelectorAll(".reveal");

if(revealTargets.length){
    if(reduceMotion){
        revealTargets.forEach(el => el.classList.add("in-view"));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach(el => revealObserver.observe(el));
    }
}
