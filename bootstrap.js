// im seriously tired of seeing other people's console logs when im debugging, but i want to discontinue this script but still keep my console clean
(function filterConsole() {
  const real = window.console;
  function allow(args) {
    return args.length && typeof args[0] === "string" && args[0].startsWith("[NWRuffle]", "[NWRuffle Server]");
  }
  ["log", "info", "warn", "error"].forEach(method => {
    const orig = real[method].bind(real);
    real[method] = (...args) => { if (allow(args)) orig(...args); };
  });
})();


(function () {
  const fs = require("fs");
  const path = require("path");
  const NAME = "[NWRuffle]"; // name, NAME!!!


  const pkgPath = path.join(process.cwd(), "package.json"); // get PACKAGE.JSON
  let cfgAll = {};
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    cfgAll = pkg.ruffle || {};
  } catch (e) {
    console.log(`${NAME} package.json not found or invalid`);
    return;
  }


  const pageName = path.basename(window.location.pathname);
  const cfg = cfgAll.pages?.[pageName];

  if (!cfg) {
    console.log(`${NAME} no Ruffle config for this page (${pageName})`); // YES YES YES YES YES YES YES YES YES!!!
    return;
  }


  function detectRuffleVersion() {
    try {
      const rufflePkg = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "ruffle", "package.json"), "utf8")
      );
      return rufflePkg.version || "unknown";
    } catch {
      return "unknown";
    }
  }
  const RUFFLE_VERSION = detectRuffleVersion();


  try { require("./server.js"); } catch (_) {}


  const raf = requestAnimationFrame;
  const waitFor = (c, f) => (c() ? f() : raf(() => waitFor(c, f)));

  function loadRuffle(cb) {
    if (window.RufflePlayer) return cb();
    const s = document.createElement("script");
    s.src = "http://localhost:8080/ruffle/ruffle.js"; // this is where you GET RUFFLE FROM !!!
    s.onload = cb;
    document.head.appendChild(s);
  }

  function createContainer(cfg) { // yes yes never ask
    const div = document.createElement("div");
    div.id = "ruffle-container";
    document.body.appendChild(div);
    return div;
  }

  function applyLayout(el, cfg) { // this makes my eyes burn
    el.style.position = "fixed";
    el.style.background = cfg.background || "black";
    el.style.overflow = "hidden";

    if (cfg.layout === "center") {
      el.style.width = cfg.width + "px";
      el.style.height = cfg.height + "px";
      el.style.left = "50%";
      el.style.top = "50%";
      el.style.transform = "translate(-50%, -50%)";
    } else if (cfg.layout === "custom") {
      el.style.width = cfg.width + "px";
      el.style.height = cfg.height + "px";
      el.style.left = (cfg.x || 0) + "px";
      el.style.top = (cfg.y || 0) + "px";
    } else {
      el.style.inset = "0";
    }
  }


  function initRuffle(cfg) { // can i scream now 
    waitFor(() => window.RufflePlayer && document.body, () => {
      const container = createContainer(cfg);
      applyLayout(container, cfg);

      const ruffle = RufflePlayer.newest();
      const player = ruffle.createPlayer();

      Object.assign(player.style, {
        width: "100%",
        height: "100%",
        display: "block"
      });

      player.config = {
        scale: cfg.scale || "showAll",
        backgroundColor: cfg.background
      };

      container.appendChild(player);
      player.load(`http://localhost:8080/${cfg.swf || "(none)"}`);
      console.log(`${NAME} SWF loaded: ${cfg.swf}`); // you didnt ask but its here

      container.RuffleAPI = {
        setLayout(l) { cfg.layout = l; applyLayout(container, cfg); },
        setSize(w, h) { cfg.width = w; cfg.height = h; applyLayout(container, cfg); },
        fullscreen() { cfg.layout = "fullscreen"; applyLayout(container, cfg); }
      };
    });
  }

  waitFor(() => document.body, () => { // atleast they work
    if (!cfg.enabled) {
      console.log(`${NAME} disabled for this page`);
      console.log(`${NAME} SWF configured: ${cfg.swf || "(none)"}`);
      console.log(`${NAME} Ruffle version: ${RUFFLE_VERSION}`);
      return;
    }

    console.log(`${NAME} enabled (Ruffle: loading...)`);
    console.log(`${NAME} SWF configured: ${cfg.swf || "(none)"}`);
    console.log(`${NAME} Ruffle version: ${RUFFLE_VERSION}`);

    loadRuffle(() => initRuffle(cfg)); // finally load ruffle then i kill myself
  });
})();
