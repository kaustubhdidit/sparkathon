'use client';

import { Row, Col, Container, Card, Table, Badge, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useUser } from 'src/context/userContext';

const Layout = () => {
  const { user } = useUser(); // Assuming `user` contains role information
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // Filter: All, Pending, Delivered

  // Fetch all orders for the vendor
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/vendOrders?vendorEmail=${encodeURIComponent(user.email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
          setFilteredOrders(data.orders); // Initialize filtered orders
        } else {
          console.error('Error fetching orders:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders();
  }, [user.email]);

  // Handle search and filter
  useEffect(() => {
    let filtered = orders;

    // Apply search filter (by product ID)
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.pid.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter (Pending, Delivered)
    if (statusFilter !== 'All') {
      filtered = filtered.filter((order) => order.deliveryStatus === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const handleStatusToggle = async (orderId, currentStatus) => {
    const updatedStatus = currentStatus === 'Delivered' ? 'Pending' : 'Delivered';
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/updateOrderStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: updatedStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, deliveryStatus: updatedStatus } : order
          )
        );
      } else {
        console.error('Error updating status:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container fluid className="p-6">
      {/* Search and Filter */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Search by Product Id"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Orders Table */}
      <Row className="mt-6">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white py-4">
              <h4 className="mb-0">Order Details</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Employee Email</th>
                  <th>Product Id</th>
                  <th>Name</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.empEmail}</td>
                    <td>{order.pid}</td>
                    <td>{order.name}</td>
                    <td>{order.price}</td>
                    <td>
                      <Badge
                        bg={order.deliveryStatus === 'Delivered' ? 'success' : 'danger'}
                        className="me-2"
                      >
                        {order.deliveryStatus}
                      </Badge>
                      {/* Render toggle only if the status is not "Delivered" or the user is admin */}
                      {order.deliveryStatus !== 'Delivered' || user.role === 'admin' ? (
                        <Form.Check
                          type="switch"
                          id={`toggle-status-${order._id}`}
                          checked={order.deliveryStatus === 'Delivered'}
                          onChange={() => handleStatusToggle(order._id, order.deliveryStatus)}
                        />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
