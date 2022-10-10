const isAdmin = () => {
    const usertype = localStorage.getItem('usertype')
    if (usertype === 'admin') {
        return true
    }
    else {
        return false
    }
}

export default isAdmin