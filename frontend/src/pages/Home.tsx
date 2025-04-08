import { useContext, useEffect, useState } from "react"
import { PropsPlanets, usePlanets } from "../hooks/usePlanets"
import { AuthContext } from "../context/auth";
import { FormNewPlanet } from "../component/FormNewPlanet";

export function Home() {
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
                    data?.map((item: PropsPlanets, index: number) => <article key={index}></article>)
                }
            </div>
        </main>
    )
}