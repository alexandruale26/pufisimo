const imageRandomName = () => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}`;
};

const removeDiacritics = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const capitalizeFirstChar = (string) => string.charAt(0).toUpperCase();

const wordToUppercase = (string, noDiacritics = false) => {
  const trimmedString = string.trim();
  const firstCharToUpper = capitalizeFirstChar(trimmedString);
  const fullString = firstCharToUpper.concat(trimmedString.slice(1));

  return noDiacritics ? removeDiacritics(fullString) : fullString;
};

const capitalizeEachWordFromString = (string) => {
  const words = string.toLowerCase().split(" ");
  const converted = words.map((word) => wordToUppercase(word));
  return converted.join(" ");
};

const formatDateToRoumanian = (date, hasDay = true) => {
  const dayMonthYearOptions = { year: "numeric", month: "long", day: "numeric" };
  const monthYearOptions = { year: "numeric", month: "long" };
  const options = hasDay ? dayMonthYearOptions : monthYearOptions;

  return new Intl.DateTimeFormat("ro-RO", options).format(date);
};

const formatPostDate = (timestamp) => {
  // REMINDER: for legal reasons about found objects, post should be available for 10 days !!!
  const postDate = new Date(timestamp);
  const today = new Date();

  const todayDay = today.getDate();
  const postDay = postDate.getDate();

  const hours = postDate.getHours();
  const minutes = postDate.getMinutes();

  const addZeroBefore = (number) => (number < 10 ? "0" + number : number);

  if (postDay === todayDay) {
    return `Azi la ${addZeroBefore(hours)}:${addZeroBefore(minutes)}`;
  } else if (postDay === todayDay - 1) {
    return `Ieri la ${addZeroBefore(hours)}:${addZeroBefore(minutes)}`;
  } else {
    return formatDateToRoumanian(postDate);
  }
};

const filterData = (data, search) => {
  return data.filter((value) => {
    const noDiacriticsSearch = removeDiacritics(value);
    const noDiacriticsTarget = removeDiacritics(search);
    return noDiacriticsSearch.toLowerCase().includes(noDiacriticsTarget.toLowerCase());
  });
};

const getFromLocalStorage = (name) => {
  return localStorage.getItem(name);
};

const saveToLocalStorage = (name, value) => {
  const prevValue = getFromLocalStorage(name);
  const stringifiedValue = typeof value === "string" ? value : value.toString();

  if (prevValue === stringifiedValue) return;
  localStorage.setItem(name, value);
};

const generateErrorMessage = (inputName, minLength, maxLength) => {
  const messageBase = `${inputName} trebuie sǎ conținǎ`;

  if (minLength) return `${messageBase} minim ${minLength}${minLength >= 20 ? " de" : ""} caractere.`;
  if (maxLength) return `${messageBase} maxim ${maxLength}${maxLength >= 20 ? " de" : ""} caractere.`;
};

const allowWindowScroll = (canScroll = true) => {
  if (canScroll) {
    document.body.style.overflow = "unset";
  } else {
    document.body.style.overflow = "hidden";
  }
};

export {
  removeDiacritics,
  capitalizeFirstChar,
  wordToUppercase,
  imageRandomName,
  formatPostDate,
  formatDateToRoumanian,
  filterData,
  saveToLocalStorage,
  getFromLocalStorage,
  generateErrorMessage,
  capitalizeEachWordFromString,
  allowWindowScroll,
};
