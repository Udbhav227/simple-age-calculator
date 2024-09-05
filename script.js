document.querySelectorAll('input[type="number"]').forEach((input, index, inputs) => {
  function updateOutline() {
    const value = input.value;
    const min = parseInt(input.min);
    const max = parseInt(input.max);

    if (input === document.activeElement) {
      if (value === '') {
        input.style.outline = '4px solid rgba(128, 128, 128, 0.3)';
      }
      else if ((isNaN(value) || value < min || value > max)) {
        input.style.outline = '4px solid rgba(255, 0, 0, 0.3)'; // Red outline for empty or invalid input
      } else {
        input.style.outline = '4px solid rgba(128, 128, 128, 0.3)'; // Gray outline for valid input
      }
    } else {
      input.style.outline = 'none'; // No outline when not focused
    }

    if (value === '') {
      input.classList.remove('error');
    }
    else if (isNaN(value) || value < min || value > max) {
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  }

  input.addEventListener('input', function() {
    updateOutline();

    const maxLength = this.max.length;
    if (this.value.length === maxLength && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener('focus', function() {
    updateOutline();
  });

  input.addEventListener('blur', function() {
    updateOutline();
  });
});

document.querySelector('.calc-btn button').addEventListener('click', function() {
  const day = parseInt(document.querySelector('.day input').value);
  const month = parseInt(document.querySelector('.month input').value);
  const year = parseInt(document.querySelector('.year input').value);
  
  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    document.getElementById('first-line').textContent = 'Please enter a valid date.';
    return;
  }

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  document.getElementById('first-line').textContent = `${ageYears} years,`;
  document.getElementById('sec-line').textContent = `${ageMonths} months,`;
  document.getElementById('third-line').textContent = `and ${ageDays} days.`;
});


function adjustButtonPosition() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustButtonPosition);

adjustButtonPosition();