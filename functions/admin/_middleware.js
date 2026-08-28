export async function onRequest(context) {
  const { request, env } = context;
  const auth = request.headers.get("Authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");

    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [, password] = decoded.split(":");

      if (password === env.ADMIN_PASSWORD) {
        return context.next();
      }
    }
  }

  return new Response("Zugriff verweigert", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Bereich"',
    },
  });
}
