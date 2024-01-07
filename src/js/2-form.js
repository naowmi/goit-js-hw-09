
const FORM_DATA_STORAGE = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formInfo = JSON.parse(localStorage.getItem(FORM_DATA_STORAGE));

try {
  if (formInfo) {
    Array.from(form.elements).forEach(element => {
      const formValue = formInfo[element.name];
      if (formValue !== undefined) {
        element.value = formValue;
      }
    });
  }
} catch (e) {
  console.error('Parse form error!');
}

form.addEventListener('input', (() => {
  const formData = new FormData(form);
  const formObj = {};
  formData.forEach((value, key) => {
    formObj[key] = value;
  });
  localStorage.setItem(FORM_DATA_STORAGE, JSON.stringify(formObj));
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let fieldsFilled = true;
  Array.from(form.elements).forEach(element => {
    if ((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') && element.value.trim() === '') {
        fieldsFilled = false;     
    }
  });

  if (!fieldsFilled) {
    alert('Not all fields are filled in');
  } else {
    console.log(localStorage.getItem(FORM_DATA_STORAGE));
    localStorage.removeItem(FORM_DATA_STORAGE);
    form.reset();
    
  }
});

