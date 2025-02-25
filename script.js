'use strict';

const multiStepInfo = {
    name: '',
    email: '',
    phone: '',
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
    button_next_step: document.getElementsByClassName('btn-next-step')[0],
    contact_details: document.getElementById('contact_details'),
    step_process_one: document.getElementById('step-one'),
    step_process_two: document.getElementById('step-two'),
    budget_details: document.getElementById('budget-details'),
    last_step: document.getElementById('last-step'),
    budget_radio_buttons: document.querySelectorAll('.budget-radio-button'),
}
const steps = [
    {

        element: elements.details.mainContent,
        progressBar: elements.details.progressBar,
    },
    {
        element: elements.home_details_elements.mainContent,
        progressBar: elements.home_details_elements.progressBar
    },
    {
        element: elements.budget_details_elements.mainContent,
        progressBar: elements.budget_details_elements.progressBar
    },
    {
        element: elements.last_step_elements.mainContent,
        progressBar: elements.last_step_elements.progressBar,
    }
]
let currentStepIndex = 0;
const IsFirstStepValid = function (){
    return multiStepInfo.name && multiStepInfo.email && multiStepInfo.location && multiStepInfo.phoneNumber;
}
const ShowErrors = function (){
    let allKeys = Object.keys(multiStepInfo);
    console.log(multiStepInfo[allKeys[0]]);

    for(let i = 0; i < allKeys.length; i++){
        let errorInputElementSpan = document.querySelector(`.${allKeys[i]}-error`);
        if(multiStepInfo[allKeys[i]]){ // if value is NULL or NAN or Undefined or ''
            if(errorInputElementSpan)
            errorInputElementSpan.classList.add('hidden');
        }
        else{
            if(errorInputElementSpan)
            errorInputElementSpan.classList.remove('hidden');
        }

    }
}

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
    if (isValid) {
        multiStepInfo.phone = phone;
        elements.details.phone_error.classList.add('hidden');
    } else {
        elements.details.phone_error.classList.remove('hidden');
    }
})
elements.details.location.addEventListener('focusout', (event) => {
    let location = event.target.value;
    let isValid = location.length > ValidationRules.LOCATION_MIN_LENGTH;

    if (isValid) {
        multiStepInfo.location = location;
        elements.details.location_error.classList.add('hidden');
    } else {
        elements.details.location_error.classList.remove('hidden');
    }
})
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


elements.button_next_step.addEventListener('click', (event) => {
    let isValid = IsFirstStepValid();
    if(!isValid){
        alert('WOrld')
        ShowErrors();
        return;
    }



    if (currentStepIndex === steps.length - 1) {
        alert('Last Step')
        return;
    }

    let completedSteps = steps.filter((item,index)=>index < currentStepIndex);
    let inProcessStep = steps.find((item,index)=>index === currentStepIndex);
    let nextSteps = steps.filter((item,index)=>index > currentStepIndex);

    completedSteps.forEach(element=>{
       element.progressBar.classList.add('completed');
       element.element.classList.add('hidden');
    });
    inProcessStep.progressBar.classList.add('in-process');
    inProcessStep.element.classList.remove('hidden');

    nextSteps.forEach(el=>{
        el.element.classList.add('hidden');
        el.progressBar.classList.remove('in-process');
        el.progressBar.classList.remove('completed');
    })
    nextSteps.forEach(el=>{
        el.element.classList.add('hidden');
        el.progressBar.classList.remove('in-process');
        el.progressBar.classList.remove('completed');
    })

    currentStepIndex++;
})

// #endregion