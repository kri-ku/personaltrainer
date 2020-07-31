import React, {useState, useEffect }from 'react';
import ReactTable from 'react-table';

export default function Showcustomer (props) {

   /* const[customer, setCustomer] = useState({
        firstname:'', lastname:'', streetaddress:'',
        postcode:'', city:'', email:'', phone:'', trainings:''

    })

    useEffect(() => setCustomer({firstname:props.firstname, lastname:props.lastname, streetaddress:props.streetaddress,
    postcode:props.postcode, city:props.city, email:props.email, phone:props.phone, trainings:props.links[2].href}),[])*/

    const columns =[
        {
            Header: 'Lastname',
            accessor: 'lastname'

        },
        {
            Header: 'Firstname',
            accessor: 'firstname'

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
            Header: 'City',
            accessor: 'city'

        },
        {
            Header: 'Email',
            accessor: 'email'

        },
        {
            Header: 'Phone',
            accessor: 'Phone'

        },
        

    ]


    return[
        <div>
            <ReactTable data={props.Showcustomer} columns={columns}></ReactTable>
        </div>
    ]
}