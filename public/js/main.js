// Find the contact form on the page
const contactForm = document.getElementById("contact-form");

// Run validation only when the contact form exists
if (contactForm) {

    // Find the form fields
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

// Find the area for validation messages
  const clientMessage = document.getElementById("client-message");

// Check form fields before submission
contactForm.addEventListener("submit", (event) => {

// Read and clean the values entered by the visitor
   const name = nameInput.value.trim();
   const email = emailInput.value.trim();
   const message = messageInput.value.trim();

// Clear any previous validation message
clientMessage.textContent = "";
clientMessage.style.display = "none";

// Stop submission when a field is empty
if (name === "" || email === "" || message === "") {
  event.preventDefault();
  clientMessage.textContent = "Please complete all fields before sending your message.";
  clientMessage.style.display = "block";
} else if (!email.includes("@")) {

  // Stop submission when the email format is not valid
  event.preventDefault();
  clientMessage.textContent = "Please enter a valid email address.";
  clientMessage.style.display = "block";
}
  });
}
