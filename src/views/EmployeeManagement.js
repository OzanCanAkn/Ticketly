import React, { useState, useEffect } from 'react';
import { Button, Table, Form, FormGroup, Label, Input, Container, CustomInput } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmployeeManagement = () => {
    const corp = JSON.parse(localStorage.getItem("corp"))
    const date = new Date();
    const isManager = corp.role==="Manager"
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [employeeRole, setEmployeeRole] = useState('');
    const [userLookUp, setUserLookUp] = useState({})
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const fetchEmployees = async () => {
        const response = await axios.get(`https://database-management.vercel.app/employee/corporation/${corp.corporationId}`,{
            headers: {
              'x-apikey': '59a7ad19f5a9fa0808f11931',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              "Accept": "*/*",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          }); // replace with your actual endpoint
        setEmployees(response.data);
    };
    const fetchUsers = async () => {
        const response = await axios.get('https://database-management.vercel.app/auth',{headers: {
            'x-apikey': '59a7ad19f5a9fa0808f11931',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "Accept": "*/*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }}); // replace with your actual endpoint
        setUsers(response.data);
        const userMap={}
        response.data.map(user => {
            userMap[user.name] = user.userId;
        })
        console.log(userMap)
        setUserLookUp(userMap)
    };

    useEffect(() => {
        fetchEmployees();
        fetchUsers();
    }, []);

    const handleAddEmployee = async (e) => {
        console.log(selectedUser)
        e.preventDefault();
        const newEmployee = {
            userId: userLookUp[selectedUser],
            role: employeeRole,
            startDate:`${day}-${month}-${year}`,
            isActive:true,
            corporationId:corp.corporationId
        };
        const response = await axios.post('https://database-management.vercel.app/employee', newEmployee,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              "Accept": "*/*",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          }); // replace with your actual endpoint
        fetchEmployees()
    };

    const handleRemoveEmployee = async (id) => {
        await axios.delete(`https://database-management.vercel.app/employee/${id}`,{
            headers: {
              'x-apikey': '59a7ad19f5a9fa0808f11931',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              "Accept": "*/*",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          }).then(function (response) {
            console.log(response)
            fetchEmployees();
            toast("deleted")
          }).catch(function (error) {
            // handle error
            console.log(error);
            toast("failed delete event")
      
          }); // replace with your actual endpoint
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    return (
        <Container>
            {isManager && <><h2>Employee Management</h2>

            <Form onSubmit={handleAddEmployee}>
                <FormGroup>
                    <Label for="user">Select User</Label>
                    <Input type="select" id="user" name="user" value={selectedUser} onChange={e => {setSelectedUser(e.target.value); console.log(e.target)}} required>
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="role">Employee Role</Label>
                    <Input type="text" name="role" id="role" value={employeeRole} onChange={e => setEmployeeRole(e.target.value)} required />
                </FormGroup>
                <Button type="submit">Add Employee</Button>
            </Form></>}

            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <th scope="row">{employee.employeeId}</th>
                            <td>{employee.name}</td>
                            <td>{employee.role}</td>
                            <td>
                                <Button color="danger" onClick={() => handleRemoveEmployee(employee.employeeId)}>Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default EmployeeManagement;

