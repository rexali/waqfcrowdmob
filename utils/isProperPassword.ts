
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

  export{
    isProperPassword
  }