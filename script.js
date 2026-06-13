const words = [
    "I am an AI Software Engineer",
    "I am a Creative Problem Solver",
    "I am a Cybersecurity Beginner"
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

const typingText = document.querySelector(".typing");

function type() {

    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent =
        currentWord.substring(0, letterIndex--);

    } else {
        typingText.textContent =
        currentWord.substring(0, letterIndex++);
    }

    let speed = isDeleting ? 70 : 120;

    if (!isDeleting && letterIndex === currentWord.length + 1) {

        speed = 1500;
        isDeleting = true;

    }

    else if (isDeleting && letterIndex === 0) {

        isDeleting = false;
        wordIndex++;

        if (wordIndex === words.length) {
            wordIndex = 0;
        }

    }

    setTimeout(type, speed);
}

type();

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
  const error = input.parentElement.querySelector('.error-message');
  if (error) {
    error.textContent = message;
  }
  input.classList.add('input-error');
}

function clearError(input) {
  const error = input.parentElement.querySelector('.error-message');
  if (error) {
    error.textContent = '';
  }
  input.classList.remove('input-error');
}

function validateForm() {
  let valid = true;
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const subjectField = document.getElementById('subject');
  const messageField = document.getElementById('message');

  [nameField, emailField, subjectField, messageField].forEach(field => {
    clearError(field);
    if (!field.value.trim()) {
      showError(field, 'This field is required.');
      valid = false;
    }
  });

  if (emailField.value.trim() && !validateEmail(emailField.value.trim())) {
    showError(emailField, 'Enter a valid email address.');
    valid = false;
  }

  return valid;
}

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      formMessage.textContent = 'Message sent successfully. Thank you!';
      formMessage.className = 'form-feedback success';
      contactForm.reset();
    } else {
      formMessage.textContent = 'Please correct the highlighted fields before sending.';
      formMessage.className = 'form-feedback error';
    }
  });

  inputs.forEach(input => {
    input.addEventListener('input', function () {
      clearError(input);
      formMessage.textContent = '';
      formMessage.className = 'form-feedback';
    });
  });
}
