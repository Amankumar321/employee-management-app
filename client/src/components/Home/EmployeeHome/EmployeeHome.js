import React, {useState} from 'react'
import logout from '../../../utils/logout'
import AddTask from '../../AddTask/AddTask'
import './style.css'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { tasks2pieData } from '../../../utils/tasks2pieData';
import { getMyTasks, getMyTasksByDate, getCurrentProfile } from '../../../api'
import { tasks2stackedData } from '../../../utils/tasks2stackedData';
import EditProfile from '../../EditProfile/EditProfile'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const EmployeeHome = () => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [piedata1, setPiedata1] = useState(null)
    const [piedata2, setPiedata2] = useState(null)
    const [piedata3, setPiedata3] = useState(null)
    const [stackdata, setStackdata] = useState(null)
    const [tasksDate, setTasksDate] = useState('')
    const [tasks, setTasks] = useState([])
    const [currProfile, setCurrProfile] = useState(null)

    const optionsPie1 = {
        plugins: {
          title: {display: true, text: 'Today'},
        },
    }
  
    const optionsPie2 = {
        plugins: {
          title: {display: true, text: 'Yesterday'},
        },
    }

    const optionsPie3 = {
        plugins: {
          title: {display: true, text: tasksDate},
        },
    }
  
    const optionsStack = {
        plugins: {
          title: {display: true, text: 'Weekly'},
        },
    }

    const filterTasks = () => {
        const date = document.getElementById('task-date-employee').value
        setTasksDate(date)
        if (!date) return
        getMyTasksByDate(date).then(data => {
          setPiedata3(tasks2pieData(data.tasks))
          setTasks(data.tasks)
        })
    }

    const hideGraph = () => {
        document.getElementById('task-graph-wrap').classList.add('invisible-employee-mobile')
        document.getElementById('task-list-wrap').classList.remove('invisible-employee-mobile')
        setPiedata3(null)
        setTasksDate('')
        setTasks([])
    }

    const showAddTask = () => {
        document.getElementById('add-task-main').classList.remove('invisible-add-task')
    }

    const getTaskFilter = () => {
        document.getElementById('task-list-wrap').classList.add('invisible-employee-mobile')
        document.getElementById('task-graph-wrap').classList.remove('invisible-employee-mobile')
    }

    if (firstLoad === true) {
        setFirstLoad(false)
        getMyTasks().then(data => {
            setPiedata1(tasks2pieData(data.todayTasks))
            setPiedata2(tasks2pieData(data.yesterdayTasks))
            setStackdata(tasks2stackedData(data.weeklyTasks))
        })
    }

    const showEditProfile = () => {
        getCurrentProfile().then((p) => {
            setCurrProfile(p)
            document.getElementById('edit-profile-main').classList.remove('invisible-edit-profile')
        })
    }

    const showOptions = () => {
        const ele = document.getElementById('option-box-employee')
        const oldvalue = ele.style.display
        if (oldvalue === 'flex') {
          ele.style.display = 'none'
        }
        else {
          ele.style.display = 'flex'
        }
      }
  
    
    return (
        <div className='main-employee'>
            <AddTask refresh={setFirstLoad}></AddTask>
            <EditProfile currProfile={currProfile}></EditProfile>
          <div className='topbar-employee'>
            <div className='dashboard-heading'>Dashboard</div>
            <div className='header-button-wrap'>
                <button className='edit-profile-btn' onClick={showEditProfile}>Edit Profile</button>
                <button className='logout-btn' onClick={logout}>Logout</button>
                <button className='header-option-btn' onClick={showOptions}>
                    <i className='fa fa-bars'/>
                    <div className='option-box-employee' id='option-box-employee'>
                        <div className='option-tile-employee' onClick={showEditProfile}>
                            Edit profile
                        </div>
                        <div className='option-tile-employee' onClick={logout}>
                            Logout
                        </div>
                    </div>
                </button>
            </div>
          </div>
          <div className='task-wrap'>
            <div className='task-list-wrap' id='task-list-wrap'>
              <div className='task-list-top'>
                <div className='sub-heading-wrap'>
                  <div className='sub-heading'>Tasks</div>
                </div>
                <div className='button-wrap'>
                  <button className='add-task-btn' onClick={showAddTask}>Add task</button>
                </div>
              </div>
              <div className='employee-task-content'>
                <div className='filter-date-wrap-employee'>
                    <button className='filter-date-btn-employee' onClick={getTaskFilter}>Filter By Date</button>
                </div>
                {
                  piedata1 !== null ? <Pie data={piedata1} className="pie-chart-admin" options={optionsPie1}></Pie> : null
                }
                {
                  piedata2 !== null ? <Pie data={piedata2} className="pie-chart-admin" options={optionsPie2}></Pie> : null
                }
                {
                  stackdata !== null ? <Bar data={stackdata} className="stack-chart-admin" options={optionsStack}></Bar> : null
                }
              </div>
            </div>
            <div className='task-graph-wrap invisible-employee-mobile' id='task-graph-wrap'>
              <div className='task-graph-top'>
                <div onClick={hideGraph} className='hide-graph-employee'>&#x00d7;</div>
                <div className='sub-heading-wrap'>
                  <div className='sub-heading'>By Date</div>
                </div>
                <div className='set-date-wrap-employee'>
                        <input type='date' className='task-date-employee' id='task-date-employee'></input>
                        <button className='apply-filter-btn-employee' onClick={filterTasks}>
                            <i className='task-filter-icon-employee fa'>&#xf021;</i>
                        </button>
                </div>
              </div>
              <div className='employee-graph-content'>
                {
                    piedata3 !== null ? <div>
                    <Pie data={piedata3} className="pie-chart-admin" options={optionsPie3}></Pie>
                    <div className='task-tile-wrap'>
                    {
                      tasks.map((t) => {
                        var d = new Date(t.starttime)
                        const starttime = d.toLocaleString()
                        return (
                            <div className='task-tile' key={t._id}>
                                <div className='task-info-tag-wrap'>
                                  <div className='task-info-tag task-info-main'>Type</div>
                                  <div className='task-info-tag'>Start Time</div>
                                  <div className='task-info-tag'>Time Taken</div>
                                  <div className='task-info-tag'>Description</div>
                                </div>
                                <div className='task-info-value-wrap'>
                                  <div className='task-info-value task-info-main'>{t.type}</div>
                                  <div className='task-info-value'>{starttime}</div>
                                  <div className='task-info-value'>{t.timetaken}</div>
                                  <div className='task-info-value'>{t.description}</div>
                                </div>
                            </div>
                        )
                      })
                    }
                    </div>
                  </div> : (tasksDate !== '' ? <div className='no-data-employee'>No data<br/>{tasksDate}</div> : null)
                }
              </div>
            </div>
          </div>
        </div>
    );
}

export default EmployeeHome