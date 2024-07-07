import "./pages/index.css";
import { openPopup, closePopup } from "./scripts/modal.js";
import { createCard } from "./scripts/card.js";
import { enableValidation, clearErrorFields } from "./scripts/validate.js";
import {
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  getAllCards,
  addNewCard,
} from "./scripts/api.js";

// ***************** КОНСТАНТЫ
const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId;
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");

//попапы
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popapShowImage = document.querySelector(".popup_type_image");
const imageElem = popapShowImage.querySelector(".popup__image");
const captionElem = popapShowImage.querySelector(".popup__caption");

// форма редактирования профиля и ее инпуты
const formEditProfile = document.querySelector('[name="edit-profile"]');
const userNameInput = formEditProfile.querySelector('[name="name"]');
const userJobInput = formEditProfile.querySelector('[name="description"]');

// форма изменения аватара и ее инпуты
const formChangeAvatar = document.querySelector('[name="form-change-avatar"]');
const userAvatarInput = formChangeAvatar.querySelector(
  '[name="change-avatar"]'
);

// форма добавления карточки и ее инпуты
const formAddCard = document.querySelector('[name="new-place"]');
const linkImageInput = formAddCard.querySelector('[name="link"]');
const nameImageInput = formAddCard.querySelector('[name="place-name"]');

// кнопки открытия попапов
const profileEditBtn = document.querySelector(".profile__edit-button");
const cardAddBtn = document.querySelector(".profile__add-button");
const avatarChangeBtn = document.querySelector(".profile__change-avatar-btn");

// контейнер для вставки карточек
const placesList = document.querySelector(".places__list");

// **********************

// Запросы на сервер за получением данных
Promise.all([getUserInfo(), getAllCards()])
  .then(([userData, cardData]) => {
    userName.textContent = userData.name;
    userJob.textContent = userData.about;
    userAvatar.src = userData.avatar;
    userId = userData._id;
    console.log(cardData);
    cardData.forEach((card) => {
      placesList.append(createCard(card, showImage, userId));
    });
  })
  .catch((err) => {
    console.error(`Ошибка: ${err} `);
  });

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

// Функция изменяет текст кнопки в зависимости от загрузки
function handleLoading(isLoading, popup) {
  const submitButton = popup.querySelector(".popup__button");
  isLoading
    ? (submitButton.textContent = "Сохранение...")
    : (submitButton.textContent = "Сохранить");
}

// функция получает данные названия и ссылки с карточки и подставаляет их в попап
function showImage(data) {
  imageElem.src = data.link;
  imageElem.alt = data.name;
  captionElem.textContent = data.name;
  openPopup(popapShowImage);
}

// **********************

// обработчики события клика на открытие попапов
profileEditBtn.addEventListener("click", () => {
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
  openPopup(popupEditProfile);
  clearErrorFields(formEditProfile, formConfig);
});

avatarChangeBtn.addEventListener("click", () => {
  openPopup(popupChangeAvatar);
  clearErrorFields(formChangeAvatar, formConfig);
  formChangeAvatar.reset();
});

cardAddBtn.addEventListener("click", () => {
  openPopup(popupAddCard);
  clearErrorFields(formAddCard, formConfig);
  formAddCard.reset();
});

// **********************

// Функция редактированя профиля юзера
function handleEditProfile(evt) {
  evt.preventDefault();
  handleLoading(true, popupEditProfile);
  updateUserInfo({
    name: userNameInput.value,
    job: userJobInput.value,
  })
    .then(() => {
      userName.textContent = userNameInput.value;
      userJob.textContent = userJobInput.value;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err} `);
    })
    .finally(() => {
      handleLoading(false, popupEditProfile);
    });
}
// слушатель события отправки формы редоктирования профиля
formEditProfile.addEventListener("submit", handleEditProfile);

// Функция редактированя аватара
function handleChangeAvatar(evt) {
  evt.preventDefault();
  handleLoading(true, popupChangeAvatar);

  updateUserAvatar(userAvatarInput.value)
    .then((data) => {
      userAvatar.src = data.avatar;
      closePopup(popupChangeAvatar);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err} `);
    })
    .finally(() => {
      handleLoading(false, popupChangeAvatar);
    });
}

// слушатель события отправки формы редоктирования аватара
formChangeAvatar.addEventListener("submit", handleChangeAvatar);

// Функция добавления карточки
function handleAddCard(evt) {
  evt.preventDefault();
  handleLoading(true, popupAddCard);

  addNewCard({
    name: nameImageInput.value,
    link: linkImageInput.value,
  })
    .then((newCard) => {
      placesList.prepend(createCard(newCard, showImage, userId));
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err} `);
    })
    .finally(() => {
      handleLoading(false, popupAddCard);
    });
}

//слушатель события отправки формы добавление карточки
formAddCard.addEventListener("submit", handleAddCard);

// **********************

// Валидация Форм
enableValidation(formConfig);
