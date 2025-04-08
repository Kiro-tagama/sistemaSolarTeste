import { useContext } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";

export interface PropsPlanets {
    id?: string;
    name: string;
    diameter: number;
    rotationPeriod: string;
    distanceFromSun: number;
    hasRings: boolean;
    imageUrl: string;
}

const apiUrl = import.meta.env.VITE_API_URL;
export function usePlanets() {
    const { user } = useContext(AuthContext)!;

    const config = {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    };

    const getAllPlanets = async () =>
        axios.get(`${apiUrl}/planets`, config).then(res => res.data);

    const getByIdPlanets = async (id: string) =>
        axios.get(`${apiUrl}/planets/${id}`, config).then(res => res.data);

    const addPlanets = async (data: PropsPlanets) =>
        axios.post(`${apiUrl}/planets`, data, config).then(res => res.data);

    return {
        getAllPlanets,
        getByIdPlanets,
        addPlanets,
    };
}