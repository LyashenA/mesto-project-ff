export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
        setEventLicteners(formElement, validationConfig);
    });
}

export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.setCustomValidity("");

        hideInputError(formElement, inputElement, validationConfig);
    });

    toggleButtonState(inputList, buttonElement, validationConfig);
}

function setEventLicteners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);

            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
}

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

function isValid(formElement, inputElement, validationConfig) {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    }

    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
    else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}