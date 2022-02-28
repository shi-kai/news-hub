import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Card, Button } from "react-bootstrap";

const CategoryList = [
  "all",
  "national",
  "business",
  "sports",
  "world",
  "politics",
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
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://inshortsapi.vercel.app/news?category=${category}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [category]);

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
      {Object.keys(data).length > 0 && (
        <div className="mx-auto" style={{ width: "24rem" }}>
          <h1>{capitalizeFirstLetter(data.category)}</h1>
          {data.data.map((item) => {
            return (
              <Card key={item.title}>
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.content}</Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="light"
                      size="sm"
                      href={item.readMoreUrl}
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
      )}
    </div>
  );
}
