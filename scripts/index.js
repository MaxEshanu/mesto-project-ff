// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(deleteCard) { 

  initialCards.forEach(function (element) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardsContainer.append(cardElement);

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

})}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

addCard(deleteCard);
