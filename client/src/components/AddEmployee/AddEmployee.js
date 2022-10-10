import React, {useState} from 'react';
import { sendAddEmployee } from '../../api';
import { verifyPhoneNumber, verifyUsername, verifyUserPassword, verifyJoiningDate } from '../../utils/verifyAddEmployee'
import { getAllEmployees } from '../../api';
import './style.css'


const AddEmployee = ({setEmployees}) => {
    const form = {};
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        form.name = formProps.name
        form.password = formProps.password
        form.email = formProps.email
        form.contactnumber = formProps.contactnumber
        form.joiningdate = formProps.joiningdate
        form.department = formProps.department

        if (!verifyUsername(form.name, showError)) return
        if (!verifyUserPassword(form.password, showError)) return
        if (!verifyPhoneNumber(form.contactnumber, showError)) return
        if (!verifyJoiningDate(form.joiningdate, showError)) return
        sendAddEmployee(form).then((res) => {
            if (res !== undefined) {
                showError(res)
            }
            else {
                getAllEmployees().then((emps) => { setEmployees(emps) })
                document.getElementById('error-msg-box').classList.add('invisible-add-employee')
                document.getElementById('add-emp-form').reset()
            }
        })
    }

    const closeForm = () => {
        document.getElementById('add-employee-main').classList.add('invisible-add-employee')
    }

    const showError = (msg) => {
        setErrorMsg(msg)
        document.getElementById('error-msg-box').classList.remove('invisible-add-employee')
        setTimeout(() => {
            document.getElementById('error-msg-box').classList.add('invisible-add-employee')
        }, 3000);
    }

    return (
        <div id='add-employee-main' className='invisible-add-employee'>
            <div id='add-employee-cover'></div>
            <div className="paper-addemp">
              <div onClick={closeForm} className='close-form-add-employee'>&#x00d7;</div>
                <form onSubmit = {handleSubmit} className="form" id='add-emp-form'>
                    <label className="label">Name</label>
                    <input className="input" required={true} name = "name" label = "Name"/>
                    <label className="label">Email</label>
                    <input className="input" required={true} name = "email" type="email" label = "Email"/>
                    <label className="label">Contact Number</label>
                    <input className="input" required={true} name = "contactnumber" label = "Contact Number"/>
                    <label className="label">Department</label>
                    <input className="input" required={true} name = "department" label = "Department"/>
                    <label className="label">Joining Date</label>
                    <input className="input date-input" required={true} type="date" name = "joiningdate" label = "Joining Date"/>
                    <label className="label">Password</label>
                    <input className="input" required={true} name = "password" label = "Password" type='password'/>
                    <div id='error-msg-box'>
                            <p id='error-msg'>
                                { errorMsg }
                            </p>
                    </div>
                    <button className="button-submit" type = "submit">
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee