const isEmployee = () => {
    const usertype = localStorage.getItem('usertype')
    if (usertype === 'employee') {
        return true
    }
    else {
        return false
    }
}

export default isEmployee