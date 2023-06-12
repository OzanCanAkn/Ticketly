import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const LogScreen = ()=>{
    const [logs, setLogs] = useState([])
    useEffect(() => {
        axios.get(`https://database-management.vercel.app/eventLog/user/${localStorage.getItem('userid')}/logs`, {
          headers: {
            'x-apikey': '59a7ad19f5a9fa0808f11931',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "Accept": "*/*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }).then(function (response) {
          setLogs(response.data)
        }).catch(function (error) {
          // handle error
          console.log(error);
          toast("failed to get logs")
        })
      }, [])

        return (
            <><h3 className='p-3'>Last 10 Usage Log</h3>
            <Table hover>
                <thead>
                    <tr>
                        <th>Event Log ID</th>
                        <th>User</th>
                        <th>Log Info</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => {
                        return (
                            <tr key={index}>
                                <td>{log.eventLogId}</td>
                                <td>You</td>
                                <td>{log.logInfo}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            </>
        );
}

export default LogScreen;