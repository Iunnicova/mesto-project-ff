const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach((item) => {
	const card = createCard(item);
	placesList.append(card);
})

function deleteCard(card) {
	card.remove()
}

function createCard(card) {
	const listElement = cardTemplate.querySelector('.places__item').cloneNode(true);
	const imgElement = listElement.querySelector('.card__image');
	const titleElement = listElement.querySelector('.card__title');
	const buttonElement = listElement.querySelector('.card__delete-button');

	imgElement.alt = card.name;
	imgElement.src = card.link;
	titleElement.textContent = card.name;

	buttonElement.addEventListener('click', () => {
		deleteCard(listElement)
	})

	return listElement;
}