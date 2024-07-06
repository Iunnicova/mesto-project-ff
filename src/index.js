import "./pages/index.css";
import { initialCards } from "./utils/constans.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import { createCard } from "./scripts/card.js";
import { enableValidation, clearErrorFields } from "./scripts/validate.js";

const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");

//попапы
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popapShowImage = document.querySelector(".popup_type_image");
const imageElem = popapShowImage.querySelector(".popup__image");
const captionElem = popapShowImage.querySelector(".popup__caption");

// форма редактирования профиля и ее инпуты
const formEditProfile = document.querySelector('[name="edit-profile"]');
const userNameInput = formEditProfile.querySelector('[name="name"]');
const userJobInput = formEditProfile.querySelector('[name="description"]');

// форма добавления карточки и ее инпуты
const formAddCard = document.querySelector('[name="new-place"]');
const linkImageInput = formAddCard.querySelector('[name="link"]');
const nameImageInput = formAddCard.querySelector('[name="place-name"]');

// кнопки открытия попапов
const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBtn = document.querySelector(".profile__add-button");

// контейнер для вставки карточек
const placesList = document.querySelector(".places__list");

// **********************

// методом масива мы пробегаемся по всем попапа и вешаем слушатель события клика при котором вызываем функцию на закрытие попапа
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

initialCards.forEach((item) => {
  const card = createCard(item, showImage);
  placesList.append(card);
});

// функция получает данные названия и ссылки с карточки и подставаляет их в попап
function showImage(data) {
  imageElem.src = data.link;
  imageElem.alt = data.name;
  captionElem.textContent = data.name;
  openPopup(popapShowImage);
}

// обработчики события клика на открытие попапов
profileEditBtn.addEventListener("click", () => {
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
  openPopup(popupEditProfile);
  clearErrorFields(formEditProfile, formConfig);
});

cardAddBtn.addEventListener("click", () => {
  openPopup(popupAddCard);
  clearErrorFields(formAddCard, formConfig);
  formAddCard.reset();
});

// слушатель события отправки формы редоктирования профиля
formEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closePopup(popupEditProfile);
});

//слушатель события отправки формы добавление карточки
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = { link: linkImageInput.value, name: nameImageInput.value };
  const card = createCard(formData, showImage);
  placesList.prepend(card);
  closePopup(popupAddCard);
  formAddCard.reset();
});

// Валидация Форм
const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(formConfig);
