import { useState } from "react";
import { Navbar, Container, Nav, Spinner, Card, Button } from "react-bootstrap";
import useResponse from "./useResponse";

const CategoryList = [
  "all",
  "national",
  "business",
  "sports",
  "world",
  "politics",
  "space",
  "technology",
  "startup",
  "entertainment",
  "miscellaneous",
  "hatke",
  "science",
  "automobile",
];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function App() {
  const [category, setCategory] = useState(CategoryList[0]);
  const response = useResponse(category);
  console.log(category, response);
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>NewsHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {CategoryList.map((item) => {
                return (
                  <Nav.Link key={item} onClick={() => setCategory(item)}>
                    {capitalizeFirstLetter(item)}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="mx-auto" style={{ width: "24rem" }}>
        <h1>{capitalizeFirstLetter(category)}</h1>
        {response.status === "loading" && (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {response.status === "loaded" &&
          response.data.map((item) => {
            return (
              <Card key={item.title}>
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <small className="text-muted">
                    by {item.author ? item.author : item.newsSite},{" "}
                    {item.date
                      ? new Date(item.date.split(",")[0]).toDateString()
                      : new Date(item.publishedAt).toDateString()}
                  </small>
                  <Card.Text>
                    {item.content ? item.content : item.summary}
                  </Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="light"
                      size="sm"
                      href={item.readMoreUrl ? item.readMoreUrl : item.url}
                      target="_blank"
                    >
                      Read more
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
