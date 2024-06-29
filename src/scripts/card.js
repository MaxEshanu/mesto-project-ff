import { deleteCardRequest, toggleLike } from "./api.js";

export function createCard(
  cardTemplate,
  cardData,
  deleteCard,
  openModalCard,
  likeCard,
  userId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like_counter-number");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", () => {
      deleteCardRequest(cardData._id)
      .then(deleteCard(cardElement))
    });
  } else {
    deleteButton.remove();
  }
  cardElement.querySelector(".card__title").textContent = cardData.name;

  likeCounter.textContent = cardData.likes.length;

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => {
    openModalCard(cardData);
  });

  likeButton.addEventListener("click", (evt) =>
    likeCard(evt, cardData._id, likeCounter)
  );

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(evt, cardId, likeCounter) {
  toggleLike(
    cardId,
    evt.target.classList.contains("card__like-button_is-active")
  )
    .then((result) => {
      evt.target.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = result.likes.length;
    })
    .catch((err) => console.log(err));
}
