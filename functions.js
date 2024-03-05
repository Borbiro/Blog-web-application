export function createBlogPost(newData, jsonFile) {
    var appendData = newData
    appendData["id"] = jsonFile.length + 1
    return appendData
}

export function changeBlogPost(newData, jsonFile) {
    
}