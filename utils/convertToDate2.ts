function converToDate2(arg:string) {
    let result = arg.split("T")[0].split("-").reverse();
    let result2 = result[0] + "-" + result[1] + "-" + result[2];
    return result2
}

export{
    converToDate2
}