document.querySelectorAll('input[type="number"]').forEach((input, index, inputs) => {
  input.addEventListener('input', function () {
    const value = parseInt(this.value);
    const min = parseInt(this.min);
    const max = parseInt(this.max);
    const maxLength = this.max.length; // Calculate max length for auto-move

    if (value < min || value > max) {
      this.style.border = '3px solid red';
      this.style.outline = '4px solid rgba(255, 0, 0, 0.3)'; // Hard low-opacity red outline
    } else {
      this.style.border = '3px solid black';
      this.style.outline = 'none';
    }

    if (this.value.length === maxLength && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });
});
