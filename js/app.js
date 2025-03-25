/**
 * Main Application Logic
 */

document.addEventListener("DOMContentLoaded", async function () {
  // Load all components first
  await ComponentLoader.loadComponents([
    { filePath: "components/header.html", targetSelector: "#header-container" },
    {
      filePath: "components/page-header.html",
      targetSelector: "#page-header-container"
    },
    { filePath: "components/path.html", targetSelector: "#path-container" },
    {
      filePath: "components/sidebar.html",
      targetSelector: "#sidebar-container"
    },
    {
      filePath: "components/main-content.html",
      targetSelector: "#main-content-container"
    },
    { filePath: "components/footer.html", targetSelector: "#footer-container" }
  ]);

  // Initialize tab functionality
  initTabs();

  // Initialize notification system
  initNotifications();

  // Initialize form validation
  initFormValidation();
});

/**
 * Initialize tab functionality
 */
function initTabs() {
  const tabLinks = document.querySelectorAll(".slds-tabs_default__link");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Hide all content
      document
        .querySelectorAll(".slds-tabs_default__content")
        .forEach((content) => {
          content.classList.remove("slds-show");
          content.classList.add("slds-hide");
        });

      // Remove active class from all tabs
      document.querySelectorAll(".slds-tabs_default__item").forEach((tab) => {
        tab.classList.remove("slds-is-active");
        const tabLink = tab.querySelector("a");
        if (tabLink) {
          tabLink.setAttribute("aria-selected", "false");
          tabLink.setAttribute("tabindex", "-1");
        }
      });

      // Show selected content
      const contentId = this.getAttribute("href").substring(1);
      const contentElement = document.getElementById(contentId);
      if (contentElement) {
        contentElement.classList.add("slds-show");
        contentElement.classList.remove("slds-hide");
      }

      // Set active tab
      this.parentElement.classList.add("slds-is-active");
      this.setAttribute("aria-selected", "true");
      this.setAttribute("tabindex", "0");
    });
  });
}

/**
 * Initialize notification system
 */
function initNotifications() {
  const notifyCloseButton = document.querySelector(".slds-notify__close");
  if (notifyCloseButton) {
    notifyCloseButton.addEventListener("click", function () {
      const notification = this.closest(".slds-notify_container");
      if (notification) {
        notification.style.display = "none";
      }
    });

    // Auto-dismiss notification after 5 seconds
    setTimeout(function () {
      const notification = document.querySelector(".slds-notify_container");
      if (notification) {
        notification.style.display = "none";
      }
    }, 5000);
  }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
  const leadForm = document.querySelector(".slds-form");
  if (leadForm) {
    const saveButton = leadForm.querySelector(".slds-button_brand");

    if (saveButton) {
      saveButton.addEventListener("click", function (e) {
        e.preventDefault();
        const nameField = document.getElementById("name");
        const companyField = document.getElementById("company");

        let isValid = true;

        if (!nameField.value.trim()) {
          const nameParent = nameField.closest(".slds-form-element");
          nameParent.classList.add("slds-has-error");
          isValid = false;
        } else {
          const nameParent = nameField.closest(".slds-form-element");
          nameParent.classList.remove("slds-has-error");
        }

        if (!companyField.value.trim()) {
          const companyParent = companyField.closest(".slds-form-element");
          companyParent.classList.add("slds-has-error");
          isValid = false;
        } else {
          const companyParent = companyField.closest(".slds-form-element");
          companyParent.classList.remove("slds-has-error");
        }

        if (isValid) {
          showToast("success", "Form submitted successfully!");
          leadForm.reset();
        }
      });
    }
  }
}

/**
 * Show a toast notification
 * @param {string} type - Type of notification (success, error, warning, info)
 * @param {string} message - Message to display
 */
function showToast(type, message) {
  // Remove any existing notifications
  const existingNotification = document.querySelector(".slds-notify_container");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create new notification
  const notificationContainer = document.createElement("div");
  notificationContainer.className = "slds-notify_container slds-is-relative";

  const notification = document.createElement("div");
  notification.className = `slds-notify slds-notify_toast slds-theme_${type}`;
  notification.setAttribute("role", "status");

  const content = `
    <span class="slds-assistive-text">${type}</span>
    <span class="slds-icon_container slds-icon-utility-${type} slds-m-right_small" title="Description of icon">
      <svg class="slds-icon slds-icon_small" aria-hidden="true">
        <use xlink:href="node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg#${type}"></use>
      </svg>
    </span>
    <div class="slds-notify__content">
      <h2 class="slds-text-heading_small">${message}</h2>
    </div>
    <button class="slds-button slds-button_icon slds-notify__close slds-button_icon-inverse" title="Close">
      <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
        <use xlink:href="node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
      </svg>
      <span class="slds-assistive-text">Close</span>
    </button>
  `;

  notification.innerHTML = content;
  notificationContainer.appendChild(notification);
  document.body.appendChild(notificationContainer);

  // Add close button functionality
  const closeButton = notificationContainer.querySelector(
    ".slds-notify__close"
  );
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      notificationContainer.remove();
    });
  }

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notificationContainer)) {
      notificationContainer.remove();
    }
  }, 5000);
}
