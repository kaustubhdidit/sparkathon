'use client';

import { Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';
import { Card, Table, Button, Tooltip, OverlayTrigger, Modal, Form } from 'react-bootstrap';
import { PageHeading } from 'widgets';
import { useState, useEffect } from 'react';

const ChangeLog = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'

    // Fetch users from API
    const getAllUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getAllUsers`);
            const data = await response.json();

            if (data.success) {
                setUsers(data.users); // Set the fetched users
                setFilteredUsers(data.users); // Initialize the filtered list
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // Filter users based on search term and status
    useEffect(() => {
        const filtered = users.filter((user) => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && user.perm5) ||
                (statusFilter === 'inactive' && !user.perm5);

            return matchesSearch && matchesStatus;
        });
        setFilteredUsers(filtered);
    }, [searchTerm, statusFilter, users]);

    const handleEditPermissions = (user) => {
        setCurrentUser(user);
        setPermissions({
            perm1: user.perm1,
            perm2: user.perm2,
            perm3: user.perm3,
            perm4: user.perm4,
            perm5: user.perm5,
        });
        setShowModal(true);
    };

    const handlePermissionChange = (e) => {
        const { name, value } = e.target;
        setPermissions({ ...permissions, [name]: value });
    };

    const handleSavePermissions = async () => {
        if (!currentUser) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/updatePermissions/${currentUser._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    perm1: permissions.perm1,
                    perm2: permissions.perm2,
                    perm3: permissions.perm3,
                    perm4: permissions.perm4,
                    perm5: permissions.perm5,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Permissions updated successfully!");
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === currentUser._id ? { ...user, ...permissions } : user
                    )
                );
            } else {
                alert(`Failed to update permissions: ${data.message}`);
            }
        } catch (error) {
            alert("An error occurred while updating permissions.");
        } finally {
            setShowModal(false);
        }
    };

    const permissionLabels = {
        perm1: "Access To User Table",
        perm2: "Allow Updating Delivery Status",
        perm3: "Access To Orders Master Table",
        perm4: "Manage Roles",
        perm5: "Activity Status",
    };

    return (
        <Container fluid className="p-6">
            <PageHeading heading="User Information and Permissions" />

            {/* Search and Filter */}
            <Row className="mb-4">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Search by name, email or role"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col md={6}>
                    <Form.Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mt-6">
                <Col md={12}>
                    <Card>
                        <Card.Header className="bg-white py-4">
                            <h4 className="mb-0">All Users</h4>
                        </Card.Header>
                        <Table responsive className="text-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    {JSON.parse(localStorage.getItem("user"))?.role === "admin" && <th>Edit Permissions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers
                                    .filter(user => user._id !== JSON.parse(localStorage.getItem("user"))?.id)
                                    .map((user, index) => (
                                        <tr key={index}>
                                            <td className="align-middle">{user.name}</td>
                                            <td className="align-middle">{user.email}</td>
                                            <td className="align-middle">{user.role}</td>
                                            <td className="align-middle">
                                                <span className={`badge ${user.perm5 ? "bg-success" : "bg-danger"}`}>
                                                    {user.perm5 ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            {JSON.parse(localStorage.getItem("user"))?.role === "admin" && user.role !== "admin" && (
                                                <td className="text-dark">
                                                    <OverlayTrigger
                                                        key="top"
                                                        placement="top"
                                                        overlay={<Tooltip>Edit Permissions</Tooltip>}
                                                    >
                                                        <Button
                                                            variant="none"
                                                            onClick={() => handleEditPermissions(user)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
                                                            </svg>
                                                        </Button>
                                                    </OverlayTrigger>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Permissions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {Object.keys(permissions).map((perm, index) => (
                            <Form.Group key={index} className="mb-3 d-flex justify-content-between align-items-center">
                                <Form.Label className="mb-0">{permissionLabels[perm] || perm}</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id={`switch-${perm}`}
                                    name={perm}
                                    checked={permissions[perm]}
                                    onChange={(e) => setPermissions({
                                        ...permissions,
                                        [perm]: e.target.checked,
                                    })}
                                />
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSavePermissions}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ChangeLog;
