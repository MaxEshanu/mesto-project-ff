// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const cardData = initialCards;
// @todo: Функция создания карточки

function createCard(cardData, deleteCard) { 
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });
  return cardElement
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardsContainer.append(cardElement);
});
