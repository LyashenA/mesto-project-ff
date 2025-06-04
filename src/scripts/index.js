import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleLikeButton, deleteCard } from './components/card.js';
import { handlePopup, openImageModal, handleEditForm, handleFormAddCard } from './components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesListElement = document.querySelector('.places__list');

// Кнопки для вызова модальных окон
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Модальные окна
const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

// Переменные окна редактирования
const editProfileForm = editModal.querySelector('.popup__form'); //форма редактирования
const nameInput = editProfileForm.querySelector('.popup__input_type_name'); 
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');

// Личная информация
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');

// Переменные окна добавления карточек
const addProfileForm = addModal.querySelector('.popup__form');
const placeNameInput = addProfileForm.querySelector('.popup__input_type_card-name');
const imageLinkInput = addProfileForm.querySelector('.popup__input_type_url');

// Для всех модальных окон добавим плавную анимацию
document.querySelectorAll('.popup').forEach((popup) => {popup.classList.add('popup_is-animated');});

// Вывести карточки на страницу
initialCards.forEach(item => {
    placesListElement.append(createCard(cardTemplate, item.link, item.name, imageModal, deleteCard, handleLikeButton, openImageModal));    
});

// Показываем модальное окно для редактирования личной информации
editButton.addEventListener('click', () => {
    handlePopup(editModal, name, job, nameInput, descriptionInput); 
});

// Показываем модальное окно для добавления карточки
addButton.addEventListener('click', () => {
    handlePopup(addModal); 
});

// Обработка формы редактирования личной информации
editProfileForm.addEventListener('submit', (evt) => handleEditForm(evt, name, job, nameInput, descriptionInput)); 

// Обработка формы добавления карточек
addProfileForm.addEventListener('submit', (evt) => 
    handleFormAddCard(
        evt, 
        placesListElement,  
        imageLinkInput, 
        placeNameInput,
        imageModal,
        createCard,
        deleteCard,
        handleLikeButton,
        openImageModal,
        cardTemplate
    )
); 
