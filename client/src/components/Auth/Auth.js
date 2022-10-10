import React, {useState} from 'react';
import { sendSignIn, sendSignUp } from '../../api';
import { verifyUsername, verifyUserPassword } from '../../utils/verifyAuth'
import './style.css'

const Auth = () => {
    const form = {username: '', password: '', isadmin: true};
    const [isSignup, setIsSignUp] = useState(false)
    const [isAdmin, setIsAdmin] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')


    const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup)
    }

    const handleUserType = (e) => {
        if (e.target.name === 'admin' && isAdmin === false) {
            setIsAdmin(true)
            document.getElementById('admin-type-btn').classList.add('selected-type')
            document.getElementById('employee-type-btn').classList.remove('selected-type')
            document.getElementById('text').classList.remove('invisible-auth')
            document.getElementById('button-switch').classList.remove('invisible-auth')
        }
        else if (e.target.name === 'employee' && isAdmin === true) {
            setIsAdmin(false)
            setIsSignUp(false)
            document.getElementById('admin-type-btn').classList.remove('selected-type')
            document.getElementById('employee-type-btn').classList.add('selected-type')
            document.getElementById('text').classList.add('invisible-auth')
            document.getElementById('button-switch').classList.add('invisible-auth')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById('error-msg-box').classList.add('invisible')
        
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        form.username = formProps.username
        form.password = formProps.password
        form.isadmin = isAdmin

        if (isSignup) {
            if (!verifyUsername(form.username, showError)) return
            if (!verifyUserPassword(form.password, showError)) return
            sendSignUp(form).then((res) => {
                if (res !== undefined) {
                    setErrorMsg(res)
                    document.getElementById('error-msg-box').classList.remove('invisible-auth')
                    setTimeout(() => {
                        document.getElementById('error-msg-box').classList.add('invisible-auth')
                    }, 3000);
                }
                else {
                    document.getElementById('error-msg-box').classList.add('invisible-auth')
                }
            })
        } 
        else {
            sendSignIn(form).then((res) => {
                if (res !== undefined) {
                    setErrorMsg(res)
                    document.getElementById('error-msg-box').classList.remove('invisible-auth')
                    setTimeout(() => {
                        document.getElementById('error-msg-box').classList.add('invisible-auth')
                    }, 3000);
                }
            })
        }
    }

    const showError = (msg) => {
        setErrorMsg(msg)
        document.getElementById('error-msg-box').classList.remove('invisible-auth')
        setTimeout(() => {
            document.getElementById('error-msg-box').classList.add('invisible-auth')
        }, 3000);
    }

    return (
        <div id='login-page'>
            <div className="paper">
                <form onSubmit = {handleSubmit} className="form">
                    <div className='user-type-wrap'>
                        <button className='user-type-btn selected-type' onClick={handleUserType} name='admin' id='admin-type-btn' type="button">Admin</button>
                        <button className='user-type-btn' onClick={handleUserType} name='employee' id='employee-type-btn' type="button">Employee</button>
                    </div>
                    <label className="label">Username</label>
                    <input className="input" required={true} name = "username" label = "Username"/>
                    <label className="label">Password</label>
                    <input className="input" required={true} name = "password" label = "Password" type='password'/>
                    <div id='error-msg-box'>
                            <p id='error-msg'>
                                { errorMsg }
                            </p>
                    </div>
                    <button className="button-submit" type = "submit">
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </button>
                    <p className='text' id='text'>
                        { isSignup ? 'Already have an account?' : "Don't have an account?" }
                    </p>
                    <button onClick={switchMode} className="button-switch" type="button" id="button-switch">
                        { isSignup ? 'Sign in' : "Sign Up" }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Auth