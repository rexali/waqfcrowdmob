const getFileType = (file: any) => {
    let namesParts = file?.name?.split('.');
    let fileType = namesParts[namesParts?.length - 1] ?? "";
    return fileType;
}

export {
    getFileType
}