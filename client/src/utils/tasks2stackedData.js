// labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       backgroundColor: 'rgb(255, 99, 132)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       backgroundColor: 'rgb(75, 192, 192)',
//     },
//     {
//       label: 'Dataset 3',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       backgroundColor: 'rgb(53, 162, 235)',
//     },
//   ],


export const tasks2stackedData = (weeklyTasks) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    const labels = []

    const breakMap = []
    const meetingMap = []
    const workMap = []

    if (weeklyTasks === undefined) return null

    var date, dayIndex, d, tasks, timeBreak, timeMeeting, timeWork, allTimes;

    for (let i = 0; i < weeklyTasks.length; i++) {
        date = weeklyTasks[i].date
        d = new Date(date)
        dayIndex = d.getDay()
        labels.push(days[dayIndex])

        tasks = weeklyTasks[i].tasks
        allTimes = fn(tasks)
        timeBreak = allTimes.break
        timeMeeting = allTimes.meeting
        timeWork = allTimes.work

        breakMap.push(timeBreak)
        meetingMap.push(timeMeeting)
        workMap.push(timeWork)
    }


    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Break',
                data: breakMap,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Meeting',
                data: meetingMap,
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Work',
                data: workMap,
                backgroundColor: 'rgb(53, 162, 235)',
            },
        ]
    }

    return data;
}

const fn = (tasks) => {
    var timeBreak, timeMeeting, timeWork;
    timeBreak = timeMeeting = timeWork = 0;
    tasks.forEach(t => {
        if (t.type === 'break') {
            timeBreak = timeBreak + t.timetaken
        }
        else if (t.type === 'meeting') {
            timeMeeting = timeMeeting + t.timetaken
        }
        else if (t.type === 'work') {
            timeWork = timeWork + t.timetaken
        }
    });

    return {'break': timeBreak, 'meeting': timeMeeting, 'work': timeWork}
}