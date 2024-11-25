'use client'

// import node module libraries
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from 'src/context/userContext';
import { useRouter } from 'next/navigation';
// import hooks
import useMounted from 'hooks/useMounted';

const SignIn = () => {
  const hasMounted = useMounted();
  const router = useRouter();
  const { updateUser, user } = useUser();
  const [formData, setFormData] = useState({
      email: '',
      password: '',

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful', data);

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

            // Redirect to home page
            router.push('/');
        } else if (response.status === 403) {
            console.warn('Account is inactive');
            // Redirect to inactive account page
            router.push('/authentication/inactive');
        } else {
          alert('Login error');
            console.error('Login failed', data.message);
        }
    } catch (error) {
        console.error('Login error', error);
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
            <h1 color='secondary'>Sign In</h1>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted &&
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
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
                <div>
                  {/* Button */}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">Sign In</Button>
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5">Create An Account </Link>
                    </div>
                    <div>
                      {/* <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link> */}
                    </div>
                  </div>
                </div>
              </Form>}


          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}


export default SignIn