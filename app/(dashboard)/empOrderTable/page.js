'use client';

import { Row, Col, Modal, Container, Card, Table, Button, Form, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useUser } from 'src/context/userContext';
import { useRouter } from 'next/navigation';

const Billing = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [newOrder, setNewOrder] = useState({
    vendorEmail: '',
    empEmail:user.email,
    pid: '',
    units: '',
  });

  const [isLoadingPermissions, setIsLoadingPermissions] = useState(true); // Track permission loading

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/permissions/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            permissions: ['perm2'],
          }),
        });
  
        const data = await response.json();
        setHasPermission(data.hasPermissions || false); // Update permission state
      } catch (error) {
        console.error('Error checking permissions:', error);
        setHasPermission(false); // Default to deny permission
      } finally {
        setIsLoadingPermissions(false); // Loading complete
      }
    };
  
    fetchPermissions();
  }, [user.id]);


  // Fetch all orders for the employee
  useEffect(() => {
    const fetchOrders = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/empOrders?empEmail=${encodeURIComponent(user.email)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
      
          if (response.ok) {
            setOrders(data.orders);
          } else {
            console.error('Error fetching orders:', data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

    fetchOrders();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddOrder = async () => {
    console.log(JSON.stringify(newOrder))
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/addOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      const data = await response.json();

      if (response.ok) {
        setOrders((prevOrders) => [...prevOrders, data.order]);
        setShowAddOrderModal(false);
      } else {
        console.error('Error adding order:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      <Row className="mb-4">
        <Col md={12}>
          <Button variant="primary" onClick={() => setShowAddOrderModal(true)}>
            Add Order
          </Button>
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
      <th>Vendor Email</th>
      <th>Product Id</th>
      <th>Name</th>
      <th>Total Price</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order, index) => (
      <tr key={index}>
        <td>{order.vendorEmail}</td>
        <td>{order.pid}</td>
        <td>{order.name}</td>
        <td>{order.price}</td>
        <td>
          <Badge
            bg={order.deliveryStatus === 'Delivered' ? 'success' : 'danger'}
          >
            {order.deliveryStatus}
          </Badge>
          { (user.role === 'admin' || hasPermission) && (
            <Form.Check
              type="switch"
              id={`toggle-status-${order._id}`}
              checked={order.deliveryStatus === 'Delivered'}
              onChange={() => handleStatusToggle(order._id, order.deliveryStatus)}
            />
          )}
        </td>
      </tr>
    ))}
  </tbody>
</Table>

          </Card>
        </Col>
      </Row>

      {/* Add Order Modal */}
      {showAddOrderModal && (
        <Modal show={showAddOrderModal} onHide={() => setShowAddOrderModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Vendor Email</Form.Label>
                <Form.Control
                  type="email"
                  name="vendorEmail"
                  value={newOrder.vendorEmail}
                  onChange={handleChange}
                  placeholder="Enter vendor email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Id</Form.Label>
                <Form.Control
                  type="text"
                  name="pid"
                  value={newOrder.pid}
                  onChange={handleChange}
                  placeholder="Enter product ID"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Units</Form.Label>
                <Form.Control
                  type="number"
                  name="units"
                  value={newOrder.units}
                  onChange={handleChange}
                  placeholder="Enter number of units"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddOrderModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddOrder}>
              Add Order
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Billing;
