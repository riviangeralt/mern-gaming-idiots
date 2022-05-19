const uniqueMessage = error => {
    let output = '';
    if (error.keyValue.email) {
        output = 'Email Already exists'
    } else if (error.keyValue.id) {
        output = 'Game Already exists'
    } else if (error.keyValue.name) {
        output = 'name Already exists'
    }
    return output
}

exports.errorHandler = error => {
    let message = ''
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error)
                break

            default:
                message = "Something went wrong"
        }
    }
    return message
}