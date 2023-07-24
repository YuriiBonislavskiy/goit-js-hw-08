import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-msg';

const form = document.querySelector('.feedback-form');
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(formInputOn, 500));

// Знаходжу елементи форми
const formData = new FormData(form);

// Заповнюю масив елементів даних форми
const formSaveData = {};
const refs = {};
formData.forEach((value, name) => {
  refs[name] = form.querySelector(`.feedback-form [name="${name}"]`);
  formSaveData[name] = refs[name].value;
});

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formSaveData);
  for (let key in formSaveData) {
    formSaveData[key] = '';
  }
}

// Створюю об'єкт для запам'ятовування даних форми

// Заповнення даних форми із локального сховища
populateForm();

function populateForm() {
  const savedMessageOnString = localStorage.getItem(STORAGE_KEY);

  if (savedMessageOnString) {
    const savedMessageOnObject = JSON.parse(savedMessageOnString);
    for (let key in refs) {
      // Перевіряю на відповідність методу "input" та наявність відповідного даного у сховищі
      const componentType = refs[key].tagName.toLowerCase();

      if (
        (componentType === 'input' || componentType === 'textarea') &&
        savedMessageOnObject[key] !== undefined
      ) {
        refs[key].value = savedMessageOnObject[key];
        formSaveData[key] = savedMessageOnObject[key];
      }
    }
    // console.log(savedMessageOnObject);
  }
}

function formInputOn(evt) {
  formSaveData[evt.target.name] = evt.target.value;
  const Message = JSON.stringify(formSaveData);
  localStorage.setItem(STORAGE_KEY, Message);
}
