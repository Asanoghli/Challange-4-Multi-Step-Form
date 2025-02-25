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
    let data = {name : elements.details.name.value, email : elements.details.email.value, phone : elements.details.phone.value, location : elements.details.location.value};
    let isValid =  Boolean(data.name.length && data.email.length && data.location.length && data.phone.length);

    return {isValid,data};
}
const ShowErrors = function (showErrors){
    if(!showErrors){
        Array.from(document.getElementsByClassName('error-message')).forEach((el) => {
            el.classList.remove('hidden');
        })
        return;
    }

    let allKeys = Object.keys(multiStepInfo);
    for(let i = 0; i < allKeys.length; i++){
        let errorInputElementSpan = document.querySelector(`.${allKeys[i]}-error`);

        if(multiStepInfo[allKeys[i]].length){ // if value is NOT -  NULL or NAN or Undefined or ''
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
    let response = IsFirstStepValid();
    Object.assign(multiStepInfo,response.data);

    if(response.isValid){
        console.log(multiStepInfo);
        ShowErrors(false);
    }
    else{
        ShowErrors(true);
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
