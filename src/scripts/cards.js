export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(cardTemplate, cardData, deleteCard, openModalCard, cardLike) { 
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', () => {openModalCard(cardData)});

  likeButton.addEventListener('click', () => {cardLike(likeButton)})
  
  return cardElement
};

export function deleteCard(cardElement) {
  cardElement.remove();
};

export function cardLike(likeButton) {
  if (likeButton.classList.contains('card__like-button_is-active') === true) {
    likeButton.classList.remove('card__like-button_is-active')
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}


