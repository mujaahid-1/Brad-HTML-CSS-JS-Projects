const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message.
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  //   formControl.className = "form-control error";
  formControl.classList.add("error");
  small.textContent = message;
}

// Show suceess outline.
const showSuccess = (input) => {
  const formControl = input.parentElement;
  //   formControl.className = "form-control success";
  formControl.classList.remove("error");
  formControl.classList.add("success");
};

// Check email is valid.
const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // return regex.test(String(email).toLowerCase());
  if (regex.test(email.value.trim())) showSuccess(email);
  else if (email.value === "") showError(email, "Email is required");
  else showError(email, "Email is not valid");
};

// Get Field Name.
function getFieldName(input) {
  // Solution 1
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);

  // Solution 2.
  //     .split(" ")
  //     .map((letter) => letter.slice(0, 1).toUpperCase() + letter.slice(1));
  //
}

// Check required fields.
const checkRequired = function (inputArr) {
  inputArr.forEach((input) => {
    // console.log(fieldName);
    if (input.value.trim() === "")
      showError(input, `${getFieldName(input)} is required`);
    else {
      showSuccess(input);
    }
  });
};

// Check input length.
const checkLength = (input, min, max) => {
  if (input.value.length < min)
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`,
    );
  else if (input.value.length > max)
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`,
    );
  else showSuccess(input);
};

// Check password match.
function checkPasswordsMatch(password, password2) {
  if (password.value !== password2.value)
    showError(password2, "Passwords do not match");
}

////////////////////////////////////////////////////////
// EVENT LISTENERS.
////////////////////////////////////////////////////////
// Prevent the form's default submission behavior.
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // if (username.value === "") showError(username, "Username is required");
  // else showSuccess(username);

  // if (email.value === "") showError(email, "Email is required");
  // else if (!isValidEmail(email.value)) showError(email, "Email is not valid");
  // else showSuccess(email);

  // if (password.value === "") showError(password, "Password is required");
  // else showSuccess(password);

  // if (password2.value === "") showError(password2, "Password is required");
  // else showSuccess(password2);
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  isValidEmail(email);
  checkPasswordsMatch(password, password2);
});
