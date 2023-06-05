import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDropzone } from 'react-dropzone';
import { SHA256 } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [path, setPath] = useState('');
  const [isLoggedin, setLoggedin] = useState(true);
  const [isLoginForm, setIsLoginForm] = useState(true)

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


    const hashPassword = (password) => {
      const hashedPassword = SHA256(password).toString();
      return hashedPassword;
    };
  const loginHandler = (ev) => {
    ev.preventDefault();
    if (!username || !password) {
      return;
    }

    fetch("https://database-management.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        password: hashPassword(password)
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.token){
          localStorage.setItem("token" , data.token)
          localStorage.setItem("userid" , data.user.userId)
          localStorage.setItem("corp" , JSON.stringify(data.worksIn) || false)
        }
        setLoggedin(true);
        navigate('/');
      });

  };

  const registerHandler = (ev) => {
    ev.preventDefault();
    if (!username || !password || username==="" || password==="") {
      return;
    }

    fetch("https://database-management.vercel.app/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": hashPassword(password),
        "name": username,
        "userPhotoPath": path
    })
    })
      .then((data) => {
        console.log("RESPONSE from login success ", data);
        setIsLoginForm(true)
        toast("Succesfully registered")
      });
  };
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardBody>
              {isLoginForm ? <Form onSubmit={loginHandler}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="something@idk.cool"
                    onChange={(ev) => setUsername(ev.currentTarget.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="examplePassword" className="mr-sm-2">
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="don't tell!"
                    onChange={(ev) => setPassword(ev.currentTarget.value)}
                  />
                </FormGroup>
                <Button style={{marginRight:"8px"}} type="submit" color="primary">
                  Login
                </Button>
                <Button className="ml-1" outline onClick={()=>setIsLoginForm(false)} color="primary">
                  Don't you have an account
                </Button>
              </Form>:
              <Container>
            <h2>Register</h2>
            <Form onSubmit={registerHandler}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <div className="border border-primary rounded-1 mb-1 pl-2 pt-3 w-50 text-primary" {...getRootProps()}>
                <Label for="password">Profile Photo</Label>

                    <input {...getInputProps()} />
                    {
                                            <p>Drag 'n' drop some files here, or click to select files</p>

                    }
                </div>
                {file && (
                    <img src={file.base64data} alt="preview" style={{ width: '100px', height: '100px' }} />
                )}
                <Button>Submit</Button>
                <Button outline onClick={()=>setIsLoginForm(true)} color="primary">
                  I have already an account
                </Button>
            </Form>
        </Container>}
                
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
