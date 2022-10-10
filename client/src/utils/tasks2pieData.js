export const tasks2pieData = (tasks) => {
    var timeBreak = 0, timeMeeting = 0, timeWork = 0;

    if (tasks === undefined) return null

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

    if (timeBreak + timeMeeting + timeWork === 0) return null

    const data = {
        labels: ['Break', 'Meeting', 'Work'],
        datasets: [
        {
            label: 'Tasks',
            data: [timeBreak, timeMeeting, timeWork],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }]
    }

    return data;
}