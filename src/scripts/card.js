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
  likeButton.classList.toggle('card__like-button_is-active');
}


