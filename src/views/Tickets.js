import React, { useState, useEffect } from 'react';
import { Table, Container } from 'reactstrap';
import axios from 'axios';
import TicketDetailModal from "../components/TicketDetailModal"
const PreviouslyPurchasedTickets = () => {
    const [tickets, setTickets] = useState([{event:"what a fest",date:"24 july", venue:"Pamucak Coast"}]);
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get("https://database-management.vercel.app/user/getInfo", {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "Accept": "*/*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }).then(function (response) {
            setUser(response.data.user)
        }).catch(function (error) {
          console.log(error);
        })
      }, [])
    useEffect(() => {            
        axios.get(`https://database-management.vercel.app/event/user/${localStorage.getItem('userid')}/participating`,{headers: { 
            'x-apikey': '59a7ad19f5a9fa0808f11931',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "Accept":"*/*",
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }}).then(function (response) {
            setTickets(response.data)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])

    return (
        <Container>
            <h2>Previously Purchased Tickets</h2>
            <Table>
                <thead>
                    <tr>
            <th>Event Photo</th>
          <th>Event Description</th>
          <th>Event Date</th>
          <th>Owner of ticket</th>
          <th>Corporation Description</th>
          <th>Venue</th>
          <th>Event Type</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
            <td><img src={ticket.eventPhotoPath==="default" ? JSON.parse(localStorage?.getItem("default.jpeg"))?.base64data: JSON.parse(localStorage?.getItem(ticket.eventPhotoPath || "default.jpeg"))?.base64data} alt="preview" style={{ width: '100px', height: '100px' }} /></td>
            <td>{ticket.eventDescription}</td>
            <td>{ticket.eventDate}</td>
            <td>{user?.name}</td>
            <td>{ticket.corporationDescription}</td>
            <td>{ticket.eventSiteName} - 
            {ticket.districtName} - 
            {ticket.cityName}</td>
            <td>{ticket.eventSubTypeName} - 
            {ticket.eventTypeName}</td>
                        <td><TicketDetailModal ticket={ticket} user={user} /></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PreviouslyPurchasedTickets;