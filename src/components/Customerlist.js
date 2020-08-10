import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button } from '@material-ui/core';
import AddCustomer from './AddCustomer';
import EditCustomer from "./EditCustomer";
//import moment from 'moment';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//import { Link } from 'react-router-dom';
//import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import Listcustomerstrainings from './Listcustomerstrainings';
import Popup from "reactjs-popup";
import AddTraining2 from './AddTraining2';



export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [link, setLink] = React.useState('');
    //???????
    //const [customer, setCustomer] = React.useState({ firstname: '', lastname: 'koira' })


    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))

    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const deleteCustomer = () => {
        fetch(link, { method: 'DELETE' })
            .then(res => fetchData())
            .catch(err => console.error(err))
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const makeLink = (value) => {
        setLink(value)
        //tässä vähä häikkää
       /* fetch(link)
            .then(response => response.json())
            .then(data => setCustomer(data.content))
        console.log(customer)*/
        handleClickOpen()
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))

    }



    const saveTraining = (training) => {

        //let stringdate = "2020-12-12T09:12:00.000+02:00"
        
        //var raw = JSON.stringify({"date":"2020-12-12T07:00:00.000Z","activity":"kissa","duration":"50","customer":"https://localhost:8080/api/customers/2"});
        let data = JSON.stringify({"date:":`${training.datestamp}`,"activity": `${training.activity}`, "duration": `${training.duration}`, "customer": `${training.customer}` });
         //
         //"date": "2020-12-12T09:12:00.000+02:00"
      
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: data,

            redirect: 'follow'
        };

        fetch("https://customerrest.herokuapp.com/api/trainings", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }


    const columns = [
        {
            Header: "Lastname",
            accessor: 'lastname',
        },
        {
            Header: "Firstname",
            accessor: 'firstname',
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        
        {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },

        {
            sortable: false,
            filterable: false,
            widht: 50,
            accessor: 'links[2].href',

            Cell: row =>

                <Popup modal trigger={<Button variant="outlined" color="primary">Trainings</Button>}>
                    {close => (
                        <div>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <h3>{row.original.firstname} {row.original.lastname}'s trainings:</h3>
                            <Listcustomerstrainings trainings={row.value} />
                        </div>
                    )}

                </Popup>
        },
        {
            sortable: false,
            filterable: false,
            accessor: 'links[0].href',
            Cell: row => <AddTraining2 customer={row.value} saveTraining={saveTraining}></AddTraining2>

        },
        {
            sortable: false,
            filterable: false,
            widht: 50,
            Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original}></EditCustomer>

        },
        {
            sortable: false,
            filterable: false,
            widht: 20,
            accessor: 'links[0].href',
            Cell: row => <Button size="small" color="secondary" onClick={() => makeLink(row.value)}><DeleteForeverIcon /></Button>
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
                <DialogTitle id="alert-dialog-title">"Are you sure you want to delete this client?"</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        After this, all information will be lost.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Return</Button>
                    <Button onClick={deleteCustomer} color="primary" autoFocus> Delete</Button>
                </DialogActions>
            </Dialog>


            <AddCustomer saveCustomer={saveCustomer} />
            <h1>Customers:</h1>
            <ReactTable filterable={true} data={customers} columns={columns}></ReactTable>


        </div>
    )
}
