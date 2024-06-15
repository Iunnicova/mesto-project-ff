// функции для закрытия/открытия попапов

// в этой функции проверяем, если нажатие произошло на кнопку Escape, то закрываем попап, который в данный момент был открыт
const handleEsc = (event) => {
  event.preventDefault();
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closePopup(activePopup);
  }
};

// функция открытия попапа принимает на вход попап и добавляет ему класс, чтоб попап открылся, а так же на документ вешает слушатель события нажатия на кнопку для вызова функции, которая эжет надатия именно на Escape, чтобы закрыть попап
const openPopup = (popup) => {
  document.addEventListener("keyup", handleEsc);
  popup.classList.add("popup_is-opened");
};

// функция закрытия попапа принимает на вход попап и удаляет активный класс, чтоб попап закрылся, а так же с документа снимает слушатель события, по куоторому могла вызываться функция handleEsc
const closePopup = (popup) => {
  document.removeEventListener("keyup", handleEsc);
  popup.classList.remove("popup_is-opened");
};

export { openPopup, closePopup };
