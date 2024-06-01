//Импорты

import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard} from './scripts/cards.js';
import {deleteCard} from './scripts/cards.js';
import {openModal} from './scripts/modal.js';
import { closeModal } from './scripts/modal.js';
import {handleFormSubmit} from './scripts/modal.js';
import { openModalCard } from './scripts/modal.js';
import { cardLike } from './scripts/cards.js';

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
const editPopupSaveButton = popupTypeEdit.querySelector('.popup__button');
const userName = popupTypeEdit.querySelector('.popup__input_type_name');
userName.value = profileTitle.textContent;
const userDescr = popupTypeEdit.querySelector('.popup__input_type_description');
userDescr.value = profileDescr.textContent;
editProfileButton.addEventListener('click', () => {openModal(popupTypeEdit)});


editPopupSaveButton.onclick = function (evt){evt.preventDefault()};
editPopupSaveButton.addEventListener('click', () => {handleFormSubmit()});

//Попап добавления карточки

const newCardButton = profile.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
newCardButton.addEventListener('click', () => {openModal(popupNewCard)});

//Добавление новых карточек
const cardName = popupNewCard.querySelector('.popup__input_type_card-name');
const cardLink = popupNewCard.querySelector('.popup__input_type_url');
const newCardSaveButton = popupNewCard.querySelector('.popup__button');
newCardSaveButton.onclick = function (evt){evt.preventDefault()};
newCardSaveButton.addEventListener('click', () => {addNewCard()});
newCardSaveButton.addEventListener('click', () => {closeModal(popupNewCard)});

function addNewCard () {
  const cardObject = {
    name: cardName.value,
    link: cardLink.value,
  };
  initialCards.unshift(cardObject);
  const cardElement = createCard(cardTemplate, initialCards[0], deleteCard, openModalCard, cardLike);
  cardsContainer.prepend(cardElement);
};

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardTemplate, cardData, deleteCard, openModalCard, cardLike);
  cardsContainer.append(cardElement);
});














  








