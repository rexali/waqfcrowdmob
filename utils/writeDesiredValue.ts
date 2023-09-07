
function writeDesiredValue(value: any) {
    if (value >= 1000) {
        const res = value?.toString().split("")[0];
        return res + "k"
    } else {
        if (value === 0) {
            return;
        }

        return value?.toString();
    }
}

export{
    writeDesiredValue
}