const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardDeleteButton = document.querySelector('.card__delete-button');

initialCards.forEach(({ name, link }) => {
	const listElement = cardTemplate.querySelector('.places__item').cloneNode(true);
	listElement.querySelector('.card__image').alt = name;
	listElement.querySelector('.card__image').src = link;
	listElement.querySelector('.card__title').textContent = name;
	listElement.querySelector('.card__delete-button');

	placesList.append(listElement);

	addEventListener('click', function (addAnEvent) {
		const cardDeleteButton = addAnEvent.target.closest('.card');
		cardDeleteButton.remove();
	});
});

console.log(initialCards);

