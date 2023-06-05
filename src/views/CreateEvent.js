import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const EventCreation = () => {
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventSiteId, setEventSiteId] = useState('');
    const [eventSubTypeId, setEventSubTypeId] = useState('');
    const [eventSites, setEventSites] = useState([]);
    const [eventSubTypes, setEventSubTypes] = useState([]);
    const [path, setPath] = useState('');

    const [file, setFile] = useState(JSON.parse(localStorage.getItem(path)) || null);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const index=acceptedFiles?.length-1
            const file = acceptedFiles[index];
            const reader = new FileReader();
            setPath(acceptedFiles[index].path)
            reader.onloadend = () => {
                const base64data = reader.result;
                localStorage.setItem(acceptedFiles[index].path, JSON.stringify({base64data, name: file.name}));
                setFile({base64data, name: file.name});
            };
            reader.readAsDataURL(file);
        },
        multiple: false
    });

    useEffect(() => {
        const fetchEventSites = async () => {
            const response = await axios.get('https://database-management.vercel.app/eventSite',{
                headers: {
                  'x-apikey': '59a7ad19f5a9fa0808f11931',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  "Accept": "*/*",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
              }); // replace with your actual endpoint
            setEventSites(response.data);
        };
        const fetchEventSubTypes = async () => {
            const response = await axios.get('https://database-management.vercel.app/eventSubType',{
                headers: {
                  'x-apikey': '59a7ad19f5a9fa0808f11931',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  "Accept": "*/*",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
              }); // replace with your actual endpoint
            setEventSubTypes(response.data);
        };
        fetchEventSites();
        fetchEventSubTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = {
            eventDescription,
            eventDate,
            eventSiteId,
            eventSubTypeId,
            eventPhotoPath:path,
            corporationId:JSON.parse(localStorage.getItem("corp")).corporationId

        };
        await axios.post('https://database-management.vercel.app/event', newEvent,{
            headers: {
              'x-apikey': '59a7ad19f5a9fa0808f11931',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              "Accept": "*/*",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          }); // replace with your actual endpoint
        setEventDescription('');
        setEventDate('');
        setEventSiteId('');
        setEventSubTypeId('');
    };

    return (
        <Container>
            <h2>Create Event</h2>
            <Form onSubmit={handleSubmit}>
            <div className="border border-primary rounded-1 mb-1 pl-2 pt-3 w-50 text-primary" {...getRootProps()}>
                <Label for="password">Event Photo</Label>

                    <input {...getInputProps()} />
                    {
                                            <p>Drag 'n' drop some files here, or click to select files</p>

                    }
                </div>
                {file && (
                    <img src={file.base64data} alt="preview" style={{ width: '100px', height: '100px' }} />
                )}
                <FormGroup>
                    <Label for="description">Event Description</Label>
                    <Input type="textarea" name="description" id="description" value={eventDescription} onChange={e => setEventDescription(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Event Date</Label>
                    <Input type="date" name="date" id="date" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="site">Event Site</Label>
                    <Input type="select" name="site" id="site" value={eventSiteId} onChange={e => setEventSiteId(e.target.value)} required>
                        <option value="">Select a site</option>
                        {eventSites.map(site => (
                            <option key={site.eventSiteId} value={site.eventSiteId}>{site.eventSiteName}</option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="subtype">Event Sub-Type</Label>
                    <Input type="select" name="subtype" id="subtype" value={eventSubTypeId} onChange={e => setEventSubTypeId(e.target.value)} required>
                        <option value="">Select a sub-type</option>
                        {eventSubTypes.map(subtype => (
                            <option key={subtype.eventSubTypeId} value={subtype.eventSubTypeId}>{subtype.eventSubTypeName}</option>
                        ))}
                    </Input>
                </FormGroup>
                <Button type="submit">Create Event</Button>
            </Form>
        </Container>
    );
};

export default EventCreation;