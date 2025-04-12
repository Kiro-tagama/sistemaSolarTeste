import { useContext, useEffect, useState } from "react";
import { PropsPlanets, usePlanets } from "../hooks/usePlanets";
import { AuthContext } from "../context/auth";
import { FormNewPlanet } from "../components/FormNewPlanet";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)!;
  const { getAllPlanets } = usePlanets();
  const [data, setData] = useState<PropsPlanets[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const getData = async () => {
    const planets = await getAllPlanets();
    if (planets) setData(planets);
  };

  useEffect(() => {
    getData();
  }, [modal]);

  return (
    <main>
      <article
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0 }}>user: {user?.email}</p>
        <button onClick={() => setModal(true)}>Novo planeta</button>
      </article>
      <br />
      <FormNewPlanet open={modal} setOpen={setModal} />
      <input
        type="search"
        name="search"
        placeholder="Buscar planeta"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {data == null ? (
          <div aria-busy="true" style={{ margin: "2rem" }} />
        ) : (
          data
            ?.filter((item) =>
              item.name.toLowerCase().includes(query.toLowerCase())
            )
            .map((item: PropsPlanets, index: number) => (
              <article
                key={index}
                className="planeta-card"
                onClick={() => navigate(`/planet/${item._id}`)}
                style={{
                  margin: 0,
                  background: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: "600px",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt=""
                  style={{ maxWidth: "100%", objectFit: "cover" }}
                />
                <h3 style={{ margin: "1rem 0" }}>{item.name}</h3>
              </article>
            ))
        )}
      </div>
    </main>
  );
}
