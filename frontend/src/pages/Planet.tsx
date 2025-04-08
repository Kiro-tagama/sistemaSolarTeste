import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PropsPlanets, usePlanets } from "../hooks/usePlanets"

export function Planet() {
    const { id } = useParams()
    const { getByIdPlanets } = usePlanets()
    const [data, setData] = useState<PropsPlanets>()


    const getData = async () => {
        const planets = id && await getByIdPlanets(id)
        if (planets) setData(planets)
    }

    useEffect(() => {
        getData()
    }, [])


    return (<div>
        {data?.toString()}
    </div>)
}