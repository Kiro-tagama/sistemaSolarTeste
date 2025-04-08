import { useContext, useState } from "react"
import { AuthContext } from "../context/auth"
import { useNavigate } from "react-router-dom"

export function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;
  const [loadin, setLoading] = useState<boolean>(false)

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    setLoading(true)

    await login({ email, password })
      .then(() => navigate("/home"))
      .catch(err => console.log("err " + err))
      .finally(() => setLoading(false))
  }

  return (
    <main style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh", padding: "2rem" }}>
      <h1>Sign in</h1>
      <form style={{ maxWidth: "25rem" }} onSubmit={signIn}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
          disabled={loadin}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
          disabled={loadin}
        />
        <button type="submit" disabled={loadin} aria-busy={loadin}>
          Login
        </button>
      </form>
      <a href="#" data-tooltip="email: admin@solar.com | password: 123456">Esqueceu a senha?</a>
    </main>)
}