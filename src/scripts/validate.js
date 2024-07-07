// Функция убирает класс у элемента ошибки и текст ошибки
function hideInputError(formElem, inputElem, formData) {
  const errorElem = formElem.querySelector(`.${inputElem.name}-error`);
  inputElem.classList.remove(formData.inputErrorClass);
  errorElem.classList.remove(formData.errorClass);
  errorElem.textContent = "";
}

// Функция добавляет класс для элемента с ошибкой и показывает текст ошибки, при невалидном инпуте
function showInputError(formElem, inputElem, errorMessage, formData) {
  const errorElem = formElem.querySelector(`.${inputElem.name}-error`);
  inputElem.classList.add(formData.inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(formData.errorClass);
}

// Функция дизэйблит/раздизэйбливает кнопку в зависимости от валидности инпутов
function toggleButton(inputList, buttonElem, formData) {
  // Если есть невалидный инпут, дизэйблим кнопку
  if (hasInvalidInput(inputList)) {
    deactivateButton(buttonElem, formData);
    // иначе раздизэйбливаем
  } else {
    buttonElem.classList.remove(formData.inactiveButtonClass);
    buttonElem.removeAttribute("disabled");
  }
}

function deactivateButton(buttonElem, formData) {
  buttonElem.classList.add(formData.inactiveButtonClass);
  buttonElem.setAttribute("disabled", true);
}

export function clearErrorFields(formElem, formData) {
  const inputList = Array.from(
    formElem.querySelectorAll(formData.inputSelector)
  );
  const buttonElem = formElem.querySelector(formData.submitButtonSelector);

  inputList.forEach((inputElem) => {
    hideInputError(formElem, inputElem, formData);
  });
  deactivateButton(buttonElem, formData);
}

//Функция удаляет/добавляет ошибки в зависимости от валиден или нет инпут
function checkInputValidity(formElem, inputElem, formData) {
  // Проверяет совпадает ли регулярка с введенным значением в инпут
  if (inputElem.validity.patternMismatch) {
    inputElem.setCustomValidity(inputElem.dataset.errorMessage);
  } else {
    inputElem.setCustomValidity("");
  }

  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, formData);
  } else {
    hideInputError(formElem, inputElem, formData);
  }
}

//Функция проверяет наличие невалидного инпута
function hasInvalidInput(inputList) {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  });
}

//Добавляет обработчики событий на инпуты (делает массив из инпутов формы, проходится по массиву, чтоб добавить или удалить ошибки, а так же дизэйблить/раздизэйблить кнопку )
function setEventListeners(formElem, buttonElem, formData) {
  const inputList = Array.from(
    formElem.querySelectorAll(formData.inputSelector)
  );

  toggleButton(inputList, buttonElem, formData);

  inputList.forEach((inputElem) => {
    inputElem.addEventListener("input", function () {
      checkInputValidity(formElem, inputElem, formData);
      toggleButton(inputList, buttonElem, formData);
    });
  });
}

// Функция принимает объект формы и проверяет валидность
export function enableValidation(formData) {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));
  formList.forEach((formElem) => {
    const buttonElem = formElem.querySelector(formData.submitButtonSelector);
    formElem.addEventListener("submit", () => {});
    setEventListeners(formElem, buttonElem, formData);
  });
}
