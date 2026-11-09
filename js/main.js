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
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.classList.add("is-hidden");
      success.classList.add("is-visible");
    });
  }
})();
