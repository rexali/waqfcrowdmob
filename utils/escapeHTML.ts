import { escape } from 'html-escaper';

const escapeHTML = (value: string): string => {
    const safeValue = escape(value);
  
    return safeValue;
  };

  export{
    escapeHTML
  }