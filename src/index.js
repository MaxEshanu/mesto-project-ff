//Импорты

import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, cardLike} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

//Попап профиля

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescr = profile.querySelector('.profile__description');
const editProfileButton = profile.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editPopupCloseButton = popupTypeEdit.querySelector('.popup__close');
const userName = popupTypeEdit.querySelector('.popup__input_type_name');
userName.value = profileTitle.textContent;
const userDescr = popupTypeEdit.querySelector('.popup__input_type_description');
userDescr.value = profileDescr.textContent;
const popupEditForm = popupTypeEdit.querySelector('.popup__form');
editProfileButton.addEventListener('click', () => {openModal(popupTypeEdit)});
editPopupCloseButton.addEventListener('click', () => {closeModal(popupTypeEdit)});

popupEditForm.addEventListener('submit', handleSubmitEditPopupBtn);
function handleSubmitEditPopupBtn(event) {
  event.preventDefault();
  profileTitle.textContent = userName.value;
  profileDescr.textContent = userDescr.value;
  closeModal(popupTypeEdit);
  userName.value = profileTitle.textContent;
  userDescr.value = profileDescr.textContent;
}

//Попап добавления карточки

const newCardButton = profile.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardCloseBtn = popupNewCard.querySelector('.popup__close');
newCardButton.addEventListener('click', () => {openModal(popupNewCard)});
popupNewCardCloseBtn.addEventListener('click', () => {closeModal(popupNewCard)});

//Добавление новых карточек
const cardName = popupNewCard.querySelector('.popup__input_type_card-name');
const cardLink = popupNewCard.querySelector('.popup__input_type_url');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
popupNewCardForm.addEventListener('submit', () => {addNewCard(event)});

function addNewCard (event) {
  event.preventDefault()
  const cardObject = {
    name: cardName.value,
    link: cardLink.value,
  };
  const cardElement = createCard(cardTemplate, cardObject, deleteCard, openModalCard, cardLike);
  cardsContainer.prepend(cardElement);
  closeModal(popupNewCard);
  popupNewCardForm.reset();
};

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardTemplate, cardData, deleteCard, openModalCard, cardLike);
  cardsContainer.append(cardElement);
});

//Открытие попапа карточки

const cardPopup = document.querySelector('.popup_type_image');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close');
cardPopupCloseBtn.addEventListener('click', () => closeModal(cardPopup));

function openModalCard (cardData) {
  const cardPopupImage = document.querySelector('.popup__image');
  const cardPopupCaption = document.querySelector('.popup__caption');
  cardPopupImage.src = cardData.link;
  cardPopupCaption.alt = cardData.name;
  cardPopupCaption.textContent = cardData.name;
  openModal(cardPopup);
};

