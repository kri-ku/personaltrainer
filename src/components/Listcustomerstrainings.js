import React, { useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

export default function Listcustomerstrainings(props) {

    const [trainings, setTrainings] = React.useState([])

    const fetchCustomersTrainings = (link) => {
        fetch(link)
            .then(response => response.json())
            .then(data => setTrainings(data.content))
            .catch(err => console.error())
    }


    useEffect(() => fetchCustomersTrainings(props.trainings))

    const columns = [
        {
            Header: "Time",
            accessor: 'date',
            Cell: row => moment(row.value).format('lll')
        },
        {
            Header: "Activity",
            accessor: 'activity'
        },
        {
            Header: 'Duration (min)',
            accessor: 'duration'
        }
    ]


    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns}></ReactTable>
        </div>


    )
}
