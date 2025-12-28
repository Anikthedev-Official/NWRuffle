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
  ".jpeg": "image/jpeg", // ew jpeg 1
  ".bmp": "image/bmp", // i have free time ok?
  ".tiff": "image/tiff", // just learned about this one
  ".tif": "image/tiff", // just learned about this one too
  ".ico": "image/x-icon", // favicons and stuff i guess
  ".cur": "image/x-icon", // this WAS NOT nessesary but here we are
  ".avif": "image/avif", // where the FUCK do these come from
  ".heif": "image/heif", // another image format that i dont care about 
  ".heic": "image/heic", // yet another image format that i dont care about
  ".jp2": "image/jp2", // OOOOLD i think
  ".jxl": "image/jxl", // JPEG NEEDS TO STOP
  ".pam": "image/x-portable-anymap", // nu.
  ".pbm": "image/x-portable-bitmap", // twins
  ".pgm": "image/x-portable-graymap", // more twins
  ".ppm": "image/x-portable-pixmap", // even more twins
  ".pnm": "image/x-portable-anymap", // last twins
  ".pcx": "image/x-pcx", // PCX image format but last twins i swear
  ".tga": "image/x-tga", // *cough*
  ".iff": "image/iff", // asdg fhkdjhgsdjkghljhjlkfsliysgui ainuagufhjnhafj hgfhn ff ,anj,fnjgkhl dfshl hgsf,njf,k sagjlk harsghufsjdfhnb sd,k jdfgksdfgsjhksdf sfhgsf sfh,jhfjsfgj 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
  ".ras": "image/x-cmu-raster", // CMU Raster image format, what even is this
  ".sgi": "image/x-sgi", // SGI image format, what even is this too
  ".rgb": "image/x-rgb", // RGB image format, the lights? rgb lights?
  "xbm": "image/x-xbitmap", // X BitMap, what even is this either
  ".xpm": "image/x-xpixmap", // X PixMap, are you serious?
  ".wbmp": "image/vnd.wap.wbmp", // Wireless Bitmap, seriously????
  ".sun": "image/x-sun-raster", // THE SUN
  ".pct": "image/pict", // die die die die die
  ".pict": "image/pict", // die die die die die die
  ".img": "image/img", // image image format ofc
  ".apng": "image/apng", // pngs but cooler
  ".mng": "video/x-mng", // beans
  ".fli": "video/x-fli", // adding a p makes it flip
  ".flc": "video/x-flc", // *insert anything here*
  ".ani": "application/x-navi-animation", // animated cursors i think
  ".svgz": "image/svg+xml", // svgs but cooler i think
  ".pdf": "application/pdf", // documents and i think im done now
  ".png": "image/png", // co- no.
  ".jpg": "image/jpeg", // ew jpeg 2
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
