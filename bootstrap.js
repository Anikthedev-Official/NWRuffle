/* this new version is suited well for NW.js projects that use Ruffle as a swf player all the time.
it is made just for this purpose, so please support it */

(function () {
  if (window.NWRuffle) return;

  const NWRuffle = {
    main: null,
    player: null,
    containerEl: null,
    lastSWF: null,

    initialize(cb) {
      function wait() {
        if (window.RufflePlayer) {
          NWRuffle.main = window.RufflePlayer.newest();
          cb && cb();
        } else {
          requestAnimationFrame(wait);
        }
      }
      wait();
    },

    container(id) {
      const el = document.getElementById(id);
      if (!el) {
        console.error("[NWRuffle] container not found:", id);
        return;
      }
      NWRuffle.containerEl = el;
    },

    swap(swf) {
      if (!NWRuffle.player) {
        console.error("[NWRuffle] no player to swap");
        return;
      }
      NWRuffle.lastSWF = swf;
      NWRuffle.player.load(swf);
      console.log("[NWRuffle] SWF swapped:", swf);
    },

    destroy() {
      if (NWRuffle.player) {
        NWRuffle.player.remove();
        NWRuffle.player = null;
        console.log("[NWRuffle] destroyed");
      }
    },

    reinstate() {
      if (!NWRuffle.containerEl) {
        console.error("[NWRuffle] reinstate failed: no container");
        return;
      }

      if (!NWRuffle.lastSWF) {
        console.error("[NWRuffle] reinstate failed: no previous SWF");
        return;
      }

      NWRuffle.initialize(() => {
        NWRuffle.player = NWRuffle.main.createPlayer();

        Object.assign(NWRuffle.player.style, {
          width: "100%",
          height: "100%",
          display: "block"
        });

        NWRuffle.containerEl.appendChild(NWRuffle.player);
        NWRuffle.player.load(NWRuffle.lastSWF);

        console.log("[NWRuffle] reinstated:", NWRuffle.lastSWF);
      });
    },

    fullscreen() {
      if (!NWRuffle.containerEl) return;
      NWRuffle.containerEl.requestFullscreen?.();
    },

    setSize(w, h) {
      if (!NWRuffle.containerEl) return;
      NWRuffle.containerEl.style.width = w + "px";
      NWRuffle.containerEl.style.height = h + "px";
    }
  };

  function injectRuffle() {
    if (window.RufflePlayer) return;

    const script = document.createElement("script");
    script.src = "node_modules/@ruffle-rs/ruffle/ruffle.js";
    script.defer = true;

    script.onload = () => {
      console.log("[NWRuffle] ruffle.js injected");
      console.log("[NWRuffle] UNSUPPORTED VERSION WARNING: using Ruffle Nightly");
    };

    script.onerror = () => {
      console.error("[NWRuffle] FAILED to load ruffle.js");
      console.error("[NWRuffle] install @ruffle-rs/ruffle in dependencies");
    };

    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectRuffle);
  } else {
    injectRuffle();
  }

  window.NWRuffle = NWRuffle;
})();

// finally the end now i can dance
// https://media.tenor.com/nFODQdUDbwoAAAAj/lerolero-dancing-cat.gif
