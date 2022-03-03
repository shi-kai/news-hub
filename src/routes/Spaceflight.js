import { useEffect, useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";

function useResponse() {
  const [response, setResponse] = useState({ status: "unloaded", data: [] });

  useEffect(() => {
    setResponse({ status: "loading", data: [] });
    fetch("https://api.spaceflightnewsapi.net/v3/articles")
      .then((res) => res.json())
      .then((json) => setResponse({ status: "loaded", data: json }));
  }, []);

  return response;
}

export default function Spaceflight() {
  const response = useResponse();

  return (
    <div>
      <h2>Spaceflight News</h2>
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
                  by {item.newsSite},{" "}
                  {new Date(item.publishedAt).toDateString()}
                </small>
                <Card.Text>{item.summary}</Card.Text>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="light"
                    size="sm"
                    href={item.url}
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
  );
}
