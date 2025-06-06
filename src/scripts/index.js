import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleLikeButton, deleteCard } from './components/card.js';
import { openPopup, closePopup, handleOverlayClick } from './components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesListElement = document.querySelector('.places__list');

// Кнопки для вызова модальных окон
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Модальные окна
const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

// Все модальные окна
const popups = document.querySelectorAll('.popup');

// Переменные окна редактирования
const editProfileForm = editModal.querySelector('.popup__form'); //форма редактирования
const nameInput = editProfileForm.querySelector('.popup__input_type_name'); 
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');

// Личная информация
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');

// Переменные окна добавления карточек
const addCardForm = addModal.querySelector('.popup__form');
const placeNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const imageLinkInput = addCardForm.querySelector('.popup__input_type_url');


// Функция открытия окна с изображением
function openImageModal(image, title) {
    const popupImage = imageModal.querySelector('.popup__image');
    popupImage.src = image;
    popupImage.alt = title;
    imageModal.querySelector('.popup__caption').textContent = title;
    openPopup(imageModal);
}

// Функция обработки формы редактирования личной информации
function handleEditForm(evt) {
    evt.preventDefault();

    // Подставляем новые значения на страницу
    name.textContent = nameInput.value;
    job.textContent = descriptionInput.value;

    // Закрываем окно
    closePopup(editModal);
}

// Функция обработки формы добавления новых карточек
function handleFormAddCard(evt) {
    evt.preventDefault();

    // Создаем новую карточку
    const newCard = createCard(
        cardTemplate,
        imageLinkInput.value, 
        placeNameInput.value,
        deleteCard, 
        handleLikeButton, 
        (image, title) => openImageModal(image, title)
    );

    //Добавляем карточку в начало списка
    placesListElement.prepend(newCard);

    //Закрываем окно
    closePopup(addModal);

    //Очистка полей формы
    evt.target.reset();
}

// Для всех модальных окон добавим плавную анимацию
document.querySelectorAll('.popup').forEach((popup) => {popup.classList.add('popup_is-animated');});

// Вывести карточки на страницу
initialCards.forEach(item => {
    placesListElement.append(
        createCard(
            cardTemplate, 
            item.link, 
            item.name,
            deleteCard, 
            handleLikeButton, 
            (image, title) => openImageModal(image, title)
        )
    );    
});

//Добавим обработчики для закрытия
popups.forEach((popup) => {
    //По крестику
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closePopup(popup);

        // Очищаем форму, если это попап добавления карточки
        if (popup.classList.contains('popup_type_new-card')) {
            addCardForm.reset();
        }
    });

    //По оверлею
    popup.addEventListener('mousedown', (evt) => {
        handleOverlayClick(evt);

        // Очищаем форму, если это попап добавления карточки
        if (popup.classList.contains('popup_type_new-card') && !popup.classList.contains('popup_is-opened')) {
            addCardForm.reset();
        }
    });
});

// Показываем модальное окно для редактирования личной информации
editButton.addEventListener('click', () => {
    nameInput.value = name.textContent;
    descriptionInput.value = job.textContent;
    openPopup(editModal); 
});

// Показываем модальное окно для добавления карточки
addButton.addEventListener('click', () => {
    openPopup(addModal); 
});

// Обработка формы редактирования личной информации
editProfileForm.addEventListener('submit', (evt) => handleEditForm(evt)); 

// Обработка формы добавления карточек
addCardForm.addEventListener('submit', (evt) => handleFormAddCard(evt)); 
