const form = document.forms.form;
const inputs = form.querySelectorAll('.form__input, .form__textarea');
const fieldsets = form.querySelectorAll('.form__fieldset');
const formAgreement = form.elements.agreementCheckbox;
const formButton = form.elements.submitButton;

inputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();
    removeErrorClass(fieldsets[index]);
    const errorElement = fieldsets[index].nextElementSibling;
    if (errorElement && errorElement.classList.contains('error')) {
      errorElement.remove();
    }
  });
});

formAgreement.addEventListener('change', (e) => {
  e.preventDefault();
  const errorElement = document.querySelector('.agreement').nextElementSibling;
  if (errorElement && errorElement.classList.contains('error')) {
    errorElement.remove();
  }
  formButton.disabled = !formAgreement.checked;
});

form.addEventListener('submit', validateForm);

function validateForm(e) {
  e.preventDefault();
  if (document.querySelectorAll('.error')) {
    document.querySelectorAll('.error').forEach((error) => {
      error.remove();
    });
  }
  for (let i = 0; i < inputs.length; i++) {
    checkValidity(inputs[i], fieldsets[i]);
  }
  if (
    getComputedStyle(document.querySelector('.agreement')).display !== 'none'
  ) {
    formButton.disabled = !formAgreement.checked;
    if (!formAgreement.checked) {
      createNewElement(
        'Обязательное поле',
        'div',
        document.querySelector('.agreement'),
        'error'
      );
    }
  }
  if (document.querySelectorAll('.error').length === 0) {
    submitForm({
      sender: form.elements.sender.value,
      email: form.elements.email.value,
      text: form.elements.text.value,
      agreement: form.elements.agreementCheckbox.checked,
    });
  }
}

function checkValidity(input, field) {
  if (input.validity.valueMissing) {
    createNewElement('Обязательное поле', 'div', field, 'error');
    addErrorClass(field);
  }
  if (input.validity.tooShort) {
    createNewElement(
      `Минимальная длина - ${input.minLength} символов`,
      'div',
      field,
      'error'
    );
    addErrorClass(field);
  }
  if (input.validity.tooLong) {
    createNewElement(
      `Максимальная длина - ${input.maxLength} символов`,
      'div',
      field,
      'error'
    );
    addErrorClass(field);
  }
  if (input.validity.typeMismatch && input.type === 'email') {
    createNewElement(
      'Пожалуйста, введите корректный email',
      'div',
      field,
      'error'
    );
    addErrorClass(field);
  }
  if (input.validity.patternMismatch && input.type === 'email') {
    createNewElement('Некорректное значение в поле', 'div', field, 'error');
    addErrorClass(field);
  }
}

function createNewElement(content, tag, elem, classNew) {
  const newElem = document.createElement(tag);
  newElem.classList.add(classNew);
  newElem.innerHTML = content;
  elem.after(newElem);
}

function removeErrorClass(elem) {
  elem.classList.remove('error-border');
}
function addErrorClass(elem) {
  elem.classList.add('error-border');
}

function submitForm(data) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      alert('Сообщение отправлено');
      inputs.forEach((input) => {
        input.value = '';
      });
      if (
        getComputedStyle(document.querySelector('.agreement')).display !==
        'none'
      ) {
        formAgreement.checked = false;
      }
    })
    .catch((err) => console.log(err));
}
