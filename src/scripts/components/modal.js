import { handleLikeButton } from "./card";

// Функция открытия модального окна
export function handlePopup(modal, name, job, nameInput, descriptionInput) {
    if (modal.querySelector('.popup__form') && modal.classList.contains('popup_type_edit')) {
        enterValuesInInput(name, job, nameInput, descriptionInput);
    }

    // Окно открывается
    modal.classList.add('popup_is-opened');

    // Находим кнопку, которая закроет окно
    const closeButton = modal.querySelector('.popup__close');

    // Закрываем окно по нажатию на крестик
    closeButton.addEventListener('click', () => closePopup());

    // Закрываем окно по нажатию на оверлей
    modal.addEventListener('click', () => {
        const isContentClicked = event.target.closest('.popup__content');
        if (!isContentClicked) {
            closePopup();
        }
    });

    // Закрываем окно по нажатию на esc
    document.addEventListener('keydown', () => {
        if (event.key === 'Escape') {
            closePopup();
        }
    });
}

// Функция для заполнения полей текущими значениями из профиля
export function enterValuesInInput(name, job, nameInput, descriptionInput) {
    nameInput.value = name.textContent;
    descriptionInput.value = job.textContent;
}

// Функция закрытия модального окна
function closePopup() {
    const popupCurrent = document.querySelector('.popup_is-opened');

    if (!popupCurrent) {return}

    popupCurrent.classList.remove('popup_is-opened');
    cleanPopupInput(popupCurrent);    
}

// Функция для очистки полей ввода
function cleanPopupInput(popupCurrent) {
    setTimeout(() => {
        const inputsCurrent = popupCurrent.querySelectorAll('.popup__input');
        inputsCurrent.forEach((input) => {input.value = ''});
    }, 600);
}

// Функция открытия окна с изображением
export function openImageModal(imageModal, image, title) {
    const popupImage = imageModal.querySelector('.popup__image');
    popupImage.src = image;
    popupImage.alt = title;
    imageModal.querySelector('.popup__caption').textContent = title;
    handlePopup(imageModal);
}

// Функция обработки формы редактирования личной информации
export function handleEditForm(evt, name, job, nameInput, descriptionInput) {
    evt.preventDefault();

    // Подставляем новые значения на страницу
    name.textContent = nameInput.value;
    job.textContent = descriptionInput.value;

    // Закрываем окно
    closePopup();
}

// Функция обработки формы добавления новых карточек
export function handleFormAddCard(evt, placesListElement, imageLinkInput, placeNameInput, imageModal, createCard, deleteCard, handleLikeButton, openImageModal, cardTemplate) {
    evt.preventDefault();

    // Создаем новую карточку
    const newCard = createCard(
        cardTemplate,
        imageLinkInput.value, 
        placeNameInput.value,
        imageModal, 
        deleteCard,
        handleLikeButton,
        openImageModal
    );

    //Добавляем карточку в начало списка
    placesListElement.prepend(newCard);

    //Закрываем окно
    closePopup();
}
