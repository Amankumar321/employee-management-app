export const verifyUsername = (query, showError) => {
    if (query.match(/^.{2,32}$/)) {
        if (query.match(/^[a-zA-Z]{1,16}\s{0,1}[a-zA-Z]{1,16}$/)) {
            return true
        }
        else {
            displayError('NameError', showError)
            return false
        }
    }
    else {
        displayError('NameLengthError', showError)
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

export const verifyPhoneNumber = (query, showError) => {
    if (query.match(/^.{10}$/)) {
        if (query.match(/^[0-9]{10}$/)) {
            return true
        }
        else {
            displayError('PhoneNumberError', showError)
            return false
        }
    }
    else {
        displayError('PhoneNumberLengthError', showError)
    }
}

export const verifyJoiningDate = (query, showError) => {
    const d = new Date()
    const time_now = d.getTime()
    const x = new Date(query)
    const time_creation = x.getTime()

    if (time_creation > time_now) {
        displayError('FutureDateError', showError)
        return false
    }
    return true
}

const displayError = (msg, showError) => {
    showError(errorList[msg])
}

const errorList = {
    'UnknownError': 'Some unknown error occured',
    'NameError': 'Name can contain only alphabets and single space',
    'NameLengthError': 'Name must be between 2-32 characters',
    'UserPasswordError': 'Password can contain only alphabets and numbers',
    'UserPasswordLengthError': 'Password must be between 3-22 characters',
    'NameExistError': 'Name already exists',
    'NoUsernameError': 'Username does not exist',
    'IncorrectPasswordError': 'Incorrect password',
    'PhoneNumberLengthError': 'Phone number must be 10 digit',
    'PhoneNumberError': 'Phone number must be 10 digits',
    'FutureDateError': 'Joining date must be today or past'
}