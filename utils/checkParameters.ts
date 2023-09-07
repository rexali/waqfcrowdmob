import { escape } from 'html-escaper';

const isEmail = (email: string) => {
  if (email.search("@") > 0) {

    return true;
  }

  return false
};

const isEmpty = (value: string) => {
  if (value.trim() === "") {

    return true
  }

  return false
};


const escapeHTML = (value: string): string => {
  const safeValue = escape(value);

  return safeValue;
};

const isProperEmail = (value: string) => {
  try {
    const val: any = value.match(/.+@.+\..+/i);
    if (val[0] === value) {

      return true;
    } else {

      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

const atLeastEightCharacters = (value: string) => {
  if (value.length >= 8) {
    
    return true;
  }

  return false;
}

const isProperPassword = (value: string) => {
  try {
    const val: any = value.match(/([0-9]|[a-zA-Z]|[!?&@*]|[^<>])+/i);
    
    if (val[0] === value) {
      if ((/!/).test(value) || (/\?/).test(value) || (/&/).test(value) || (/@/).test(value) || (/\*/).test(value)) {
        return true;

      } else {

        return false;
      }
    } else {

      return false;
    }

  } catch (error) {
    console.log(error);
  }
}

export {
  isEmail,
  isEmpty,
  escapeHTML,
  atLeastEightCharacters,
  isProperEmail,
  isProperPassword
}