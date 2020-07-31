import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
moment().format();

export default function Traininglist(){

    const [trainings, setTrainings] = useState([]); 

    useEffect(()=> fetchData(),[])

    const fetchData =()=> {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))

    }
 

    const columns =[
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
        },
        {
            sortable: false,
            filterable: false,

        }
    ]

    return(
        <div>
            <h1>Trainings:</h1>
            <ReactTable filterable={true} data={trainings} columns={columns}></ReactTable>
            

        </div>
    )
}