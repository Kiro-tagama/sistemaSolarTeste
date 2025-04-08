
export function Login() {

  const signIn = (e) => {
    console.log("login")
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
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />
        <button type="submit">
          Login
        </button>
      </form>
      <a href="#" data-tooltip="email: admin@solar.com | password: 123456">Esqueceu a senha?</a>
    </main>)
}