import { deleteCard, addLike, deleteLike } from "./api";

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
// Функция добавляет/удаляет лайк, в зависимости от того, установлен был или нет
function handleLikeCard(likeButton, likeInfo, cardId) {
  const handleLikeFunction = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : addLike;

  handleLikeFunction(cardId)
    .then((cardData) => {
      likeInfo.textContent = cardData.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
}

function createCard(dataCard, func, userId) {
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
    handleLikeCard(cardLikeButton, cardLikeInfo, dataCard._id);
  });

  imgElement.addEventListener("click", () => {
    func(dataCard);
  });

  imgElement.alt = dataCard.name;
  imgElement.src = dataCard.link;
  titleElement.textContent = dataCard.name;
  cardLikeInfo.textContent = dataCard.likes.length;

  if (dataCard.owner._id !== userId) {
    buttonElement.classList.add("card__delete-button_hidden");
  }

  buttonElement.addEventListener("click", () => {
    handleDeleteCard(listElement, dataCard._id);
  });

  return listElement;
}

export { createCard };
