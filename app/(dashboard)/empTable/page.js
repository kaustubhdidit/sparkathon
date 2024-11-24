'use client'

import { Row, Col, Modal, Container, Card, Table, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useUser } from 'src/context/userContext';

const Billing = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all', 'available', 'unavailable'
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    pid: '',
    name: '',
    description: '',
    price: '',
    available: false,
  });

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

  const handleToggleAvailability = async (pid) => {
    try {
      const productToUpdate = products.find((product) => product.pid === pid);

      if (!productToUpdate) {
        console.error('Product not found.');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/updateAva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: productToUpdate.pid,
          available: !productToUpdate.available,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedProducts = products.map((product) =>
          product.pid === pid ? { ...product, available: !product.available } : product
        );
        setProducts(updatedProducts);
      } else {
        console.error('Error updating product availability:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = () => {
    let filteredProducts = [...products];

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.pid.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (availabilityFilter !== 'all') {
      const isAvailable = availabilityFilter === 'available';
      filteredProducts = filteredProducts.filter(
        (product) => product.available === isAvailable
      );
    }

    return filteredProducts;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/addProd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();

      if (response.ok) {
        setProducts((prevProducts) => [...prevProducts, data.product]);
        setShowAddProductModal(false);
      } else {
        console.error('Error adding product:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredProducts = handleSearch();

  return (
    <Container fluid className="p-6">
      {/* Search and Filter */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Product ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={() => setShowAddProductModal(true)}>
            Add Product
          </Button>
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
                      <Form.Check
                        type="switch"
                        id={`availability-${product.pid}`}
                        label={product.available ? 'Available' : 'Unavailable'}
                        checked={product.available}
                        onChange={() => handleToggleAvailability(product.pid)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <Modal show={showAddProductModal} onHide={() => setShowAddProductModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Id</Form.Label>
                <Form.Control
                  type="text"
                  name="pid"
                  value={newProduct.pid}
                  onChange={handleChange}
                  placeholder="Enter product id"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price per Unit</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  placeholder="Enter product price"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Available"
                  checked={newProduct.available}
                  onChange={() =>
                    setNewProduct((prev) => ({ ...prev, available: !prev.available }))
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddProductModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Billing;
