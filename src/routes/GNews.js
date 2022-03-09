import { useEffect, useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";
import axios from "axios";

function useResponse() {
  const [response, setResponse] = useState({ status: "unloaded", data: [] });

  useEffect(() => {
    setResponse({ status: "loading", data: [] });
    axios(
      `https://gnews.io/api/v4/top-headlines?token=${process.env.REACT_APP_API_KEY_GNEWS}`
    ).then((response) => {
      setResponse({ status: "loaded", data: response.data });
    });
  }, []);

  return response;
}

export default function GNews() {
  const response = useResponse();

  return (
    <div className="mx-auto" style={{ width: "24rem" }}>
      {response.status === "loading" && (
        <Spinner animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {response.status === "loaded" &&
        response.data.articles.map((item) => {
          return (
            <Card key={item.id}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <small className="text-muted">
                  by {item.source.name},{" "}
                  {new Date(item.publishedAt).toDateString()}
                </small>
                <Card.Text>{item.description}</Card.Text>
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
