import { Container, Row, Col, Button, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import SimpleModal from "../components/SimpleModal";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import EventStatModal from '../components/EventsStatsModal'
const MainFeed = () => {
  const [modalData, setModalData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filteringType, setFilteringType] = useState(0)
  const [cities, setCities] = useState([])
  const [types, setTypes] = useState()
  const [selectedCity, setSelectedCity] = useState('');
const [selectedType, setSelectedType] = useState("")
  const openModal = (event) => {
    setModalData(event)
    setIsModalOpen(true)
  }
  const handleCityClick = (city) => {
    setSelectedCity(city);
  };
  const handleTypeClick = (type) => {
    setSelectedType(type);
  };
  const reserveTicket = (count) => {
    fetch("https://database-management.vercel.app/participation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        
          "eventId": modalData.eventId,
          "userId": localStorage.getItem('userid'),
          "ticketCount": count,
          "ticketTypeId": 1
        
    })}).then(function (response) {
      console.log(response)
      setCities(response.data)
      toast("succesfully reserved")
      setIsModalOpen(false)

    }).catch(function (error) {
      // handle error
      console.log(error);
      toast("failed reservation")

    })
  }



  const [events, setEvents] = useState()


  useEffect(() => {
    axios.get("https://database-management.vercel.app/city", {
      headers: {
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function (response) {
      console.log(response)
      setCities(response.data)
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
    axios.get("https://database-management.vercel.app/eventType", {
      headers: {
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function (response) {
      console.log(response)
      setTypes(response.data)
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])
  useEffect(() => {
    axios.get(`https://database-management.vercel.app/event${filteringType===2 ? "/city/"+selectedCity.cityId : (filteringType===1 && selectedType ? "/eventType/"+selectedType.eventTypeId :"")}`, {
      headers: {
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function (response) {
      setEvents(response.data)
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [selectedCity,filteringType,selectedType])
console.log(events)
  return (
    <>
      <Col className="align-items-center justify-content-center">
        <Row xs="6" className='p-2'>
          <Button color={filteringType === 0 ? 'primary' : 'secondary'} onClick={() => setFilteringType(0)} style={{ marginRight: "8px",marginLeft: "8px"  }}>Events</Button>
          <Button color={filteringType === 1 ? 'primary' : 'secondary'} onClick={() => setFilteringType(1)} style={{ marginRight: "8px" }}>Types</Button>
          <Button color={filteringType === 2 ? 'primary' : 'secondary'} onClick={() => setFilteringType(2)}>Cities</Button>
        </Row>
        {
          filteringType===2 && <Container>
          <h1>Select a City</h1>
          <Row>
            {cities?.map((city) => (
              <Col md="4" key={city}>
                <Button
                  color={selectedCity.cityId === city.cityId ? 'primary' : 'secondary'}
                  onClick={() => handleCityClick(city)}
                  block
                >
                  {city.cityName}
                </Button>
              </Col>
            ))}
          </Row>
          {selectedCity && (
            <div>
              <h2>Events in: {selectedCity.cityName}</h2>
            </div>
          )}
        </Container>
        }
        {
          filteringType===1 && <Container >
          <h1>Select a type</h1>
          <Row>
            {types?.map((type) => (
              <Col md="4" className='mb-2' key={type.eventTypeId}>
                <Button
                  color={selectedType.eventTypeId === type.eventTypeId ? 'primary' : 'secondary'}
                  onClick={() => handleTypeClick(type)}
                  block
                >
                  {type.name}
                </Button>
              </Col>
            ))}
          </Row>
          {selectedType && (
            <div>
              <h2>{selectedType.name} {selectedType.eventTypeDescription}</h2>
            </div>
          )}
        </Container>
        }
        {(filteringType===0 || (filteringType===2 && selectedCity) || (filteringType===1 && selectedType)) && <>
        {events && events?.map((ticket) => (
          <Col key={ticket.eventId} className="align-items-center justify-content-center">
            <Row md="12">
              <Card>
                <CardImg top width="100%" src={ticket.image} alt={ticket.description} />
                <CardBody>
                  <CardTitle tag="h5">{ticket.eventDescription}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{ticket.eventTypeName}</CardSubtitle>
                  <CardText>
                    <Row>
                    <img src={ticket?.eventPhotoPath==="default" ? JSON.parse(localStorage?.getItem("default.jpeg"))?.base64data: JSON.parse(localStorage?.getItem(ticket?.eventPhotoPath || "default.jpeg"))?.base64data} alt="preview" style={{ width: '100px', height: '100px' }} />
                    <Col> <strong>Date:</strong> {ticket.eventDate}<br />
                    <strong>Corporation:</strong> {ticket.corporationDescription}<br />
                    <strong>Event Site:</strong> {ticket.eventSiteName}<br />
                    <strong>District:</strong> {ticket.districtName}<br />
                    <strong>City:</strong> {ticket.cityName}<br />
                    <strong>Event Subtype:</strong> {ticket.eventSubTypeName}</Col>
                    </Row>
                   
                  </CardText>
                  <Button onClick={() => openModal(ticket)} color="primary">Book Now</Button>
                  <EventStatModal eventId={ticket.eventId}></EventStatModal>

                </CardBody>
              </Card>
            </Row>
          </Col>
        ))}
        <SimpleModal header={{ text: "ticket details" }} onApprove={reserveTicket} approveButtonText="Reserve" onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} body={<Card>
          <CardImg top width="100%" src={modalData.image} alt={modalData.description} />
          <CardBody>
            <CardTitle tag="h5">{modalData.eventDescription}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">{modalData.eventTypeName}</CardSubtitle>
            <CardText>
            <Row>
              <img src={modalData?.eventPhotoPath==="default" ? JSON.parse(localStorage?.getItem("default.jpeg"))?.base64data: JSON.parse(localStorage?.getItem(modalData?.eventPhotoPath || "default.jpeg"))?.base64data} alt="preview" style={{ width: '100px', height: '100px' }} />
              <Col><strong>Date:</strong> {modalData.eventDate}<br />
              <strong>Corporation:</strong> {modalData.corporationDescription}<br />
              <strong>Event Site:</strong> {modalData.eventSiteName}<br />
              <strong>District:</strong> {modalData.districtName}<br />
              <strong>City:</strong> {modalData.cityName}<br />
              <strong>Event Subtype:</strong> {modalData.eventSubTypeName}</Col>
              </Row>
            </CardText>
          </CardBody>
        </Card>}></SimpleModal>
        </>}
      </Col>
    </>)
}
export default MainFeed;