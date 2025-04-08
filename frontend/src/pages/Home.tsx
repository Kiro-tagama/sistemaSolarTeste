import { useContext, useEffect, useState } from "react"
import { PropsPlanets, usePlanets } from "../hooks/usePlanets"
import { AuthContext } from "../context/auth";
import { FormNewPlanet } from "../component/FormNewPlanet";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)!;
    const { getAllPlanets } = usePlanets()
    const [data, setData] = useState<PropsPlanets[] | null>(null)
    const [query, setQuery] = useState<string>('')
    const [modal, setModal] = useState<boolean>(false)

    const getData = async () => {
        const planets = await getAllPlanets()
        if (planets) setData(planets)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <main>
            <article style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0 }}>user: {user?.email}</p>
                <button onClick={() => setModal(true)}>New Planet</button>
            </article>
            <FormNewPlanet open={modal} setOpen={setModal} />
            <input
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <div>
                {data == null ? <div aria-busy="true" style={{ margin: "2rem" }} /> :
                    data?.map((item: PropsPlanets, index: number) =>
                        <article key={index} onClick={() => navigate('/planet/' + item._id)} style={{ width: "min-content" }}>
                            <img src={item.imageUrl} alt="" style={{ maxWidth: "20rem", objectFit: "cover" }} />
                            <h3>{item.name}</h3>
                        </article>)
                }
            </div>
        </main>
    )
}