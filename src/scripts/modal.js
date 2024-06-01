export function openModal (popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {closeModal(popup)});
  popup.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      closeModal(popup);
    }
  });
};

export function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
};

export function closeOverlay (evt) {
  if(evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
};

export function openModalCard (cardData) {
  const cardPopupImage = document.querySelector('.popup__image');
  const cardPopupCaption = document.querySelector('.popup__caption');
  const cardPopup = document.querySelector('.popup_type_image');
  cardPopupImage.src = cardData.link;
  cardPopupCaption.alt = cardData.name;
  cardPopupCaption.textContent = cardData.name;
  openModal(cardPopup);
};

export function handleFormSubmit() {
  const profile = document.querySelector('.profile');
  const profileTitle = profile.querySelector('.profile__title');
  const profileDescr = profile.querySelector('.profile__description');
  const popupTypeEdit = document.querySelector('.popup_type_edit');
  const userName = popupTypeEdit.querySelector('.popup__input_type_name');
  const userDescr = popupTypeEdit.querySelector('.popup__input_type_description');
  profileTitle.textContent = userName.value;
  profileDescr.textContent = userDescr.value;
  closeModal(popupTypeEdit);
}



