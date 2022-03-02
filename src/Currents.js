import { useEffect, useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";

function useResponse() {
  const [response, setResponse] = useState({ status: "unloaded", data: [] });

  useEffect(() => {
    setResponse({ status: "loading", data: [] });
    fetch(
      "https://api.currentsapi.services/v1/latest-news?apiKey=SCLGOTLkid_rzp8Frl8tsun3g_agUv3DMHaeuiakcLmcIFjc"
    )
      .then((res) => res.json())
      .then((json) => setResponse({ status: "loaded", data: json }));
  }, []);

  return response;
}

export default function Currents() {
  const response = useResponse();

  return (
    <div className="mx-auto" style={{ width: "24rem" }}>
      {response.status === "loading" && (
        <Spinner animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {response.status === "loaded" &&
        response.data.news.map((item) => {
          return (
            <Card key={item.id}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <small className="text-muted">
                  by {item.author},{" "}
                  {new Date(item.published.split(" ")[0]).toDateString()}
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
