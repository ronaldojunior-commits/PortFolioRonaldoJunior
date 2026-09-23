
document.addEventListener("DOMContentLoaded", function () {

  const menuButton = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const menuIcon = document.getElementById("menu-icon");
  const topButton = document.getElementById("top-button");
  const contactForm = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  function closeMenu() {

    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu de navegação");
    menuIcon.innerHTML = '<path d="M4 7h16M4 12h16M4 17h16"/>';

  }

  menuButton.addEventListener("click", function () {

    const isOpen = mobileNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");

    menuIcon.innerHTML = isOpen
      ? '<path d="m6 6 12 12M18 6 6 18"/>'
      : '<path d="M4 7h16M4 12h16M4 17h16"/>';

  });

  navLinks.forEach(function (link) {

    link.addEventListener("click", closeMenu);

  });

  const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);

      }

    });

  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(function (element) {

    revealObserver.observe(element);

  });

  const sectionObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (!entry.isIntersecting) return;

      navLinks.forEach(function (link) {

        const matchesSection = link.getAttribute("href") === "#" + entry.target.id;

        link.classList.toggle("active", matchesSection);

      });

    });

  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  sections.forEach(function (section) {

    sectionObserver.observe(section);

  });

  window.addEventListener("scroll", function () {

    topButton.classList.toggle("visible", window.scrollY > 480);

  }, { passive: true });

  topButton.addEventListener("click", function () {

    window.scrollTo({ top: 0, behavior: "smooth" });

  });

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    feedback.classList.remove("success", "error", "show");

    if (!name || !email || !message) {

      feedback.textContent = "Preencha nome, e-mail e mensagem para continuar.";
      feedback.classList.add("error", "show");

      return;

    }

    if (!isValidEmail) {

      feedback.textContent = "Informe um endereço de e-mail válido.";
      feedback.classList.add("error", "show");

      return;

    }

    feedback.textContent = "Mensagem validada localmente. Esta interface não envia nem armazena dados.";
    feedback.classList.add("success", "show");

    contactForm.reset();

  });

});