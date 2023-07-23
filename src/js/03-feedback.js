import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-msg';

const form = document.querySelector('.feedback-form');
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(formInputOn, 500));

// Знаходжу елементи форми
const formData = new FormData(form);

// Заповнюю масив елементів даних форми
const refs = {};
formData.forEach((value, name) => {
  refs[name] = form.querySelector(`.feedback-form [name="${name}"]`);
});
// console.log(refs);

function onFormSubmit(evt) {
  evt.preventDefault();
  //   console.log('Отправляем форму');
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// Створюю об'єкт для запам'ятовування даних форми
const formSaveData = {};

// Заповнення даних форми із локального сховища
populateForm();

function populateForm() {
  const savedMessageOnString = localStorage.getItem(STORAGE_KEY);

  if (savedMessageOnString) {
    const savedMessageOnObject = JSON.parse(savedMessageOnString);
    for (let key in refs) {
      // Перевіряю на відповідність методу "input" та наявність відповідного даного у сховищі
      if (
        (refs[key].nodeName = 'INPUT' || refs[key].nodeName === 'TEXTAREA') &&
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
  console.log(Message);
  localStorage.setItem(STORAGE_KEY, Message);
}
