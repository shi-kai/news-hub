import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Card, Button } from "react-bootstrap";
import axios from "axios";

function useResponse(category) {
  const [response, setResponse] = useState({ status: "unloaded", data: [] });

  useEffect(() => {
    setResponse({ status: "loading", data: [] });
    axios(`https://inshortsapi.vercel.app/news?category=${category}`).then(
      (response) => {
        setResponse({ status: "loaded", data: response.data });
      }
    );
  }, [category]);

  return response;
}

export default function InshortsCategory() {
  let params = useParams();
  const response = useResponse(params.categroy);

  return (
    <div>
      <h3>{params.categroy}</h3>
      {response.status === "loading" && (
        <Spinner animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {response.status === "loaded" &&
        response.data.data.map((item) => {
          return (
            <Card key={item.title}>
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <small className="text-muted">
                  by {item.author},{" "}
                  {new Date(item.date.split(",")[0]).toDateString()}
                </small>
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
  );
}
