'use strict';

const multiStepInfo = {
    name: '', email: '', phone: '', location: '', homeType: '', budgetId: -1
}
const elements = {
    contactDetailsForm: {
        name: document.getElementById('name'),
        name_error: document.getElementsByClassName('name-error')[0],

        email: document.getElementById('email'),
        email_error: document.getElementsByClassName('email-error')[0],

        phone: document.getElementById('phone'),
        phone_error: document.getElementsByClassName('phone-error')[0],

        location: document.getElementById('location'),
        location_error: document.getElementsByClassName('location-error')[0],

        mainContent: document.getElementById('contact_details'),
        progressBar: document.getElementById('person-details-step'),

        isValid: false,
        isStepCompleted: false,
    },
    home_details_elements: {
        home_radio_buttons: document.querySelectorAll('.radio-button'),
        home_details: document.getElementById('home-details'),


        mainContent: document.getElementById('home-details'),
        progressBar: document.getElementById('home-details-step'),
        isVAlid: false,
        isStepCompleted: false
    },
    budget_details_elements: {
        mainContent: document.getElementById('budget-details'),
        progressBar: document.getElementById('budget-progress-bar')
    },
    last_step_elements: {
        mainContent: document.getElementById('last-step'),
        progressBar: document.getElementById('last-step-progress-bar'),
    },

    button_next_step: document.getElementById('btn-next-step'),
    button_prev_step: document.getElementById('btn-prev-step'),
    contact_details: document.getElementById('contact_details'),
    step_process_one: document.getElementById('step-one'),
    step_process_two: document.getElementById('step-two'),
    budget_details: document.getElementById('budget-details'),
    last_step: document.getElementById('last-step'),
    budget_radio_buttons: document.querySelectorAll('.budget-radio-button'),
}
const steps = [{

    element: elements.contactDetailsForm.mainContent, progressBar: elements.contactDetailsForm.progressBar,
}, {
    element: elements.home_details_elements.mainContent, progressBar: elements.home_details_elements.progressBar
}, {
    element: elements.budget_details_elements.mainContent, progressBar: elements.budget_details_elements.progressBar
}, {
    element: elements.last_step_elements.mainContent, progressBar: elements.last_step_elements.progressBar,
}]
let currentStepIndex = 0;
const ValidationRulesForContactDetailsMap = new Map([
    ['name', {
        required: true,
        fieldName: 'name',
        hasMinLength: true,
        minLength: 2,
        errorMessage: 'Name is required'
    }],
    ['email', {
        required: true,
        fieldName: 'email',
        hasMinLength: true,
        minLength: 5,
        isEmail: true,
        errorMessage: 'Email is required'
    }],
    ['phone', {
        required: true,
        fieldName: 'phone',
        isPhone: true,
        hasMinLength: true,
        minLength: 9,
        errorMessage: 'Phone is required'
    }],
    ['location', {
        required: true, fieldName: 'location', hasMinLength: true, minLength: 2, errorMessage: 'Name is required'
    }],])

