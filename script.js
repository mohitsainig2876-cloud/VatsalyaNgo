// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            navLinks.classList.remove("open");
        }
    });
});

// Impact counters animation
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 120));

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            counter.textContent = current;
        }, 20);
    });
}

// Observe impact section
const impactSection = document.getElementById("impact");
if ("IntersectionObserver" in window && impactSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.4 });

    observer.observe(impactSection);
} else {
    // Fallback: start immediately
    startCounters();
}

// Donate modal logic
const donateModal = document.getElementById("donateModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const openDonateBtn = document.getElementById("openDonateBtn");
const heroDonateBtn = document.getElementById("heroDonateBtn");
const closeDonateBtn = document.getElementById("closeDonateBtn");
const donateCauseLabel = document.getElementById("donateCauseLabel");
const causeButtons = document.querySelectorAll(".cause-donate");

function openDonate(causeText) {
    donateCauseLabel.textContent = causeText
        ? `Your contribution will support: ${causeText}.`
        : "Your contribution will support all our causes.";
    donateModal.classList.add("show");
    donateModal.setAttribute("aria-hidden", "false");
}

function closeDonate() {
    donateModal.classList.remove("show");
    donateModal.setAttribute("aria-hidden", "true");
}

openDonateBtn.addEventListener("click", () => openDonate());
heroDonateBtn.addEventListener("click", () => openDonate());

causeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const cause = btn.getAttribute("data-cause");
        openDonate(cause);
    });
});

closeDonateBtn.addEventListener("click", closeDonate);
modalBackdrop.addEventListener("click", closeDonate);

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && donateModal.classList.contains("show")) {
        closeDonate();
    }
});

// Simple form handlers
function handleFormSubmit(formId, msgId, successText) {
    const form = document.getElementById(formId);
    const msg = document.getElementById(msgId);

    form.addEventListener("submit", e => {
        e.preventDefault();
        msg.textContent = successText;
        msg.style.color = "green";
        form.reset();

        setTimeout(() => {
            msg.textContent = "";
        }, 3000);
    });
}

handleFormSubmit("volunteerForm", "volunteerMsg", "Thank you for volunteering! We will contact you soon.");
handleFormSubmit("contactForm", "contactMsg", "Your message has been received. Our team will reach out shortly.");
handleFormSubmit("donateForm", "donateMsg", "Donation initiated. Please complete the payment in the next step.");