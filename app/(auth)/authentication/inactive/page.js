'use client'
// import node module libraries
import { Col, Row, Image, Container } from 'react-bootstrap';
import Link from 'next/link';

// import hooks
import useMounted from 'hooks/useMounted';
import { Fragment } from 'react';

const Inactive = () => {
  const hasMounted = useMounted();
  return (
    <Fragment>
      {hasMounted &&
        <Container>
          <Row >
            <Col sm={12}>
              <div className="text-center">
                <div className="mb-3">
                  <Image src="/images/error/404-error-img.png" alt="" className="img-fluid" />
                </div>
                <h1 className="display-5 fw-bold">Oops! your activity has been blocked by the Admin.</h1>
                
                <Link href="/authentication/sign-in" className="btn btn-primary">
                  SignIn
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      }
    </Fragment>
  );
};


export default Inactive;