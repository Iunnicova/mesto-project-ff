import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const popapShowImage = document.querySelector(".popup_type_image");
const imageElem = popapShowImage.querySelector(".popup__image");
const captionElem = popapShowImage.querySelector(".popup__caption");
function deleteCard(card) {
  card.remove();
}

function createCard(card) {
  const listElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imgElement = listElement.querySelector(".card__image");
  const titleElement = listElement.querySelector(".card__title");
  const buttonElement = listElement.querySelector(".card__delete-button");
  const cardLikeButton = listElement.querySelector(".card__like-button");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  imgElement.addEventListener("click", () => {
    imageElem.src = card.link;
    imageElem.alt = card.name;
    captionElem.textContent = card.name;
    openPopup(popapShowImage);
  });

  imgElement.alt = card.name;
  imgElement.src = card.link;
  titleElement.textContent = card.name;
  buttonElement.addEventListener("click", () => {
    deleteCard(listElement);
  });

  return listElement;
}

export { createCard };
