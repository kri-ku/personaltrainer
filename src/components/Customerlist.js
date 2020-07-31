import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button } from '@material-ui/core';
import Showcustomer from './Showcustomer';

export default function Customerlist(){

    const [customers, setCustomers] = useState([]); 
    //const [trainings, setTrainings] = useState([]);
   const [customer, setCustomer] = useState([]);
   //const [customer, setCustomer]= useState({})
   //const[customer, setCustomer] = useState({
    //firstname:'', lastname:'', streetaddress:'',
    //postcode:'', city:'', email:'', phone:'', trainings:''

//})

    useEffect(()=> fetchData(),[])

    const fetchData =()=> {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))

    }

    /*const showTrainings =(link) => {
        fetch(link)
        .then(response => response.json())
        .then(data => setTrainings(data.content))

    }*/

    /*const showCustomer =(link)=> {
        fetch(link)
        .then(response => response.json())
        .then(data => setCustomer(data.content))

    }*/

    const showCustomer =(link)=> {
        console.log(customers[0].links)
        fetch(link)
        .then(response => response.json())
        .then(data => setCustomer(data))

        console.log(customer)
    }

    

    const columns =[
        {
            Header: "Lastname",
            accessor: 'lastname'
        },
        {
            Header: "Firstname",
            accessor: 'firstname'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        //---
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

        //---

        /*{
            sortable: false,
            filterable: false,
            accessor:'links[2].href',
            Cell: row => <Button color="secondary" size="small" onClick={showTrainings(row.value)}>Trainings</Button>

        },*/
        {
            sortable: false,
            filterable: false,
            accessor:'links[0].href',
            Cell: row => <Button color="secondary" size="small" onClick={showCustomer(row.value)}>Info</Button>

        }
    ]

    return(
        <div>
            <h1>Customers:</h1>
            
            <ReactTable filterable={true} data={customers} columns={columns}></ReactTable>
            

        </div>
    )
}