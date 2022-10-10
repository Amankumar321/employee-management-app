import React, { useState } from 'react'
import { getAllEmployees, getEmployeeTask, getTasksByDate, sendDeactivateEmployee } from '../../../api';
import logout from '../../../utils/logout';
import AddEmployee from '../../AddEmployee/AddEmployee';
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { tasks2pieData } from '../../../utils/tasks2pieData';
import './style.css'
import { tasks2stackedData } from '../../../utils/tasks2stackedData';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const AdminHome = () => {
    const [piedata1, setPiedata1] = useState(null)
    const [piedata2, setPiedata2] = useState(null)
    const [piedata3, setPiedata3] = useState(null)
    const [stackdata, setStackdata] = useState(null)
    const [selected, setSelected] = useState(null)
    const [tasksDate, setTasksDate] = useState('')

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
    

    const [employees, setEmployees] = useState([])
    const [tasks, setTasks] = useState([])
    const [firstLoad, setFirstLoad] = useState(true)
  
    const hideTask = () => {
        document.getElementById('employee-task-wrap').classList.add('invisible-admin-mobile')
        document.getElementById('employee-list-wrap').classList.remove('invisible-admin-mobile')
        setPiedata1(null)
        setPiedata2(null)
        setStackdata(null)
        setSelected(null)
        setTasksDate('')
        setTasks([])
    }

    const deactivateEmployee = () => {
      if (selected) {
        sendDeactivateEmployee(selected)
      }
    }

    const showAddEmployee = () => {
      document.getElementById('add-employee-main').classList.remove('invisible-add-employee')
    }

    if (firstLoad === true) {
      getAllEmployees().then((emps) => { setEmployees(emps) })
      setFirstLoad(false)
    }

    const filterTasks = () => {
      const date = document.getElementById('task-date-admin').value
      if (!date) return
      setTasksDate(date)
      getTasksByDate(selected, date).then(data => {
        setPiedata1(null)
        setPiedata2(null)
        setStackdata(null)
        setPiedata3(tasks2pieData(data.tasks))
        setTasks(data.tasks)
      })
    }

    const getEmpTask = (user) => {
      document.getElementById('employee-list-wrap').classList.add('invisible-admin-mobile')
      document.getElementById('employee-task-wrap').classList.remove('invisible-admin-mobile')
      setSelected(user)
      setPiedata3(null)
      setTasksDate('')
      setTasks([])

      getEmployeeTask(user).then(data => {
        setPiedata1(tasks2pieData(data.todayTasks))
        setPiedata2(tasks2pieData(data.yesterdayTasks))
        setStackdata(tasks2stackedData(data.weeklyTasks))
      })
    }

    const showOptions = () => {
      const ele = document.getElementById('option-box-admin')
      const oldvalue = ele.style.display
      if (oldvalue === 'flex') {
        ele.style.display = 'none'
      }
      else {
        ele.style.display = 'flex'
      }
    }


    return (
        <div className='main-admin'>
          <AddEmployee setEmployees={setEmployees}></AddEmployee>
          <div className='topbar-admin'>
            <div className='dashboard-heading'>Dashboard</div>
            <div className='header-button-wrap'>
                <button className='logout-btn' onClick={logout}>Logout</button>
                <button className='header-option-btn' onClick={showOptions}>
                    <i className='fa fa-bars'/>
                    <div className='option-box-admin' id='option-box-admin'>
                        <div className='option-tile-admin' onClick={logout}>
                            Logout
                        </div>
                    </div>
                </button>
            </div>
          </div>
          <div className='employee-wrap'>
            <div className='employee-list-wrap' id='employee-list-wrap'>
              <div className='employee-list-top'>
                <div className='sub-heading-wrap'>
                  <div className='sub-heading'>Employees</div>
                </div>
                <div className='button-wrap'>
                  <button className='add-employee-btn' onClick={showAddEmployee}>Add Employee</button>
                </div>
              </div>
              <div className='employee-tile-wrap'>
                {
                  employees.map((e) => {
                    var d = new Date(e.joiningdate)
                    const datejoining = d.toLocaleDateString()
                    return (
                        <div className='employee-tile' key={e.username} onClick={() => {getEmpTask(e.username)}}>
                            <div className='employee-info-tag-wrap'>
                              <div className='employee-info-tag employee-info-main'>Name</div>
                              <div className='employee-info-tag'>Email</div>
                              <div className='employee-info-tag'>Contact Number</div>
                              <div className='employee-info-tag'>Department</div>
                              <div className='employee-info-tag'>Joining Date</div>
                              <div className='employee-info-tag'>Active</div>
                            </div>
                            <div className='employee-info-value-wrap'>
                              <div className='employee-info-value employee-info-main'>{e.username}</div>
                              <div className='employee-info-value'>{e.email}</div>
                              <div className='employee-info-value'>{e.contactnumber}</div>
                              <div className='employee-info-value'>{e.department}</div>
                              <div className='employee-info-value'>{datejoining}</div>
                              <div className='employee-info-value'>{e.active ? "Yes" : "No"}</div>
                            </div>
                        </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='employee-task-wrap invisible-admin-mobile' id='employee-task-wrap'>
              <div className='employee-task-top'>
                <div onClick={hideTask} className='hide-task-admin'>&#x00d7;</div>
                <div className='sub-heading-wrap'>
                  <div className='sub-heading'>Tasks</div>
                </div>
                <div className='set-date-wrap-admin'>
                  <input type='date' className='task-date-admin' id='task-date-admin'></input>
                    <button className='apply-filter-btn-admin' onClick={filterTasks}>
                      <i className='task-filter-icon-admin fa'>&#xf021;</i>
                    </button>
                </div>
              </div>
              <div className='employee-task-content'>
                {
                  selected !== null ?
                  <div className='employee-tile'>
                    <div className='employee-info-tag-wrap'>
                      <div className='employee-info-tag employee-info-main equal-padding'>Name</div>
                    </div>
                    <div className='employee-info-value-wrap'>
                      <div className='employee-info-value employee-info-main equal-padding'>{selected}</div>
                    </div>
                    <button className='deactivate-btn-admin' onClick={deactivateEmployee}>Deactivate</button>
                  </div> : null
                }
                {
                  piedata1 !== null ? <Pie data={piedata1} className="pie-chart-admin" options={optionsPie1}></Pie> : null
                }
                {
                  piedata2 !== null ? <Pie data={piedata2} className="pie-chart-admin" options={optionsPie2}></Pie> : null
                }
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
                  </div> : (tasksDate !== '' ? <div className='no-data-admin'>No data<br/>{tasksDate}</div> : null)
                }
                {
                  stackdata !== null ? <Bar data={stackdata} className="stack-chart-admin" options={optionsStack}></Bar> : null
                }
              </div>
            </div>
          </div>
        </div>
    );
}

export default AdminHome