// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesListElement = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(image, title, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = image;
    cardImage.alt = title;
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
    placesListElement.append(createCard(item.link, item.name, deleteCard));    
});