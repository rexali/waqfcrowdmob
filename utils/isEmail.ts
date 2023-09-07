
const isEmail = (value: string) => {
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

export {
    isEmail
}