// Функция создания карточки
export function createCard(cardTemplate, image, title, totalLikes, deleteCard, handleLikeButton, handleCardClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // карточка
    const cardImage = cardElement.querySelector('.card__image'); // картинка
    const buttonLike = cardElement.querySelector('.card__like-button');  // кнопка лайка
    const likeCounter = cardElement.querySelector('.card__like-counter'); // строка с числом лайков
    
    // Заполнение карточки
    cardImage.src = image;
    cardImage.alt = title;
    cardElement.querySelector('.card__title').textContent = title;
    likeCounter.textContent = totalLikes;

    // Обработчик кнопки лайка
    buttonLike.addEventListener('click', handleLikeButton);

    // Обработчик кнопки удаления карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));

    // Обработчик клика по изображению
    cardImage.addEventListener('click', () => handleCardClick(image, title));

    return cardElement;
};

// Функция обработки кнопки лайка
export function handleLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
export function deleteCard(card) {
    card.remove();
};