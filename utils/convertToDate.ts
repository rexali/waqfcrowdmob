function converToDate(arg: Date) {
    let result = arg.toLocaleDateString().split("/").reverse();
    let result2 = result[0] + "-" + result[1] + "-" + result[2];
    return result2
}

export{
    converToDate
}