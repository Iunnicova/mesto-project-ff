
import './pages/index.css';
import { initialCards } from './utils/constans.js';
import { openPopup, closePopup } from './scripts/modal.js'
import { createCard } from './scripts/card.js'

const userName = document.querySelector('.profile__title')
const userJob = document.querySelector('.profile__description')

//попапы
const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_new-card')

// форма редактирования профиля и ее инпуты
const formEditProfile = document.querySelector('[name="edit-profile"]')
const userNameInput = formEditProfile.querySelector('[name="name"]')
const userJobInput = formEditProfile.querySelector('[name="description"]')
// форма добавления карточки и ее инпуты
const linkImageInput = formEditProfile.querySelector('[name="place-name"]')
const nameImageInput = formEditProfile.querySelector('[name="link"]')
const formAddCard = document.querySelector('[name="new-place"]')

// кнопки открытия попапов
const profileEditBtn = document.querySelector('.profile__edit-button')
const cardAddBtn = document.querySelector('.profile__add-button')

// контейнер для вставки карточек
const placesList = document.querySelector('.places__list');

// **********************

// методом масива мы пробегаемся по всем попапа и вешаем слушатель события клика при котором вызываем функцию на закрытие попапа
popups.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
			closePopup(popup);
		}
	})
})

initialCards.forEach((item) => {
	const card = createCard(item);
	placesList.append(card);
})

// обработчики события клика на открытие попапов
profileEditBtn.addEventListener('click', () => {
	userNameInput.value = userName.textContent
	userJobInput.value = userJob.textContent 
	openPopup(popupEditProfile)
})

cardAddBtn.addEventListener('click', () => {
	openPopup(popupAddCard)
})

// Обработчик «отправки» формы
function handleFormSubmit(event) {
  event.preventDefault();
}

// слушатели события отправки формы
formEditProfile.addEventListener('submit', (e) => {
	userName.textContent = userNameInput.value 
	userJob.textContent = userJobInput.value 
	handleFormSubmit(e);
	closePopup(popupEditProfile)
});

formAddCard.addEventListener('submit', handleFormSubmit);

