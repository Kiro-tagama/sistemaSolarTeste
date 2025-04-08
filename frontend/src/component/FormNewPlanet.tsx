import { PropsPlanets, usePlanets } from "../hooks/usePlanets";

export function FormNewPlanet({ open, setOpen }: { open: boolean, setOpen: (e: boolean) => void }) {
    const { addPlanets } = usePlanets();

    async function newPlanet(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data: PropsPlanets = {
            name: formData.get("name") as string,
            diameter: Number(formData.get("diameter")),
            rotationPeriod: formData.get("rotationPeriod") as string,
            distanceFromSun: Number(formData.get("distanceFromSun")),
            hasRings: formData.get("hasRings") === "on", // checkbox
            imageUrl: formData.get("imageUrl") as string,
        };

        try {
            await addPlanets(data);
            form.reset(); // limpa os campos
            alert("Planeta criado com sucesso!");
        } catch (err) {
            console.error("Erro ao criar planeta:", err);
            alert("Erro ao criar planeta.");
        }
    }

    return (
        <dialog open={open}>
            <article>
                <header>
                    <button aria-label="Close" rel="prev" onClick={() => setOpen(false)} />
                    <p><strong>New Planet</strong></p>
                </header>
                <form onSubmit={newPlanet}>
                    <input type="text" name="name" placeholder="Name" required />
                    <input type="number" name="diameter" placeholder="Diameter" required />
                    <input type="text" name="rotationPeriod" placeholder="Rotation Period" required />
                    <input type="number" name="distanceFromSun" placeholder="Distance from Sun" required />
                    <label style={{ marginBottom: "18px" }}>
                        <input type="checkbox" name="hasRings" />
                        Has Rings
                    </label>
                    <input type="url" name="imageUrl" placeholder="Image URL" required />
                    <button type="submit">Criar</button>
                </form>
            </article>
        </dialog>
    );
}
