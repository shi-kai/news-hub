import { useEffect, useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";

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

function useResponse(category) {
  const [response, setResponse] = useState({ status: "unloaded", data: [] });

  useEffect(() => {
    setResponse({ status: "loading", data: [] });
    fetch(`https://inshortsapi.vercel.app/news?category=${category}`)
      .then((res) => res.json())
      .then((json) => setResponse({ status: "loaded", data: json }));
  }, [category]);

  return response;
}

export default function Inshorts() {
  const response = useResponse("all");

  return (
    <div className="mx-auto" style={{ width: "24rem" }}>
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
