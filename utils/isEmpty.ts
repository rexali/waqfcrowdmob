const isEmpty = (value: string) => {
    
    if (value.trim() === "") {
  
      return true;
    }
  
    return false;
  };
  
  export{
    isEmpty
  }