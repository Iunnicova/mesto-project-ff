export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-17",
  headers: {
    authorization: "22df120b-52a8-47b1-ab66-ef30693fcf47",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}`);
  }
  return res.json();
};

// Запрос на получение всех данных юзера
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Запрос на обновление профиля юзера
export function updateUserInfo({ name, job }) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then(checkResponse);
}

// Запрос на обновление аватара юзера
export function updateUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
}

// Запрос на получение всех карточек
export function getAllCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Запрос на добавление новой карточки
export function addNewCard({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

// Запрос на удаление карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

// Запрос на установку лайка карточке
export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

// Запрос на удаление лайка карточке
export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}
