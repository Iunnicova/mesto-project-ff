import { deleteCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

// Функция удаления карточки
function handleDeleteCard(card, cardId) {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
}

function createCard(dataCard, showImage, userId, processLike) {
  const listElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imgElement = listElement.querySelector(".card__image");
  const titleElement = listElement.querySelector(".card__title");
  const buttonElement = listElement.querySelector(".card__delete-button");
  const cardLikeButton = listElement.querySelector(".card__like-button");
  const cardLikeInfo = listElement.querySelector(".card__like-info");

  if (dataCard.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    processLike(cardLikeButton, cardLikeInfo, dataCard._id);
  });

  imgElement.addEventListener("click", () => {
    showImage(dataCard);
  });

  imgElement.alt = dataCard.name;
  imgElement.src = dataCard.link;
  titleElement.textContent = dataCard.name;
  cardLikeInfo.textContent = dataCard.likes.length;

  if (dataCard.owner._id !== userId) {
    buttonElement.classList.add("card__delete-button_hidden");
  } else {
    buttonElement.addEventListener("click", () => {
      handleDeleteCard(listElement, dataCard._id);
    });
  }

  return listElement;
}

export { createCard };
