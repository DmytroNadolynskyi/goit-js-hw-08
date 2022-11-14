import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

initForm();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 666));


function onFormInput(e) {
  let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
  persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
  persistedFilters[e.target.name] = e.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedFilters));
    
}

function initForm() {
  let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
  if (persistedFilters) {
    persistedFilters = JSON.parse(persistedFilters);
    Object.entries(persistedFilters).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}

function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formEl);
    formData.forEach((value, name) => console.log(value, name));
    e.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
}


