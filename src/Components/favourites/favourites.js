import { useState } from "react";
import { Carousel, Tab, Row, Col, ListGroup } from "react-bootstrap";

export default function Facourites() {
  //   const [index, setIndex] = useState(0);

  //   const handleSelect = (selectedIndex, e) => {
  //     setIndex(selectedIndex);
  //   };

  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#Parks">
              Parks
            </ListGroup.Item>
            <ListGroup.Item action href="#Heritage Buildings">
              Heritage Buildings
            </ListGroup.Item>
            <ListGroup.Item action href="#Food">
              Food
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Tab.Container>
  );
}

// <Col sm={8}>
// <Tab.Content>
//   <Tab.Pane eventKey="#link1">
//     <Sonnet />
//   </Tab.Pane>
//   <Tab.Pane eventKey="#link2">
//     <Sonnet />
//   </Tab.Pane>
// </Tab.Content>
// </Col>

//   render(<ControlledCarousel />);
