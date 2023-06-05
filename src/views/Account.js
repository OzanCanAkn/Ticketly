import React, { useEffect, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const AccountPage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [file, setFile] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform account update logic here
    console.log('Updated Name:', name);
    console.log('Updated Email:', email);

    // Reset form fields
    setName('');
    setEmail('');
  };

  useEffect(() => {
    axios.get("https://database-management.vercel.app/user/getInfo", {
      headers: {
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function (response) {
      console.log(response)
      setName(response.data.user.name)
      setEmail(response.data.user.email)
      setFile(JSON.parse(localStorage.getItem(response.data.user.userPhotoPath)) || null)
    }).catch(function (error) {
      // handle error
      console.log(error);
    })

  }, [])

  return (
    <Container>
      <h1>Update Account</h1>
      <p>Profile Photo:</p>
      {file && (
        <img src={file.base64data} alt="preview" style={{ width: '100px', height: '100px' }} />
      )}
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">Update Account</Button>
      </Form>
    </Container>
  );
};

export default AccountPage;