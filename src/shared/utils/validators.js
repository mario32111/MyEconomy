
/**Estas funciones ayudan a validar:
 * - Correos electrónicos (isValidEmail)
 * - Contraseñas (isValidPassword)
 * - Números de teléfono (isValidPhone)
 * - Campos requeridos (isRequired)
 * - Valores numéricos (isNumber, isPositive)*/

// Validar correo electrónico
export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  // Validar contraseña (mínimo 8 caracteres, al menos una letra y un número)
  export const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };
  // Validar número de teléfono mexicano (10 dígitos)
  export const isValidPhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };
  // Validar que un campo no esté vacío
  export const isRequired = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    return true;
  };
  // Validar que un valor sea numérico
  export const isNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  // Validar que un número sea positivo
  export const isPositive = (value) => {
    return isNumber(value) && parseFloat(value) > 0;
  };
  // Validar que un valor esté dentro de un rango
  export const isInRange = (value, min, max) => {
    return isNumber(value) && parseFloat(value) >= min && parseFloat(value) <= max;
  };
  // Validar longitud mínima de texto
  export const minLength = (value, length) => {
    return value && value.length >= length;
  };
  // Validar longitud máxima de texto
  export const maxLength = (value, length) => {
    return value && value.length <= length;
  };
  // Validar que dos valores sean iguales (útil para confirmar contraseñas)
  export const isMatch = (value, compareValue) => {
    return value === compareValue;
  };
  // Validar formato de fecha (DD/MM/YYYY)
  export const isValidDate = (dateString) => {
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!regex.test(dateString)) return false;
    const [, day, month, year] = dateString.match(regex);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === parseInt(year, 10) &&
      date.getMonth() === parseInt(month, 10) - 1 &&
      date.getDate() === parseInt(day, 10)
    );
  };