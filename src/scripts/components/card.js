// Функция создания карточки
export function createCard(cardTemplate, cardData, userId, handlers) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // карточка
    const cardImage = cardElement.querySelector('.card__image'); // картинка
    const buttonLike = cardElement.querySelector('.card__like-button');  // кнопка лайка
    const likeCounter = cardElement.querySelector('.card__like-counter'); // строка с числом лайков
    const deleteButton = cardElement.querySelector('.card__delete-button'); // кнопка удаления
    const cardTitle = cardElement.querySelector('.card__title');

    // Заполнение карточки
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    // Если лайк мой - закрасить сердечко
    if (cardData.likes.some(user => user._id === userId)) {
        buttonLike.classList.add('card__like-button_is-active');
    }

    // Если карточка чужая - убрать кнопку удаления
    if (cardData.owner._id !== userId) {
        deleteButton.remove();
    }

    // Обработчик кнопки лайка
    buttonLike.addEventListener('click', () => 
        handleLikeButton(cardData._id, buttonLike, likeCounter, handlers.onLike)
    );

    // Обработчик кнопки удаления карточки
    if (deleteButton) {
        deleteButton.addEventListener('click', () =>
            handlers.onAskDelete(cardData._id, cardElement) 
        );
    }

    // Обработчик клика по изображению
    cardImage.addEventListener('click', () => 
        handlers.onPreview(cardData.link, cardData.name)
    );

    return cardElement;
};

// Функция обработки кнопки лайка
function handleLikeButton(cardId, buttonLike, likeCounter, onLike) {
    const isLikedNow = buttonLike.classList.contains('card__like-button_is-active');

    // Вызываем колбэк, который пришел из index.js
    onLike(cardId, isLikedNow)
        .then(newCard => {
            // Обновление UI после ответа сервера
            buttonLike.classList.toggle('card__like-button_is-active');
            likeCounter.textContent = newCard.likes.length;
        })
        .catch(err => console.log(err));
};

// Функция удаления карточки
export function deleteCard(cardId, cardElement, onDelete) {
    // Вызываем колбэк, который пришел из index.js.
    return onDelete(cardId)
        .then(() => cardElement.remove());
};