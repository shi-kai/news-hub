import { Link, Outlet } from "react-router-dom";

const SiteList = [
  { id: 0, name: "spaceflight", label: "Spaceflight News" },
  { id: 1, name: "inshorts", label: "Inshorts News" },
  { id: 2, name: "gnews", label: "GNews" },
  { id: 3, name: "currents", label: "Currents" },
];

export default function App() {
  return (
    <div className="mx-auto" style={{ width: "24rem" }}>
      <h1>News Hub</h1>
      <nav>
        {SiteList.map((site) => {
          return (
            <Link
              key={site.id}
              style={{ display: "block" }}
              to={`/${site.name}`}
            >
              {site.label}
            </Link>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
}
