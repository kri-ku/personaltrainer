import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import { Button } from '@material-ui/core';
import AddTraining from "./AddTraining";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditTraining from './EditTraining';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

moment().format();


export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [link, setLink] = React.useState('');

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data.content))

    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const deleteTraining = () => {
        fetch(link, { method: 'DELETE' })
            .then(res => fetchData())
            .catch(err => console.error(err))
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const makeDeleteLink = (value) => {
        setLink(value)
        handleClickOpen()

    }


    const updateTraining = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))

    }


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
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditTraining updateTraining={updateTraining} training={row.original}></EditTraining>

        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button size="small" color="secondary" onClick={() => makeDeleteLink(row.value)}><DeleteForeverIcon /></Button>

        }
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


            <AddTraining saveTraining={saveTraining}></AddTraining>
            <h1>Trainings:</h1>
            <ReactTable filterable={true} data={trainings} columns={columns}></ReactTable>
        </div>
    )
}