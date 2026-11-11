// ==========================================
// NORTH STAR BAKERY - INTERACTIVITY & STORAGE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("North Star Bakery website loaded successfully!");

  // 1. Restore saved form data or preferences from localStorage if available
  const savedEmail = localStorage.getItem("bakery_user_email");
  const emailInput = document.getElementById("email");
  if (savedEmail && emailInput) {
    emailInput.value = savedEmail;
  }

  // 2. Form Validation on Submission
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      let isValid = true;
      
      // Clear previous error messages if any
      document.querySelectorAll(".error-msg").forEach(el => el.remove());

      // Validate Full Name
      const fullNameInput = document.getElementById("fullname") || contactForm.querySelector("input[type='text']");
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