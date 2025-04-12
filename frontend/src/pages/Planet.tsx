import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PropsPlanets, usePlanets } from "../hooks/usePlanets";
import { Link } from "react-router-dom";

export function Planet() {
  const { id } = useParams();
  const { getByIdPlanets } = usePlanets();
  const [data, setData] = useState<PropsPlanets>();

  const getData = async () => {
    const planet = id && (await getByIdPlanets(id));
    if (planet) setData(planet);
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!data) return <p style={{ padding: "2rem" }}>Loading planet data...</p>;

  return (
    <article>
      <Link to={"/home"}>
        <button>Voltar</button>
      </Link>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <img
          src={data.imageUrl}
          alt={data.name}
          style={{
            width: "100%",
            maxWidth: "24rem",
            borderRadius: "1rem",
            objectFit: "cover",
          }}
        />
        <div>
          <h1>{data.name}</h1>
          <ul>
            <li>
              <strong>Diameter:</strong> {data.diameter} km
            </li>
            <li>
              <strong>Rotation Period:</strong> {data.rotationPeriod}
            </li>
            <li>
              <strong>Distance from Sun:</strong> {data.distanceFromSun} million
              km
            </li>
            <li>
              <strong>Has Rings:</strong> {data.hasRings ? "Yes" : "No"}
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
