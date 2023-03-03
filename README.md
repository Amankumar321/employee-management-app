# Dashboard Company

Live demo - https://company-console.netlify.app

- provides a central management of employee and admins
- You can create admin accounts
- Employees can add task done by them (lunch/meeting/work)
- Admin can see all employees and visualise their current week task with bar chart
- Admin can visualise task done by employee on a particular date with pie chart
- Admin can create/deactivate an employee account
- Employee can update their account

# Tech stack

MERN (MongoDB, Expressjs, Reactjs, Nodejs)

# Screenshot

![alt text](https://github.com/Amankumar321/dashboard-company/blob/dbc4ef0db9e370355ba703d7674d9bfcd8662a51/Screenshot%202023-03-03%20at%2011.57.42%20PM.png?raw=true)

# Setup:
- run ```cd client``` then ```npm i && npm start``` for client
- run ```cd server``` then ```npm i && npm start``` for server

Internet Connection is required for database connection
1. Clone repo using ```git clone https://github.com/Amankumar321/dashboard-company```
2. Repo contains two folders (client and server)
3. Go to parent directory.
4. Command “cd client” to move to client folder then “npm install” to Install all dependencies.
5. “npm start” in client directory to run client side. (Default port 3000)
   
6. API calls to server will not work at this stage.
7. API link for server side is inside “client/src/api/index.js”. By default the link is “http:// localhost:5000”.
8. Go to parent directory.
9. Command “cd server” to move to server folder then “npm install” to Install all dependencies.
10. “npm start” in server directory to run server side. (Default port 5000)
11. Open “http://localhost:3000” in browser.
12. mongoDB url is inside “server/.env”.
Note: Internet connection while using app is required to load icons (font awesome).
