function isLargeFile(size: any) {

    const requiredSize = 0.05 * 1024 * 1024;
    if (size > requiredSize) {

        return true
    }

    return;
}

export{
    isLargeFile
}