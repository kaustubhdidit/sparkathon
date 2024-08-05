// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card,ListGroup, Table, Image, Dropdown, Modal, Button, Tooltip,OverlayTrigger } from 'react-bootstrap';
import React from "react";
import { useState } from 'react';
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";

const ActiveProjects = () => {
    const [scrollShow, setScrollShow] = useState(false);
    const [retMod, setRetMod] = useState(false);
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


    const ReturnModal=()=>{
        
        return(
        <Modal className="modal-dialog-scrollable" show={retMod} onHide={() => setRetMod(false)}  >
                <Modal.Header closeButton>
                    <Modal.Title> <span style={{fontWeight:'bold'}}>Return/Replace</span></Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{height:'500px'}} >
                <Card>
                <ListGroup variant="">
    <ListGroup.Item><strong>Product Name: </strong></ListGroup.Item>
    <ListGroup.Item><strong>Vendor: </strong></ListGroup.Item>
  </ListGroup>
</Card>
<br />
<Card>
                <ListGroup variant="">
    <ListGroup.Item><strong style={{color:'black'}}>Return/Replace </strong></ListGroup.Item>
    <ListGroup.Item>
 <select class="form-select" aria-label="Default select example">
  <option selected>Choose...</option>
  <option value="1">Return</option>
  <option value="2">Replace</option>
</select>
<br />
<div class="col-md-5">
    <label for="validationCustom05" class="form-label">Quantity</label>
    <input placeholder='Enter the quantity' type="text" class="form-control" required/>
    
    <div class="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>
  <label style={{marginTop:'10px'}} for="validationCustom05" class="form-label">Reason</label>
    <input placeholder='Mention the reason for return/replacement' style={{width:'100%'}} type="text" class="form-control" required/>
  {/* </div> */}

  <label style={{marginTop:'10px'}} for="validationCustom05" class="form-label">Attachment</label>
  <div class="input-group">
  <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
  {/* <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button> */}
</div>
</ListGroup.Item>
  </ListGroup>
</Card>
<br/>
<Card>
                <ListGroup variant="">
    <ListGroup.Item><strong style={{color:'black'}}>Logistics </strong></ListGroup.Item>
    <ListGroup.Item><strong>Vehicle: </strong></ListGroup.Item>
  </ListGroup>
</Card>
                </Modal.Body>
            </Modal>
        )
    }

    const BatchModal=()=>{
        
        return(
        <Modal className="modal-dialog-scrollable" show={scrollShow} onHide={() => setScrollShow(false)}  >
                <Modal.Header closeButton>
                    <Modal.Title>Batch Details</Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{height:'500px'}} >
                <Card>
                <ListGroup variant="">
    <ListGroup.Item><strong>Product Name: </strong></ListGroup.Item>
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
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Return Frequency</th>
                                <th>Details</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ActiveProjectsData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                                        <Image src={item.brandLogo} alt="" />
                                                    </div>
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className=" mb-1">
                                                        <Link href="#" className="text-inherit">{item.projectName}</Link></h5>
                                                </div>
                                            </div>
                                        </td>
                                       
                                        <td className="align-middle">{item.hours}</td>
                                        <td className="align-middle"><span className={`badge bg-${item.priorityBadgeBg}`}>{item.priority}</span></td>
                                        <td className="align-left text-dark">
                                            <Button className="align-left" variant='none' onClick={() => setScrollShow(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
            </Button>

                                                
                                        </td>
                                        <td className=" text-dark" >
                                        <OverlayTrigger
    key='top'
    placement='top'                                
    overlay={
        <Tooltip id={`tooltip-top`}>
     Return
        </Tooltip>
    }
    >
                                            <Button className="align-left" variant='none' onClick={() => setRetMod(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
</svg>
            </Button>
</OverlayTrigger>                                       
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
        {retMod && <ReturnModal/>}
        </>
    )
}

export default ActiveProjects