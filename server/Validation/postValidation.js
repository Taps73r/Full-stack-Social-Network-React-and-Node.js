const validatePostText = (text) => {
  const trimmedText = text.trim();
  if (trimmedText.length > 500) {
    return {
      isValid: false,
      errorMessage: "Максимальна довжина тексту - 500 символів",
    };
  }
  return { isValid: true, errorMessage: null };
};

module.exports = validatePostText;
