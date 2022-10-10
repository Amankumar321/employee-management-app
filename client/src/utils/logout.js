
const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usertype')
    window.location.reload()
}

export default logout