
document.addEventListener("DOMContentLoaded", function () {

  // 1. Automatically update the copyright year.
  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  // 2. Mobile navigation menu.
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");

      const isOpen = !mobileMenu.classList.contains("hidden");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });
  }


  // 3. Product category filtering and search.
  const productCards = document.querySelectorAll("[data-product-card]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const searchInput = document.getElementById("product-search");
  const productCount = document.getElementById("product-count");
  const noProducts = document.getElementById("no-products");

  let selectedCategory = "all";

  function filterProducts() {
    const searchTerm = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    let visibleProducts = 0;

    productCards.forEach(function (card) {
      const category = card.dataset.category;
      const text = card.textContent.toLowerCase();

      const categoryMatches =
        selectedCategory === "all" || category === selectedCategory;

      const searchMatches = text.includes(searchTerm);
      const showProduct = categoryMatches && searchMatches;

      card.classList.toggle("hidden", !showProduct);

      if (showProduct) {
        visibleProducts++;
      }
    });

    if (productCount) {
      productCount.textContent =
        `Showing ${visibleProducts} product${visibleProducts === 1 ? "" : "s"}`;
    }

    if (noProducts) {
      noProducts.classList.toggle("hidden", visibleProducts !== 0);
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCategory = button.dataset.filter;

      filterButtons.forEach(function (item) {
        item.classList.remove("bg-forest", "text-white");
        item.classList.add("border");
      });

      button.classList.add("bg-forest", "text-white");
      button.classList.remove("border");

      filterProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
  }


  // 4. Gallery lightbox.
  const galleryButtons = document.querySelectorAll("[data-gallery-image]");
  const lightbox = document.getElementById("lightbox");
  const lightboxPhoto = document.getElementById("lightbox-photo");
  const lightboxTitle = document.getElementById("lightbox-title");
  const closeLightbox = document.getElementById("close-lightbox");

  function hideLightbox() {
    if (!lightbox) return;

    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
  }

  galleryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (!lightbox || !lightboxPhoto) return;

      lightboxPhoto.src = button.dataset.image;
      lightboxPhoto.alt = button.dataset.title || "Furniture image";

      if (lightboxTitle) {
        lightboxTitle.textContent = button.dataset.title || "";
      }

      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");

      if (closeLightbox) closeLightbox.focus();
    });
  });

  if (closeLightbox) {
    closeLightbox.addEventListener("click", hideLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        hideLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideLightbox();
    }
  });


  // 5. Contact form validation and email draft.
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);

      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const subject = formData.get("subject");
      const message = formData.get("message").trim();

      const emailSubject = encodeURIComponent(
        "UrbanWoodInteriors enquiry: " + subject
      );

      const emailBody = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\nTopic: " + subject +
        "\n\nMessage:\n" + message
      );

      if (formMessage) {
        formMessage.textContent =
          "Your email draft is being prepared. If your email application does not open, contact the business directly.";
        formMessage.classList.remove("hidden");
      }

      window.location.href =
        "mailto:collieoroni99@gmail.com?subject=" +
        emailSubject +
        "&body=" +
        emailBody;
    });
  }

});
