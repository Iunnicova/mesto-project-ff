const cardTemplate = document.querySelector("#card-template").content

function deleteCard(card) {
  card.remove()
}

function handleLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active")
}

function createCard(dataCard, func) {
  const listElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true)
  const imgElement = listElement.querySelector(".card__image")
  const titleElement = listElement.querySelector(".card__title")
  const buttonElement = listElement.querySelector(".card__delete-button")
  const cardLikeButton = listElement.querySelector(".card__like-button")

  cardLikeButton.addEventListener("click", () => {
    handleLikeCard(cardLikeButton)
  })

  imgElement.addEventListener("click", () => {
    func(dataCard)
  })

  imgElement.alt = dataCard.name
  imgElement.src = dataCard.link
  titleElement.textContent = dataCard.name
  buttonElement.addEventListener("click", () => {
    deleteCard(listElement)
  })

  return listElement
}

export { createCard }
