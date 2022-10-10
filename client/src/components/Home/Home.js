import React from 'react'
import isAdmin from '../../utils/isAdmin';
import isEmployee from '../../utils/isEmployee';
import EmployeeHome from './EmployeeHome/EmployeeHome';
import AdminHome from './AdminHome/AdminHome';

const Home = () => {
    
    return (
        <div>
            {
                isAdmin() === true ? (<AdminHome/>) : (
                    isEmployee() === true ? (<EmployeeHome/>) : null
                )
            }
        </div>
    );
}

export default Home