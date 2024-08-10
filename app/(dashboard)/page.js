'use client'
// import node module libraries
import { Fragment } from "react";
import { ProgressBar,  Card,ListGroup, Table, Image, Dropdown, Modal, Button, Tooltip,OverlayTrigger } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, 
    TasksPerformance 
} from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const Home = () => {


    const [retMod, setRetMod] = useState(false);
    const ReturnModal=()=>{
        
        return(
        <Modal className="modal-dialog-scrollable" show={retMod} onHide={() => setRetMod(false)}  >
                <Modal.Header closeButton>
                    <Modal.Title> <span style={{fontWeight:'bold'}}>Return</span></Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{height:'500px'}} >
                {/* <Card>
                <ListGroup variant="">
    <ListGroup.Item><strong>Product Name: </strong></ListGroup.Item>
    <ListGroup.Item><strong>Vendor: </strong></ListGroup.Item>
  </ListGroup>
</Card>
<br /> */}
<Card>
                <ListGroup variant="">
    <ListGroup.Item><strong style={{color:'black'}}>Enter Details </strong></ListGroup.Item>
    <ListGroup.Item>
 {/* <select class="form-select" aria-label="Default select example">
  <option selected>Choose...</option>
  <option value="1">Return</option>
  <option value="2">Replace</option>
</select>
<br /> */}
<div class="col-md-5">
    <label for="validationCustom05" class="form-label">Enter Batch Id</label>
    <input placeholder='Enter Id' type="text" class="form-control" required/>
    
    <div class="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>
<div class="col-md-5">
    <label style={{marginTop:'10px'}}  for="validationCustom05" class="form-label">Quantity</label>
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
    <ListGroup.Item><strong style={{color:'black'}}>Return Slot </strong></ListGroup.Item>
    <ListGroup.Item><strong>Vehicle: </strong></ListGroup.Item>
  </ListGroup>
</Card>
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0  text-white">Return Portal</h3>
                                </div>
                                <div>
                                    <Link onClick={() => setRetMod(true)} href="#" className="btn btn-white">Return Def Batch</Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {ProjectsStatsData.map((item, index) => {
                        return (
                            <Col xl={4} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </Col>
                        )
                    })}
                </Row>

                {/* Active Projects  */}
                <ActiveProjects />

                <Row className="my-6">
                    <Col xl={12} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">

                        {/* Tasks Performance  */}
                        <TasksPerformance />

                    </Col>
                    {/* card  */}
                    {/* <Col xl={8} lg={12} md={12} xs={12}>

    
                        <Teams />

                    </Col> */}
                </Row>
            </Container>
            {retMod && <ReturnModal/>}
        </Fragment>
    )
}
export default Home;
