// ==========================================
// NORTH STAR BAKERY - INTERACTIVITY & STORAGE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("North Star Bakery website loaded successfully!");

  // 1. PRODUCT FILTERING LOGIC (Products Page)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  if (filterButtons.length > 0) {
    // Check if there is a saved filter in localStorage and apply it
    const savedFilter = localStorage.getItem("bakery_selected_filter") || "all";
    applyFilter(savedFilter);

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const selectedFilter = button.getAttribute("data-filter");
        
        // Save preference to localStorage
        localStorage.setItem("bakery_selected_filter", selectedFilter);
        
        applyFilter(selectedFilter);
      });
    });
  }

  function applyFilter(filter) {
    productCards.forEach(card => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Highlight active button
    filterButtons.forEach(btn => {
      if (btn.getAttribute("data-filter") === filter) {
        btn.style.opacity = "1";
        btn.style.border = "2px solid #2F2A26";
      } else {
        btn.style.opacity = "0.85";
        btn.style.border = "none";
      }
    });
  }

  // 2. FORM VALIDATION & STORAGE LOGIC (Contact Page)
  const savedEmail = localStorage.getItem("bakery_user_email");
  const emailInput = document.getElementById("email");
  if (savedEmail && emailInput) {
    emailInput.value = savedEmail;
  }

  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      let isValid = true;
      
      // Clear previous error messages if any
      document.querySelectorAll(".error-msg").forEach(el => el.remove());

      // Validate Full Name
      const fullNameInput = document.getElementById("fullname");
      if (fullNameInput && fullNameInput.value.trim() === "") {
        isValid = false;
        showError(fullNameInput, "Please enter your full name.");
      }

      // Validate Email (checks for @ and .)
      if (emailInput) {
        const emailVal = emailInput.value.trim();
        if (!emailVal.includes("@") || !emailVal.includes(".")) {
          isValid = false;
          showError(emailInput, "Please enter a valid email address containing an @ and a domain extension.");
        } else {
          // Save valid email to localStorage
          localStorage.setItem("bakery_user_email", emailVal);
        }
      }

      if (!isValid) {
        event.preventDefault(); // Stop submission if invalid
      }
    });
  }
});

// Helper function to display error messages near fields
function showError(inputElement, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-msg";
  errorDiv.style.color = "#D88C5A";
  errorDiv.style.fontSize = "0.85rem";
  errorDiv.style.marginTop = "0.25rem";
  errorDiv.textContent = message;
  inputElement.parentNode.appendChild(errorDiv);
}
