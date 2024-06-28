const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-16",
  headers: {
    authorization: "cdadadbe-9b78-499d-b557-fa10b7ab1ab1",
    "Content-Type": "application/json",
  },
};

const paths = {
  cards: "/cards",
  likes: "/cards/likes",
  myUser: "/users/me",
  userAvatar: "/users/me/avatar",
};

function checkRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

function makeRequest(path, method, body) {
  return fetch(`${config.baseUrl}${path}`, {
    method: method,
    headers: config.headers,
    body: JSON.stringify(body),
  }).then(checkRes);
}

export function getUser() {
  return makeRequest(paths.myUser, "GET");
}

export function updateUser(name, about) {
  return makeRequest(paths.myUser, "PATCH", { name, about });
}

export function updateAvatar(link) {
  return makeRequest(paths.userAvatar, "PATCH", { avatar: link });
}

export function getCards() {
  return makeRequest(paths.cards, "GET");
}

export function postNewCard({ name, link }) {
  return makeRequest(paths.cards, "POST", { name, link });
}

export function deleteCardRequest(cardId) {
  return makeRequest(`${paths.cards}/${cardId}`, "DELETE");
}

function likeCard(cardId) {
  return makeRequest(`${paths.likes}/${cardId}`, "PUT");
}

function deleteLike(cardId) {
  return makeRequest(`${paths.likes}/${cardId}`, "DELETE");
}

export function toggleLike(cardId, isLiked) {
  return isLiked ? deleteLike(cardId) : likeCard(cardId);
}
