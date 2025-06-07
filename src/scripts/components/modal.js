// Функция открытия модального окна
export function openPopup(modal) {
    // Окно открывается
    modal.classList.add('popup_is-opened');

    // Добавим обработчик закрытия по Esc
    document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия модального окна
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    // Удаляем обработчик на Esc
    document.removeEventListener('keydown', handleEscClose);
}

// Функция для закрытия окна по нажатию Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

export function handleOverlayClick(evt) {
    if (!evt.target.closest('.popup__content')) {
        closePopup(evt.currentTarget);
    }
}