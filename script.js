'use strict';

const multiStepInfo = {
    name: '',
    email: '',
    phoneNumber: '',
    location: '',
    homeType: '',
    budgetId: -1
}
const ValidationRules = {
    MIN_NAME_LENGTH: 2,
    MIN_EMAIL_LENGTH: 5,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_NUMBER_FORMAT_REGEX: /^5\d{8}$/,
    LOCATION_MIN_LENGTH: 3
}
const elements = {
    details: {
        name: document.getElementById('name'),
        name_error: document.getElementsByClassName('name-error')[0],

        email: document.getElementById('email'),
        email_error: document.getElementsByClassName('email-error')[0],

        phone: document.getElementById('phone'),
        phone_error: document.getElementsByClassName('phone-error')[0],

        location: document.getElementById('location'),
        location_error: document.getElementsByClassName('location-error')[0],

        isValid: false
    }
}

const canGoNextStep = false;
const canGoPreviusStep = false;

// #region Details Form Events
elements.details.name.addEventListener('focusout', (event) => {
    let nameValue = event.target.value;
    if (nameValue.length < ValidationRules.MIN_NAME_LENGTH) {
        elements.details.name_error.classList.remove('hidden');
    } else {
        elements.details.name_error.classList.add('hidden');
        multiStepInfo.name = nameValue;
    }
})
elements.details.email.addEventListener('focusout', (event) => {
    let isEmailValid = event.target.value.length >= ValidationRules.MIN_EMAIL_LENGTH && ValidationRules.EMAIL_REGEX.test(event.target.value);
    if (isEmailValid) {
        elements.details.email_error.classList.add('hidden');
        multiStepInfo.email = event.target.value;

    } else {
        elements.details.email_error.classList.remove('hidden');
    }
})
elements.details.phone.addEventListener('focusout', (event) => {
    let phone = event.target.value;
    let isValid = ValidationRules.PHONE_NUMBER_FORMAT_REGEX.test(phone);
    if(isValid) {
        multiStepInfo.phoneNumber = phone;
        elements.details.phone_error.classList.add('hidden');
    }
    else{
        elements.details.phone_error.classList.remove('hidden');
    }

})
elements.details.location.addEventListener('focusout', (event) => {
    let location = event.target.value;
    let isValid = location.length > ValidationRules.LOCATION_MIN_LENGTH;

    if(isValid) {
        multiStepInfo.location = location;
        elements.details.location_error.classList.add('hidden');
    }
    else{
        elements.details.location_error.classList.remove('hidden');
    }

})
// #endregion