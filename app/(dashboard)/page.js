'use client';
import { Fragment, useState } from "react";
import { Modal, Card, ListGroup, Form, Button } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap';
import { ActiveProjects } from "sub-components";
import { useUser } from "src/context/userContext";
import { TasksPerformance } from "sub-components";

const UserRegistrationModal = ({ show, handleClose, handleSubmit, formData, handleChange }) => {
    return (
        <Modal
            className="modal-dialog-scrollable"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className="fw-bold">User Registration</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <ListGroup variant="">
                        <ListGroup.Item>
                            <strong className="text-dark">Enter User Details</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="employee">Employee</option>
                                        <option value="vendor">Vendor</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Register User
                                </Button>
                            </Form>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Modal.Body>
        </Modal>
    );
};

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful', data);
                setShowModal(false);
            } else {
                console.error('Registration failed', data);
            }
        } catch (error) {
            console.error('Registration error', error);
        }
    };

    const {user}=useUser();
    const formattedRole = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    return (
        <>
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h2 className="mb-0 text-white">Hello {user.name},</h2>
                                </div>
                                
                                {user.role==="admin" && <div>
                                    <Button
                                        variant="white"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Add New User
                                    </Button>
                                </div>}
                            </div>
                            <br />
                            <div className="mb-2 mb-lg-0">
                                    <h2 className="mb-0 text-white">You are signed in as <span style={{
    background: "linear-gradient(to right, yellow, orange)", // Gradient colors
    WebkitBackgroundClip: "text", // Clips the background to the text
    WebkitTextFillColor: "transparent", // Makes the text itself transparent
  }}>{formattedRole}</span></h2>
                                </div>
                        </div>
                    </Col>
                </Row>
                
                {/* <ActiveProjects /> */}

                {/* <Row className="my-6">
                    <Col xl={12} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
                        <TasksPerformance />
                    </Col>
                </Row> */}
            </Container>
            
            <UserRegistrationModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
            />
            
        </Fragment>
        
    </>
        
    );
};

export default Home;
