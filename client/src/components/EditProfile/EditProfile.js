import React, {useState} from 'react';
import { verifyPhoneNumber, verifyUsername, verifyUserPassword } from '../../utils/verifyEditEmployee';
import { sendEditProfile } from '../../api'
import './style.css'


const EditProfile = ({currProfile}) => {
    const form = {};
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        form.name = formProps.name
        form.password = formProps.password
        form.contactnumber = formProps.contactnumber
        form.department = formProps.department

        if (!verifyUsername(form.name, showError)) return
        if (!verifyUserPassword(form.password, showError)) return
        if (!verifyPhoneNumber(form.contactnumber, showError)) return
        sendEditProfile(form).then((res) => {
            if (res !== undefined) {
                showError(res)
            }
            else {
                document.getElementById('edit-profile-form').reset()
                document.getElementById('error-msg-box-edit-profile').classList.add('invisible-edit-profile')
                closeEditProfile()
            }
        })
    }

    const closeEditProfile = () => {
        document.getElementById('edit-profile-main').classList.add('invisible-edit-profile')
    }

    const showError = (msg) => {
        setErrorMsg(msg)
        document.getElementById('error-msg-box-edit-profile').classList.remove('invisible-edit-profile')
        setTimeout(() => {
            document.getElementById('error-msg-box-edit-profile').classList.add('invisible-edit-profile')
        }, 3000);
    }

    if (currProfile !== null) {
        document.getElementById('edit-profile-input-name').value = currProfile.username
        document.getElementById('edit-profile-input-contact-number').value = currProfile.contactnumber
        document.getElementById('edit-profile-input-department').value = currProfile.department
    }

    return (
        <div id='edit-profile-main' className='invisible-edit-profile'>
            <div id='edit-profile-cover'></div>
            <div className="paper-editemp">
              <div onClick={closeEditProfile} className='close-form-edit-profile'>
              &#x00d7;
              </div>
                <form onSubmit = {handleSubmit} className="form" id='edit-profile-form'>
                    <label className="label">Name</label>
                    <input className="input" required={true} name = "name" label = "Name" id='edit-profile-input-name' />
                    <label className="label">Contact Number</label>
                    <input className="input" required={true} name = "contactnumber" label = "Contact Number" id='edit-profile-input-contact-number' />
                    <label className="label">Department</label>
                    <input className="input" required={true} name = "department" label = "Department" id='edit-profile-input-department' />
                    <label className="label">Password</label>
                    <input className="input" required={true} name = "password" label = "Password" type='password'/>
                    <div id='error-msg-box-edit-profile'>
                            <p id='error-msg'>
                                { errorMsg }
                            </p>
                    </div>
                    <button className="button-submit" type = "submit">
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile