import { Link, Outlet } from "react-router-dom";

const CategoryList = [
  { id: 0, name: "all", label: "All" },
  { id: 1, name: "national", label: "National" },
  { id: 2, name: "business", label: "Business" },
  { id: 3, name: "sports", label: "Sports" },
  { id: 4, name: "world", label: "World" },
  { id: 5, name: "politics", label: "Politics" },
  { id: 6, name: "technology", label: "Technology" },
  { id: 7, name: "startup", label: "Startup" },
  { id: 8, name: "entertainment", label: "Entertainment" },
  { id: 9, name: "miscellaneous", label: "Miscellaneous" },
  { id: 10, name: "hatke", label: "Hatke" },
  { id: 11, name: "science", label: "Science" },
  { id: 12, name: "automobile", label: "Automobile" },
];

export default function Inshorts() {
  return (
    <div>
      <h2>Inshorts News</h2>
      <nav>
        {CategoryList.map((category) => {
          return (
            <Link
              style={{ display: "block" }}
              key={category.id}
              to={`/Inshorts/${category.name}`}
            >
              {category.label}
            </Link>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
}
