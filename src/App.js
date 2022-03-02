import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Inshorts from "./Inshorts";
import Spaceflight from "./Spaceflight";
import Currents from "./Currents";
import GNews from "./GNews";

const SourceList = ["Spaceflight News", "GNews", "Currents", "Inshorts News"];

export default function App() {
  const [source, setSource] = useState(SourceList[0]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>📰 {source}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {SourceList.map((item) => {
                return (
                  <Nav.Link key={item} onClick={() => setSource(item)}>
                    {item}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {source === "Spaceflight News" && <Spaceflight />}
      {source === "GNews" && <GNews />}
      {source === "Currents" && <Currents />}
      {source === "Inshorts News" && <Inshorts />}
    </div>
  );
}
