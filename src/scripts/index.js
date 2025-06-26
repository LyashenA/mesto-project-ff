import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleLikeButton, deleteCard } from './components/card.js';
import { openPopup, closePopup, handleOverlayClick } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, editUserProfile, addNewCard } from './components/api.js';

const cardTemplate = document.querySelector('#card-template').content; // Темплейт карточки
const placesListElement = document.querySelector('.places__list'); // Список карточек

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
const avatar = document.querySelector('.profile__image');

// Переменные окна добавления карточек
const addCardForm = addModal.querySelector('.popup__form'); //форма добавления карточек
const placeNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const imageLinkInput = addCardForm.querySelector('.popup__input_type_url');
let totalLikes; // число лайков на карточке

//Объект с настройками валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Функция открытия окна с изображением
function openImageModal(image, title) {
    const popupImage = imageModal.querySelector('.popup__image');
    popupImage.src = image;
    popupImage.alt = title;
    imageModal.querySelector('.popup__caption').textContent = title;
    openPopup(imageModal);
}

// Функция обновления личной инфорации в DOM
function updateUserInfoOnPage(data) {
    name.textContent = data.name;
    job.textContent = data.about;
}

// Функция обработки формы редактирования личной информации
function handleEditForm(evt) {
    evt.preventDefault();

    // Собираем новые данные с формы
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;

    // Отправляем новые данные на сервер
    editUserProfile(newName, newDescription)
        // Если запрос выполнен успешно
        .then(data => {
            // Обновляем данные на странице
            updateUserInfoOnPage(data);
            // И закрываем окно
            closePopup(editModal);
        })
        .catch(err => console.log(err));
}

// Функция обработки формы добавления новых карточек
function handleFormAddCard(evt) {
    evt.preventDefault();

    // Собираем данные с формы
    const name = placeNameInput.value;
    const link = imageLinkInput.value;

    // Отправляем новые данные на сервер
    addNewCard(name, link)
        // Если запрос выполнен успешно
        .then(data => {
            // Создаем новую карточку
            const newCard = createCard(
                cardTemplate,
                data.link, 
                data.name,
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
        })
        .catch(err => console.log(err));
}

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
        // Сохраняем userID
        const userID = userData._id;

        // Вставляем на страницу имя, описание и аватар
        name.textContent = userData.name;
        job.textContent = userData.about;
        avatar.src = userData.avatar;
        
        // Вывести карточки на страницу
        cards.forEach(cardData => {
            totalLikes = cardData.likes.length;
            placesListElement.append(
                createCard(
                cardTemplate, 
                cardData.link, 
                cardData.name,
                totalLikes,
                deleteCard, 
                handleLikeButton, 
                (image, title) => openImageModal(image, title)
                )
            );    
        });
    })
    .catch(err => console.log(err));

// Для всех модальных окон добавим плавную анимацию
document.querySelectorAll('.popup').forEach((popup) => {popup.classList.add('popup_is-animated');});

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

    // Очистка ошибок валидации
    clearValidation(editProfileForm, validationConfig);

    openPopup(editModal); 
});

// Показываем модальное окно для добавления карточки
addButton.addEventListener('click', () => {
    // Очистка ошибок валидации
    clearValidation(addCardForm, validationConfig);

    openPopup(addModal); 
});

// Обработка формы редактирования личной информации
editProfileForm.addEventListener('submit', (evt) => {
    handleEditForm(evt);
}); 

// Обработка формы добавления карточек
addCardForm.addEventListener('submit', (evt) => {
    handleFormAddCard(evt);
}); 

// Включение валидации форм
enableValidation(validationConfig);

