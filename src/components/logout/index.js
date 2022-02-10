import React, { useEffect } from 'react';
import Http from '../../components/app/http';
import {Row, Col, Alert} from "react-bootstrap"

export default function Logout() {
    const {logout} = Http();

    useEffect(() => {
       logout()
    }, [logout])

    return (
        <Row className="justify-content-center">
            <Col className="align-self-center col-6">
                 <Alert variant="info">Buy, buy....</Alert>
            </Col>
        </Row>
    )
}
