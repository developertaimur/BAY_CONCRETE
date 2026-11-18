(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navCheckbox = document.getElementById("nav-checkbox");
  var nav = document.getElementById("main-nav");

  function closeNav() {
    if (navCheckbox) navCheckbox.checked = false;
  }

  if (navCheckbox && nav) {
    nav.addEventListener("click", function (event) {
      var link = event.target.closest ? event.target.closest("a") : null;
      if (link) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1024px)").matches) closeNav();
    });
  }

  var faqList = document.getElementById("faq-list");
  if (faqList) {
    faqList.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button || !faqList.contains(button)) return;

      var item = button.closest(".faq-item");
      if (!item) return;

      var isOpen = item.classList.contains("is-open");
      var items = faqList.querySelectorAll(".faq-item");

      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("is-open");
        var btn = items[i].querySelector("button");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  }

  var galleryGrid = document.getElementById("gallery-grid");
  var lightbox = document.getElementById("lightbox");

  if (galleryGrid) {
    var galleryItems = galleryGrid.querySelectorAll(".gallery-item");
    var filterButtons = document.querySelectorAll(".gallery-filter");

    function applyGalleryFilter(filter) {
      for (var f = 0; f < filterButtons.length; f++) {
        var isActive = filterButtons[f].getAttribute("data-filter") === filter;
        filterButtons[f].classList.toggle("is-active", isActive);
        filterButtons[f].setAttribute("aria-pressed", isActive ? "true" : "false");
      }
      for (var g = 0; g < galleryItems.length; g++) {
        var match = filter === "all" || galleryItems[g].getAttribute("data-category") === filter;
        galleryItems[g].classList.toggle("is-hidden", !match);
      }
    }

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest ? event.target.closest("[data-filter], [data-gallery-filter]") : null;
      if (!trigger) return;
      applyGalleryFilter(trigger.getAttribute("data-filter") || trigger.getAttribute("data-gallery-filter"));
    });

    if (lightbox) {
      var lightboxImg = document.getElementById("lightbox-img");
      var lightboxCaption = document.getElementById("lightbox-caption");
      var visibleItems = [];
      var currentIndex = 0;
      var lastFocused = null;

      function showLightboxItem(index) {
        currentIndex = (index + visibleItems.length) % visibleItems.length;
        var item = visibleItems[currentIndex];
        var img = item.querySelector("img");
        var label = item.querySelector("span");
        lightboxImg.src = img.getAttribute("src");
        lightboxImg.alt = img.getAttribute("alt");
        lightboxCaption.textContent = label ? label.textContent : "";
      }

      function openLightbox(item) {
        visibleItems = [];
        for (var v = 0; v < galleryItems.length; v++) {
          if (!galleryItems[v].classList.contains("is-hidden")) visibleItems.push(galleryItems[v]);
        }
        lastFocused = item;
        showLightboxItem(visibleItems.indexOf(item));
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
        lightbox.querySelector(".lightbox-close").focus();
      }

      function closeLightbox() {
        lightbox.hidden = true;
        document.body.style.overflow = "";
        if (lastFocused) lastFocused.focus();
      }

      galleryGrid.addEventListener("click", function (event) {
        var item = event.target.closest(".gallery-item");
        if (item) openLightbox(item);
      });

      lightbox.addEventListener("click", function (event) {
        var action = event.target.closest("[data-lightbox]");
        if (action) {
          var type = action.getAttribute("data-lightbox");
          if (type === "close") closeLightbox();
          if (type === "prev") showLightboxItem(currentIndex - 1);
          if (type === "next") showLightboxItem(currentIndex + 1);
        } else if (event.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener("keydown", function (event) {
        if (lightbox.hidden) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showLightboxItem(currentIndex - 1);
        if (event.key === "ArrowRight") showLightboxItem(currentIndex + 1);
      });
    }
  }

  var form = document.getElementById("contact-form");
  var success = document.getElementById("contact-success");
  var serviceSelect = document.getElementById("service");
  var dateInput = document.getElementById("date");

  if (serviceSelect) {
    try {
      var params = new URLSearchParams(window.location.search);
      var serviceParam = params.get("service");
      if (serviceParam) {
        var options = serviceSelect.options;
        for (var s = 0; s < options.length; s++) {
          if (options[s].value === serviceParam || options[s].text === serviceParam) {
            serviceSelect.selectedIndex = s;
            break;
          }
        }
      }
    } catch (err) {
      /* ignore */
    }
  }

  if (dateInput) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1);
    var dd = String(today.getDate());
    if (mm.length < 2) mm = "0" + mm;
    if (dd.length < 2) dd = "0" + dd;
    dateInput.min = yyyy + "-" + mm + "-" + dd;
  }

  if (form && success) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var formError = document.getElementById("form-error");
    var defaultBtnText = submitBtn ? submitBtn.textContent : "";
    var defaultErrorHtml = formError ? formError.innerHTML : "";

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (formError) {
        formError.hidden = true;
        formError.innerHTML = defaultErrorHtml;
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      var endpoint = (form.getAttribute("action") || "").replace(
        "https://formsubmit.co/",
        "https://formsubmit.co/ajax/"
      );
      var payload = new FormData(form);
      var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      var timeoutId = setTimeout(function () {
        if (controller) controller.abort();
      }, 25000);

      var fetchOptions = {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      };
      if (controller) fetchOptions.signal = controller.signal;

      fetch(endpoint, fetchOptions)
        .then(function (response) {
          return response.json().catch(function () {
            return {};
          }).then(function (data) {
            return { ok: response.ok, data: data || {} };
          });
        })
        .then(function (result) {
          var data = result.data;
          var successFlag = data.success;
          var isSuccess = successFlag === true || successFlag === "true";
          var message = data.message ? String(data.message) : "";

          if (isSuccess) {
            form.reset();
            form.classList.add("is-hidden");
            success.classList.add("is-visible");
            return;
          }

          if (/activation/i.test(message)) {
            throw new Error(
              "Check baycon2027@gmail.com for a FormSubmit email and click Activate Form. After that, appointments will arrive in the inbox."
            );
          }

          if (!result.ok || successFlag === false || successFlag === "false") {
            throw new Error(message || "Request failed");
          }

          form.reset();
          form.classList.add("is-hidden");
          success.classList.add("is-visible");
        })
        .catch(function (err) {
          if (formError) {
            var detail =
              err && err.name === "AbortError"
                ? "The request timed out. Please try again or call <a href=\"tel:+15104159724\">(510) 415-9724</a>."
                : err && err.message
                  ? err.message
                  : defaultErrorHtml;
            formError.innerHTML = detail;
            formError.hidden = false;
          }
        })
        .finally(function () {
          clearTimeout(timeoutId);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = defaultBtnText;
          }
        });
    });
  }
})();
