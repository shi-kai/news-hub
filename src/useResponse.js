import { useEffect, useState } from "react";

export default function useResponse(category) {
  const [response, setResponse] = useState({ status: "unloaded", data: [] });

  useEffect(() => {
    if (category === "space") {
      setResponse({ status: "loading", data: [] });
      fetch("https://api.spaceflightnewsapi.net/v3/articles")
        .then((res) => res.json())
        .then((json) => setResponse({ status: "loaded", data: json }));
    } else {
      setResponse({ status: "loading", data: [] });
      fetch(
        category === "space"
          ? "https://api.spaceflightnewsapi.net/v3/articles"
          : `https://inshortsapi.vercel.app/news?category=${category}`
      )
        .then((res) => res.json())
        .then((json) => setResponse({ status: "loaded", data: json.data }));
    }
  }, [category]);

  return response;
}
