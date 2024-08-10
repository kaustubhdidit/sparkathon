// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card,ListGroup, Table, Image, Dropdown, Modal, Button, Tooltip,OverlayTrigger } from 'react-bootstrap';
import React from "react";
import { useState } from 'react';
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";

const ActiveProjects = () => {
    const [scrollShow, setScrollShow] = useState(false);
    // const [retMod, setRetMod] = useState(false);
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        (<Link
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="text-muted text-primary-hover">
            {children}
        </Link>)
    ));

    CustomToggle.displayName = 'CustomToggle';

    const BatchModal=()=>{
        
        return(
        <Modal className="modal-dialog-scrollable" show={scrollShow} onHide={() => setScrollShow(false)}  >
                <Modal.Header closeButton>
                    <Modal.Title>Batch Details</Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{height:'500px'}} >
                <Card>
                <ListGroup variant="">
                <ListGroup.Item><strong>Batch Id: </strong></ListGroup.Item>
    <ListGroup.Item><strong>Material Code: </strong></ListGroup.Item>
    <ListGroup.Item><strong>Description: </strong></ListGroup.Item>
    <ListGroup.Item><strong>Vendor: </strong></ListGroup.Item>
  </ListGroup>
</Card>
<br />
<Card>
                <ListGroup variant="">
    <ListGroup.Item><strong>Initial Ordered Quantity: </strong></ListGroup.Item>
    <ListGroup.Item><strong>Delivery Date: </strong></ListGroup.Item>
    <ListGroup.Item><strong>MFD: </strong></ListGroup.Item>
    <ListGroup.Item><strong>Exp: </strong></ListGroup.Item>
  </ListGroup>
</Card>
<br />
<Card>
                <ListGroup variant="">
    <ListGroup.Item><strong>Current Stock: </strong></ListGroup.Item>
    <ListGroup.Item><strong>Returns: </strong></ListGroup.Item>
  </ListGroup>
</Card>
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <>
         
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Inventory</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Material Code</th>
                                <th>Description</th>
                                <th>Vendor</th>
                                <th>Yet To Return</th>
                                <th>Aging</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ActiveProjectsData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    {/* <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                                        <Image src={item.brandLogo} alt="" />
                                                    </div> */}
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className=" mb-1">
                                                        <Link href="#" className="text-inherit">{item.projectName}</Link></h5>
                                                </div>
                                            </div>
                                        </td>
                                       
                                        <td className="align-middle">{item.desc}</td>
                                        <td className="align-middle"><span >{item.vendor}</span></td>
                                        <td className="align-left text-dark">
                                            <Button className="align-left" variant='none' onClick={() => setScrollShow(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
            </Button>

                                                
                                        </td>
                                        <td className="align-middle"><span className={`badge bg-${item.priorityBadgeBg}`}>{item.priority}</span></td>
                                        <td className="align-left text-dark">
                                            <Button className="align-left" variant='none' onClick={() => setScrollShow(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
            </Button>

                                                
                                        </td>
                                       
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        <Link href="#" className="link-primary">View All Projects</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        {scrollShow && <BatchModal />}
        {/* {retMod && <ReturnModal/>} */}
        </>
    )
}

export default ActiveProjects