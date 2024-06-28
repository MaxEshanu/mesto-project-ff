//Импорты

import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getCards,
  getUser,
  postNewCard,
  updateAvatar,
  updateUser,
} from "./scripts/api.js";

// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы

const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");

//Валидация

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

enableValidation(validationConfig);

//Попап профиля

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileImg = profile.querySelector(".profile__image");
const profileDescr = profile.querySelector(".profile__description");
const editProfileButton = profile.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const editPopupCloseButton = popupTypeEdit.querySelector(".popup__close");
const userName = popupTypeEdit.querySelector(".popup__input_type_name");
const userDescr = popupTypeEdit.querySelector(".popup__input_type_description");
const popupEditForm = popupTypeEdit.querySelector(".popup__form");
editProfileButton.addEventListener("click", () => {
  userName.value = profileTitle.textContent;
  userDescr.value = profileDescr.textContent;
  clearValidation(popupTypeEdit, validationConfig);
  openModal(popupTypeEdit);
});
editPopupCloseButton.addEventListener("click", () => {
  closeModal(popupTypeEdit);
});
popupEditForm.addEventListener("submit", updateUserInfo);

//Попап добавления карточки

const newCardButton = profile.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardCloseBtn = popupNewCard.querySelector(".popup__close");
newCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
});
popupNewCardCloseBtn.addEventListener("click", () => {
  closeModal(popupNewCard);
});

//Попан аватара

const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarBtn = profile.querySelector(".profile__image");
const popupAvatarCloseBtn = popupTypeAvatar.querySelector(".popup__close");
const userAvatar = popupTypeAvatar.querySelector(".popup__input_type_url");
const popupAvatarForm = popupTypeAvatar.querySelector(".popup__form");
popupAvatarBtn.addEventListener("click", () => {
  openModal(popupTypeAvatar);
});
popupAvatarCloseBtn.addEventListener("click", () => {
  closeModal(popupTypeAvatar);
});
popupAvatarForm.addEventListener("submit", updateUserAvatar);

//Добавление новых карточек

const cardName = popupNewCard.querySelector(".popup__input_type_card-name");
const cardLink = popupNewCard.querySelector(".popup__input_type_url");
const popupNewCardForm = popupNewCard.querySelector(".popup__form");
popupNewCardForm.addEventListener("submit", createNewCard);

//Открытие попапа карточки

const cardPopup = document.querySelector(".popup_type_image");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close");
cardPopupCloseBtn.addEventListener("click", () => closeModal(cardPopup));

function openModalCard(cardData) {
  const cardPopupImage = document.querySelector(".popup__image");
  const cardPopupCaption = document.querySelector(".popup__caption");
  cardPopupImage.src = cardData.link;
  cardPopupCaption.alt = cardData.name;
  cardPopupCaption.textContent = cardData.name;
  openModal(cardPopup);
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Обновление кнопки "Сохранить"

function renderLoading(isLoading) {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (openedPopup) {
    const submitButton = openedPopup.querySelector(".popup__button");

    submitButton.textContent = isLoading ? "Сохранение..." : "Сохранить";
  }
}

//Взаимодействие с API

function createNewCard(evt) {
  evt.preventDefault();

  const name = cardName.value;
  const link = cardLink.value;

  renderLoading(true);
  postNewCard({ name, link })
    .then((card) => {
      const cardElement = createCard(
        cardTemplate,
        card,
        deleteCard,
        openModalCard,
        likeCard,
        card.owner._id
      );
      cardsContainer.prepend(cardElement);
      popupNewCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupNewCard);
    });
}

function updateUserInfo(evt) {
  evt.preventDefault();

  const name = userName.value;
  const about = userDescr.value;

  renderLoading(true);
  updateUser(name, about)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescr.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupTypeEdit);
    });
}

function updateUserAvatar(evt) {
  evt.preventDefault();

  renderLoading(true);
  updateAvatar(userAvatar.value)
    .then((data) => {
      profileImg.style.backgroundImage = `url(${data.avatar})`;
      popupAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupTypeAvatar);
    });
}

function renderProfile(user) {
  profileTitle.textContent = user.name;
  profileDescr.textContent = user.about;
  profileImg.style.backgroundImage = `url(${user.avatar})`;
}
function renderCards(cards, userId) {
  cards.forEach((card) => {
    const cardElement = createCard(
      cardTemplate,
      card,
      deleteCard,
      openModalCard,
      likeCard,
      userId
    );
    cardsContainer.append(cardElement);
  });
}

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    renderProfile(user);
    renderCards(cards, user._id);
  })
  .catch((err) => console.log(err));
