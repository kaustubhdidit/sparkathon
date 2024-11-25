'use client'

// import node module libraries
import { Row, Col, Card, Form, Button, Image, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from 'src/context/userContext';
import { useRouter } from 'next/navigation';

// import hooks
import useMounted from 'hooks/useMounted';

const SignUp = () => {
  const hasMounted = useMounted();
  const router = useRouter();
  const { updateUser, user } = useUser();
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

  const handleRoleSelect = (role) => {
      setFormData(prevState => ({
          ...prevState,
          role
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
            // console.log('Registration successful', data);

            // Extract user and token details
            const { authToken, data: userData } = data;

            const base64Url = authToken.split('.')[1]; // Extract payload
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix Base64 encoding
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            console.log(JSON.parse(jsonPayload).user)
      
            // Update UserContext
            updateUser(userData.user);
      
            // Persist data in localStorage
            localStorage.setItem('authData', authToken); // Store token securely
            // localStorage.setItem('user', JSON.stringify(userData.user)); // Persist user data
      
              router.push('/');
          } else {
              console.error('Registration failed', data);
          }
      } catch (error) {
          console.error('Registration error', error);
      }
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              {/* <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link> */}
              <h1 color='secondary'>Sign Up</h1>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted && 
            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" id="name" name="name" value={formData.name}
                                onChange={handleChange} placeholder="User Name" required="" />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"  id="email"
                                name="email"
                                
                                value={formData.email}
                                onChange={handleChange} placeholder="Enter address here" required="" />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  name="password"
                                
                                value={formData.password}
                                onChange={handleChange} placeholder="**************" required="" />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="confirm-password">
              
                <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={(e) => handleRoleSelect(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    {/* <option value="employee">Employee</option> */}
                                    {/* <option value="vendor">Vendor</option> */}
                                </select>
                            </div>
                        </div>
              </Form.Group>

              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">Create Account</Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-in" className="fs-5">Already member? Login </Link>
                  </div>
                  <div>
                    {/* <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link> */}
                  </div>
                </div>
              </div>
            </Form>
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default SignUp