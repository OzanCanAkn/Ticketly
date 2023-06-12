import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EventModal = ({ eventId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [stats, setStats] = useState({});

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`https://database-management.vercel.app/stats/event/${eventId}/statistics`, {
                    headers: {
                      'x-apikey': '59a7ad19f5a9fa0808f11931',
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                      "Accept": "*/*",
                      "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                  });
                setStats(response.data);
            } catch (error) {
                toast.error('Failed to fetch event statistics.');
            }
        };

        if (isOpen) {
            fetchStats();
        }
    }, [isOpen, eventId]);

    return (
        <Container className='m-0 p-0 pt-1'>
            <Button outline color="primary" onClick={toggle}>Show Event Statistics</Button>

            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Event Statistics</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>Ticket Sales Count: {stats.ticketSalesCount}</Col>
                        <Col>Average Price: {stats.averagePrice}</Col>
                    </Row>
                    <Row>
                        <Col>Total Amount: {stats.totalAmount}</Col>
                        <Col>Max Price: {stats.maxPrice}</Col>
                    </Row>
                    <Row>
                        <Col>Min Price: {stats.minPrice}</Col>
                        <Col>Average Ticket Price: {stats.avgTicketPrice}</Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default EventModal;