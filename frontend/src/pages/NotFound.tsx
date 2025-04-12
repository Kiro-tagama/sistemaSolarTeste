export function NotFound() {
  return (
    <div style={{ height: "90vh", display: "flex", justifyContent: "center" }}>
      <article
        style={{
          margin: "auto 0",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          padding: "4rem",
        }}
      >
        <h1>404</h1>
        <a href="/">Voltar</a>
      </article>
    </div>
  );
}
