export function openModal (popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', (e) => {closeModalByEsc(e, popup)});
};

function closeModalByEsc (e, popup) {
  if (e.code === "Escape") {
    closeModal(popup);
  }
}

export function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (e) => {closeModalByEsc(e, popup)});
  popup.removeEventListener('click', closeOverlay);
};

function closeOverlay (popup) {
  if(popup.currentTarget === popup.target) {
    closeModal(popup.currentTarget);
  } 
};

