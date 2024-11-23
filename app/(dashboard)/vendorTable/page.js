'use client'

import { Row, Col, Container, Card, Table, Form, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Settings = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/getAllProd`, {
          method: 'GET',
        });
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        } else {
          console.error('Error fetching products:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and availability
  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability =
      filterAvailability === 'all' ||
      (filterAvailability === 'available' && product.available) ||
      (filterAvailability === 'unavailable' && !product.available);
    return matchesSearchTerm && matchesAvailability;
  });

  return (
    <Container fluid className="p-6">
      {/* Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Table */}
      <Row className="mt-6">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white py-4">
              <h4 className="mb-0">Product Details</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Product Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price/Unit</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.pid}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <Badge
                        bg={product.available ? 'success' : 'danger'}
                      >
                        {product.available ? 'Available' : 'Unavailable'}
                      </Badge>
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

export default Settings;
