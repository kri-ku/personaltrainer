import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Calendarview() {

    const localizer = momentLocalizer(moment)
    const [trainings, setTrainings] = useState([]);
    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.log("ERRORERROR: !!!:" + error))
    }

    const events = trainings.map(event => ({

            allDay:false,
            end: moment(new Date(event.date)).add(event.duration,'m').toDate(),
            start: new Date(event.date),
            title: event.activity + ":" + event.customer.lastname + ", " + event.customer.firstname

    }));


    return (
        <div style={{ height: 600 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                defaultView={'month'}
                views={['day', 'week','month']}
            ></Calendar>
        </div>
    )
}