const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;
const ROOT = process.cwd();
// drink coffee when coding
const MIME = {
  ".html": "text/html", // most important one
  ".js": "application/javascript", // yes, js
  ".json": "application/json", // why not
  ".css": "text/css", // you seriously want css?
  ".swf": "application/x-shockwave-flash", // for flash of course
  ".wasm": "application/wasm", // ruffle uses this
  ".mp3": "audio/mpeg",// everyone loves mp3
  ".wav": "audio/wav", // for better audio (and bloated too)
  ".mp4": "video/mp4", // video man, video!
  ".webp": "image/webp", // stupid webp
  ".webm": "video/webm", // stupid webm
  ".gif": "image/gif", // cat gifs please!
  ".xml": "application/xml", // for some flash thing for sure for sure for sure for other stuff
  ".txt": "text/plain", // plain text, nothing fancy
  ".php": "application/x-httpd-php", // why would you even need this?
  ".exe": "application/vnd.microsoft.portable-executable", // eww
  ".psd": "image/vnd.adobe.photoshop", // ew ew ew ew ew ew ew ew ew ew there are free options you know?
  ".zip": "application/zip", // compressed stuff :3
  ".ttf": "font/ttf", // fonts!
  ".oft": "font/oft", // MORE FONTS!
  ".ttfc": "font/collection", // EVEN MORE FONTS!
  ".png": "image/png", // co- no.
  ".jpg": "image/jpeg", // ew jpeg
  ".svg": "image/svg+xml", // vector images, YEAH BABY!
  ".woff": "font/woff", // web fonts? what are those?
  ".woff2": "font/woff2", // again?, what are those?
  /* add more if you want but considering this is for ruffle, this should be enough.
   BUT! if you add more, make sure to follow the format! and add comments and make a pull request to github */
  ".md": "text/markdown" // i forgot this one but here it is but please add your stuff on top and under .ttfc
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html"; // if your main html file is named differently, change this

  const filePath = path.join(ROOT, urlPath);

  // FR?
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": type,
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cache-Control": "no-cache"
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[NWRuffle Server] Local server running at http://localhost:${PORT}`); // yippe its the server
});
