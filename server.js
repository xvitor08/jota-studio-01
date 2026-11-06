// Servidor estático em Node.js puro (sem dependências), igual ao do Meu Doce.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  const arquivo = path.join(ROOT, path.normalize(urlPath));
  // Segurança: não deixa sair da pasta do projeto
  if (!arquivo.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Acesso negado");
  }
  // Não expõe arquivos internos do servidor
  const nome = path.basename(arquivo);
  if (nome === "server.js" || nome === "package.json") {
    res.writeHead(404);
    return res.end("Não encontrado");
  }

  fs.readFile(arquivo, (erro, dados) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Página não encontrada");
    }
    const tipo = TIPOS[path.extname(arquivo).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": tipo, "Cache-Control": "public, max-age=3600" });
    res.end(dados);
  });
});

server.listen(PORT, "0.0.0.0", () => console.log("Jota Studio rodando na porta " + PORT));
