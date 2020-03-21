import React, { Component } from 'react';
import { Row, Col, Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageHome extends Component {  
    render() {
        return (
            <div className="App-home m-5">
                <Row className="App-home-top-wrapper p-5">
                    <Col sm={9}>
                        <h3>Control Panel</h3>
                        <em>Here you can configure Jinsoyun Bot database data.</em>
                    </Col>
                    <Col sm={3}>
                        <h3>Bot Statistic</h3>
                    </Col>
                </Row>
                <hr /> 
                <div className="App-home-footer px-5">
                    <h3>Latest Activity</h3>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <td className="py-1">Info</td>
                                <td className="py-1">Service resumed @ 12:23:22 12/03/2020</td>
                            </tr>
                            <tr>
                                <td className="py-1">Warning</td>
                                <td className="py-1">Service distrupted @ 12:23:22 12/03/2020</td>
                            </tr>
                            <tr>
                                <td className="py-1">Error</td>
                                <td className="py-1">Invalid data type @ 12:23:22 12/03/2020</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>            
        )}
    }
