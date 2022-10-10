export const verifyUsername = (query, showError) => {
    if (query.match(/^.{3,22}$/)) {
        if (query.match(/^[0-9a-zA-Z]{3,22}$/)) {
            return true
        }
        else {
            displayError('UsernameError', showError)
            return false
        }
    }
    else {
        displayError('UsernameLengthError', showError)
        return false
    }
}
export const verifyUserPassword = (query, showError) => {
    if (query.match(/^.{3,22}$/)) {
        if (query.match(/^[0-9a-zA-Z]{3,22}$/)) {
            return true
        }
        else {
            displayError('UserPasswordError', showError)
            return false
        }
    }
    else {
        displayError('UserPasswordLengthError', showError)
    }
}

const displayError = (msg, showError) => {
    showError(errorList[msg])
}

const errorList = {
    'UnknownError': 'Some unknown error occured',
    'UsernameError': 'Username can contain only alphabets and numbers',
    'UsernameLengthError': 'Username must be between 3-22 characters',
    'UserPasswordError': 'Password can contain only alphabets and numbers',
    'UserPasswordLengthError': 'Password must be between 3-22 characters',
    'UsernameExistError': 'Username already exists',
    'NoUsernameError': 'Username does not exist',
    'IncorrectPasswordError': 'Incorrect password',
}