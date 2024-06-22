//Импорты

import './pages/index.css';
import {createCard, deleteCard, cardLike, showCards} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';
import {enableValidation} from './scripts/validation.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

//Попап профиля

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileImg = profile.querySelector('.profile__image');
const profileDescr = profile.querySelector('.profile__description');
const editProfileButton = profile.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editPopupCloseButton = popupTypeEdit.querySelector('.popup__close');
const userName = popupTypeEdit.querySelector('.popup__input_type_name');
const userDescr = popupTypeEdit.querySelector('.popup__input_type_description');
const popupEditForm = popupTypeEdit.querySelector('.popup__form');
editProfileButton.addEventListener('click', () => {
  userName.value = profileTitle.textContent;
  userDescr.value = profileDescr.textContent;
  openModal(popupTypeEdit)});
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
popupNewCardForm.addEventListener('submit', () => {myNewCard()});



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

//Валидация

enableValidation();

//Запросы к серверу

function getUser() {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
    method: 'GET',
    headers: {
      authorization: 'cdadadbe-9b78-499d-b557-fa10b7ab1ab1'
    }
  })
    .then(res => {return res.json()})
    .then(data => {
      profileTitle.textContent = data.name
      profileDescr.textContent = data.about
      profileImg.style = `background-image: url(${data.avatar})`
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err)});
}

function getCards() {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    method: 'GET',
    headers: {
      authorization: 'cdadadbe-9b78-499d-b557-fa10b7ab1ab1'
    }
  })
    .then(res => {return res.json()})
    .then(data => data.forEach((data) => {
      const cardElement = showCards(cardTemplate, data, openModalCard, cardLike);
      cardsContainer.append(cardElement);
    }))
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err)});
    
}

function updateUser () {fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'cdadadbe-9b78-499d-b557-fa10b7ab1ab1',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: profileTitle.textContent,
    about: profileDescr.textContent
  })

})
}

function myNewCard () {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
  method: 'POST',
  headers: {
    authorization: 'cdadadbe-9b78-499d-b557-fa10b7ab1ab1',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: cardName.value,
    link: cardLink.value
  })
  
  
})
.then(res => {return res.json()})
.then(data => {
  const cardObject = {
    name: data.name,
    link: data.link,
  };
  const cardElement = createCard(cardTemplate, cardObject, deleteCard, openModalCard, cardLike);
  cardsContainer.append(cardElement);
})
}

function likee () {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    method: 'GET',
    headers: {
      authorization: 'cdadadbe-9b78-499d-b557-fa10b7ab1ab1'
    }
  })
    .then(res => {return res.json()})
    .then(data => {
      const likeCounter = data.likes
      console.log(likeCounter)
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err)});
}

getCards();
popupEditForm.addEventListener('submit', () => {updateUser(), getUser()});





