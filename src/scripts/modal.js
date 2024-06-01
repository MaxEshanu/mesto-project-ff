export function openModal (popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeOverlay, {once:true});
  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      closeModal(popup);
    }
  }, {once:true});
};

export function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
};

export function closeOverlay (popup) {
  if(popup.currentTarget === popup.target) {
    closeModal(popup.currentTarget);
  } 
};

