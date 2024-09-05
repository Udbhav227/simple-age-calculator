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

function adjustButtonPosition() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustButtonPosition);

adjustButtonPosition();