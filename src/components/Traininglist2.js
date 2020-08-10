import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import { Button } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


moment().format();


export default function Traininglist2(props) {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [deleteID, setDeleteId] = React.useState('');

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.log("ERRORERROR: !!!:" + error))
    }


    const deleteTraining = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + deleteID,
            { method: 'DELETE' })
            .then(res => fetchData())
            .catch(err => console.error(err))
        handleClose()
    }

    const handleClickOpen = (props) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const makeDeleteId =(value) => {
        setDeleteId(value);
        handleClickOpen();
    }


    const columns = [
        {
            Header: "Activity",
            accessor: 'activity'
        },
        {
            Header: "Time",
            accessor: 'date',
            Cell: row => moment(row.value).format('lll')
        },

        {
            Header: 'Duration (min)',
            accessor: 'duration'
        },
        {
            Header: 'Customer lastname',
            accessor: 'customer.lastname', 
            Cell: row => <div>{row.value}</div>
            
        },
        {
            Header: 'Customer firstname',
            accessor: 'customer.firstname', 
            Cell: row => <div>{row.value}</div>      
        },
       
        {
            sortable: false,
            filterable: false,
            accessor: 'id',
            width: 100,
            Cell: row => <Button color="secondary" onClick={() => makeDeleteId(row.value)}><DeleteForeverIcon /></Button>


        },
    ]

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete this training?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        After this, all information will be lost.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Return</Button>
                    <Button onClick={deleteTraining} color="primary" autoFocus> Delete</Button>
                </DialogActions>
            </Dialog>

            <h1>Trainings:</h1>
            <ReactTable filterable={true} data={trainings} columns={columns}></ReactTable>
        </div>
    )
}
