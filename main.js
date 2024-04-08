const passwordInput = document.querySelector("#passwordInput");
const eyeBtn = document.querySelector("#eyeBtn");
const cleanBtn = document.querySelector("#cleanBtn");
const generateBtn = document.querySelector("#generateBtn");
const validators = document.querySelectorAll("span.validator");

const eyeIcons = {
  open: '<i class="bi bi-eye"></i>',
  closed: '<i class="bi bi-eye-slash"></i>',
};

const validatorIcons = {
  correct: '<i class="bi bi-check-lg"></i>',
  incorrect: '<i class="bi bi-x-lg"></i>',
  default: '<i class="bi bi-circle-fill"></i>',
};

cleanBtn.addEventListener("click", () => {
  passwordInput.value = "";
  validators.forEach((validator) => {
    validator.innerHTML = validatorIcons.default;
  });
});

eyeBtn.addEventListener("click", function () {
  const isPasswordType = passwordInput.type === "password";
  passwordInput.type = isPasswordType ? "text" : "password";
  this.innerHTML = isPasswordType ? eyeIcons.closed : eyeIcons.open;
});

generateBtn.addEventListener("click", () => {
  const generatedPassword = generatePassword();
  passwordInput.value = generatedPassword;
  // Trigger the keyup event to update the validation icons
  passwordInput.dispatchEvent(new Event("keyup"));
});

passwordInput.addEventListener("keyup", function () {
  const password = this.value.trim();
  this.value = password;

  if (password === "") {
    validators.forEach((validator) => {
      validator.innerHTML = validatorIcons.default;
    });
    return;
  }

  validators[0].innerHTML = getValidatorIcon(password.length >= 8);
  validators[1].innerHTML = getValidatorIcon(password.length <= 22);
  validators[2].innerHTML = getValidatorIcon(/\w/.test(password));
  validators[3].innerHTML = getValidatorIcon(/[a-z]/.test(password));
  validators[4].innerHTML = getValidatorIcon(/[A-Z]/.test(password));
  validators[5].innerHTML = getValidatorIcon(/\d/.test(password));
  validators[6].innerHTML = getValidatorIcon(
    /!|@|#|\$|%|\^|&|\*/.test(password)
  );
});

function getValidatorIcon(isCorrect) {
  return isCorrect ? validatorIcons.correct : validatorIcons.incorrect;
}

function generatePassword() {
  const length = getRandomInt(8, 22);
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  // Ensure the password contains at least one character from each required category
  password += getRandomChar("abcdefghijklmnopqrstuvwxyz");
  password += getRandomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  password += getRandomChar("0123456789");
  password += getRandomChar("!@#$%^&*");

  // Fill the rest of the password length with random characters from the charset
  for (let i = password.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Shuffle the password to randomize character positions
  password = shuffleString(password);

  return password;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

function shuffleString(str) {
  const array = str.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array.join("");
}
