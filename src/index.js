
import './pages/index.css';
import { initialCards } from './utils/constans.js';
import { openPopup, closePopup } from './scripts/modal.js'
import { createCard } from './scripts/card.js'

//попапы
const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_new-card')

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
	openPopup(popupEditProfile)
})

cardAddBtn.addEventListener('click', () => {
	openPopup(popupAddCard)
})

