import React, {useState} from 'react';
import { sendAddTask } from '../../api';
import './style.css'


const AddTask = ({refresh}) => {
    const form = {};
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        
        form.type = formProps.type
        form.starttime = formProps.starttime
        form.timetaken = formProps.timetaken
        form.description = formProps.description

        sendAddTask(form).then((res) => {
            if (res !== undefined) {
                showError(res)
            }
            else {
                document.getElementById('add-task-form').reset()
                refresh(true)
                document.getElementById('error-msg-box').classList.add('invisible-add-task')
            }
        })
    }

    const closeForm = () => {
        document.getElementById('add-task-main').classList.add('invisible-add-task')
    }

    const showError = (msg) => {
        setErrorMsg(msg)
        document.getElementById('error-msg-box').classList.remove('invisible-add-task')
        setTimeout(() => {
            document.getElementById('error-msg-box').classList.add('invisible-add-task')
        }, 3000);
    }

    return (
        <div id='add-task-main' className='invisible-add-task'>
            <div id='add-task-cover'></div>
            <div className="paper-add-task">
              <div onClick={closeForm} className='close-form-add-task'>&#x00d7;</div>
                <form onSubmit = {handleSubmit} className="form" id='add-task-form'>
                    <label className="label">Task Type</label>
                    <select className="input" id="task-type" required={true} name = "type">
                        <option value="break">Break</option>
                        <option value="meeting">Meeting</option>
                        <option value="work">Work</option>
                    </select>
                    <label className="label">Start Time</label>
                    <input className="input" required={true} name = "starttime" id="add-task-date" type="datetime-local" label = "Start Time"/>
                    <label className="label">Time Taken</label>
                    <input className="input" required={true} name = "timetaken" type="number" label = "Time Taken"/>
                    <label className="label">Task Description</label>
                    <input className="input add-task-description" type="text" required={true} name = "description" label = "Description"/>
                    <div id='error-msg-box'>
                            <p id='error-msg'>
                                { errorMsg }
                            </p>
                    </div>
                    <button className="button-submit" type = "submit">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTask