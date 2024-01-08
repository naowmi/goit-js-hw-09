
const FORM_DATA_STORAGE = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formInfo = JSON.parse(localStorage.getItem(FORM_DATA_STORAGE));

try {
  if (formInfo) {
    Array.from(form.elements).forEach(element => {
      const formValue = formInfo[element.name];
      if (formValue !== undefined) {
        element.value = formValue.trim();
      }
    });
  }
} catch (e) {
  console.error('Problems with data retrieval!');
}
const formObj = {};
form.addEventListener('input', (() => {
  Array.from(form.elements).forEach(element => {
    if (element.type !== "submit") {
      formObj[element.name] = element.value.trim();
    }
  });
  localStorage.setItem(FORM_DATA_STORAGE, JSON.stringify(formObj));
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let fieldsFilled = true;
  Array.from(form.elements).forEach(element => {
    if ((element.name === 'email' || element.name === 'message') && element.value.trim() === '') {
        fieldsFilled = false;     
    }
  });

  if (!fieldsFilled) {
    alert('Be sure to fill in all the fields');
  } else {
    console.log(formObj);
    localStorage.removeItem(FORM_DATA_STORAGE);
    form.reset();
    
  }
});

