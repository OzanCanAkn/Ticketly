import React, { useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const TicketDetailModal = ({ ticket, user }) => {
    const [modal, setModal] = useState(false);

    const modalContentRef = useRef();

    const toggle = () => setModal(!modal);

    const exportPDF = () => {
        html2canvas(modalContentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
              orientation: 'landscape',
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('ticket.pdf');
        });}

    const exportImage = () => {
        html2canvas(modalContentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'ticket.png';
            link.click();
        });
    }

    return (
        <div>
            <Button color="primary" onClick={toggle}>View Details</Button>
            <Modal size="lg" isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Ticket Details</ModalHeader>
                <ModalBody>
                    <div ref={modalContentRef}>
      <h1>Ticket</h1>
      <Table striped>
        <thead>
          <tr>
          <th>Photo</th>
            <th>Description</th>
            <th>Date</th>
            <th>Owner of ticket</th>
            <th>Corporation</th>
            <th>Event Site - District - City</th>
            <th>Event Subtype - Event Type</th>
          </tr>
        </thead>
        <tbody>
            <tr key={ticket.eventId}>
            <td><img src={ticket.eventPhotoPath==="default" ? JSON.parse(localStorage?.getItem("default.jpeg"))?.base64data: JSON.parse(localStorage?.getItem(ticket.eventPhotoPath || "default.jpeg"))?.base64data} alt="preview" style={{ width: '100px', height: '100px' }} /></td>
              <td>{ticket.eventDescription}</td>
              <td>{ticket.eventDate}</td>
              <td>{user?.name}</td>

              <td>{ticket.corporationDescription}</td>
              <td>
                {ticket.eventSiteName} - {ticket.districtName} - {ticket.cityName}
              </td>
              <td>
                {ticket.eventSubTypeName} - {ticket.eventTypeName}
              </td>
            </tr>
        </tbody>
      </Table>
                    {/* Add more details as needed */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                    <Button color="info" onClick={exportPDF}>Export as PDF</Button>
                    <Button color="info" onClick={exportImage}>Export as Image</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default TicketDetailModal;