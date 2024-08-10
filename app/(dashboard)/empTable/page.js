'use client'
// import node module libraries
import { Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';
import { ProgressBar,  Card,ListGroup, Table, Image, Dropdown, Modal, Button, Tooltip,OverlayTrigger } from 'react-bootstrap';
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";
// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
// import { BillingAddress, CurrentPlan } from 'sub-components'

const Billing = () => {
  
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Employee Master Table" />

    
      <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Employee Order Details</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Employee Code</th>
                                <th>Name</th>
                                <th>Contact Number</th>
                                <th>Defected Lot</th>
                                <th>Returned Lot</th>
                                <th>Remaining</th>
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
                                                        <Link href="#" className="text-inherit">{item.empId}</Link></h5>
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
                                        <td className="align-middle">{item.hours}</td>
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
    </Container>
  )
}

export default Billing