// Functions
const Validator = function (validationRules, value) {
    let response = {errorMessage: '', isValid: false};
    if (validationRules.required) {
        response.errorMessage = `${validationRules.fieldName} must not be empty.`;
        response.isValid = value !== null && value !== undefined && value.length > 0;
    }
    if (!response.isValid) return response;

    if (validationRules.hasMinLength) {
        response.isValid = value.length >= validationRules.minLength;
        response.errorMessage = `${validationRules.fieldName} must be min. ${validationRules.minLength} length`;
    }
    if (validationRules.isEmail) {
        response.isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        response.errorMessage = `${value} is not a valid email address.`;
    }
    if (validationRules.isPhone) {
        response.isValid = /^5\d{8}$/.test(value);
        response.errorMessage = `${value} is not a valid phone number.`;
    }

    return response;
}
const ValidateCurrentForm = function () {
    let isAllInputsValid = [];
    switch (currentStepIndex) {
        case 0: // Validate Contact Details Form
            isAllInputsValid = [];
            let FieldValidatorsKeys = ValidationRulesForContactDetailsMap.keys();

            FieldValidatorsKeys.forEach(validatorKey => {
                let inputValueToValidate = elements.contactDetailsForm.mainContent.querySelector(`#${validatorKey}`).value;
                let validationRule = ValidationRulesForContactDetailsMap.get(validatorKey);
                console.log(validationRule);
                let response = Validator(validationRule, inputValueToValidate);
                if (response.isValid) HideError(validatorKey)
                else ShowError(validatorKey, response.errorMessage);

                isAllInputsValid.push(response.isValid);
            })
            return isAllInputsValid.every(x => x); // Contact form Validation
        // You can Add other validations here for other Forms :)
        default :

            break;
    }
    return true;
}
const RemoveAllProcessClasses = function (element) {
    element.progressBar.classList.remove('in-process');
    element.progressBar.classList.remove('in-process-reversed');
    element.progressBar.classList.remove('completed');
    element.progressBar.classList.remove('completed-reversed');


}
const ShowError = function (fieldName, errorMessage) {
    let errorSpan = document.getElementsByClassName(`${fieldName}-error`)[0];
    errorSpan.innerText = errorMessage;
    errorSpan.classList.remove('hidden');
}
const HideError = function (fieldName) {
    document.getElementsByClassName(`${fieldName}-error`)[0].classList.add('hidden');
}
const MoveToNextStep = function () {
    let nextSteps = steps.filter((item, index) => index > currentStepIndex);
    let completedSteps = steps.filter((item, index) => index < currentStepIndex);
    let inProcessStep = steps.find((item, index) => index === currentStepIndex);

    // Hide Current Form/Content
    inProcessStep.progressBar.classList.add('completed');
    inProcessStep.progressBar.classList.remove('in-process');
    inProcessStep.element.classList.add('hidden');

    // Open Next Step/Form
    if (!nextSteps.length) return;

    let newCurrentForm = nextSteps.shift();
    newCurrentForm.progressBar.classList.remove('in-process-reversed')
    let timeOut = setTimeout(function () {
        newCurrentForm.progressBar.classList.add('in-process');
    }, 1000)
    newCurrentForm.element.classList.remove('hidden');

    // Mark All Previus Steps as Completed
    completedSteps.forEach(step => {
        step.progressBar.classList.remove('in-process');
        step.progressBar.classList.remove('in-process-reversed');
        step.progressBar.classList.remove('completed-reversed');

        step.element.classList.add('hidden');
    })
    currentStepIndex++;
}
const MoveToPreviousStep = function () {
    let hasPrevStep = currentStepIndex > 0;
    if (hasPrevStep) {
        let prevStep = steps[currentStepIndex - 1];
        let currentStep = steps[currentStepIndex];

        currentStep.element.classList.add('hidden');
        currentStep.progressBar.classList.add('in-process-reversed');

        currentStep.progressBar.classList.remove('in-process');
        currentStep.progressBar.classList.remove('completed');
        currentStep.progressBar.classList.remove('completed-reversed');

        prevStep.element.classList.remove('hidden');

        if (currentStepIndex === steps.length - 1) {
            RemoveAllProcessClasses(currentStep)
            RemoveAllProcessClasses(prevStep)
            prevStep.progressBar.classList.add('completed-reversed');
        } else {
            setTimeout(() => {
                RemoveAllProcessClasses(currentStep)
                RemoveAllProcessClasses(prevStep)
                prevStep.progressBar.classList.add('completed-reversed');
            }, 1000)
        }
        // prevStep.progressBar.classList.add('completed-reversed');
        currentStepIndex--;
    }
}
const ShowNextAndPrevButtons = function () {
    switch (currentStepIndex) {
        case 0:
            elements.button_next_step.classList.remove('hidden');
            elements.button_prev_step.classList.add('hidden');
            elements.button_prev_step.parentElement.style.justifyContent = 'flex-end';
            break;

        case steps.length - 1 :
            elements.button_next_step.classList.add('hidden');
            elements.button_prev_step.classList.remove('hidden');
            elements.button_prev_step.parentElement.style.justifyContent = 'flex-start';
            break;

        default:
            elements.button_next_step.classList.remove('hidden');
            elements.button_prev_step.classList.remove('hidden');
            elements.button_prev_step.parentElement.style.justifyContent = 'space-between';
            break;
    }
}
// End of Functions

// Events
elements.home_details_elements.home_radio_buttons.forEach((element => {
    element.addEventListener('click', function (event) {
        elements.home_details_elements.home_radio_buttons.forEach((tempElement) => {
            if (tempElement !== element) tempElement.classList.remove('radio-active')
            else tempElement.classList.add('radio-active');
        })
        let radioValue = element.getElementsByTagName('input')[0];
        if (radioValue && radioValue.value) multiStepInfo.homeType = radioValue.value;
        event.preventDefault();
    })
}))
elements.contactDetailsForm.phone.addEventListener('keypress', (event) => {
    if (!Number(event.key) || elements.contactDetailsForm.phone.value.length > 9)
        event.preventDefault();
});
elements.button_next_step.addEventListener('click', (event) => {
    let isCurrentFormValid = ValidateCurrentForm();

    if (!isCurrentFormValid) return;
    if (currentStepIndex === steps.length - 1) return;

    MoveToNextStep();
    ShowNextAndPrevButtons();
})
elements.button_prev_step.addEventListener('click', function () {
    MoveToPreviousStep();
    ShowNextAndPrevButtons();
    let currentStep = steps[currentStepIndex];
})
// End of Events
