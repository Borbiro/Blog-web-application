export function createBlogPost(newData) {
    var appendData = newData
    return appendData
}

export function changeBlogPost(newData, postNumber, jsonFile) {
    var updatedData = jsonFile
    updatedData[postNumber] = newData
    return updatedData
}

export function deleteBlogPost(postNumber, jsonFile) {
    var updatedData = jsonFile
    updatedData.splice(postNumber, 1)
    return updatedData
}