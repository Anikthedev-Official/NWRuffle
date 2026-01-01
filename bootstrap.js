(function () {
  if (window.NWRuffle) return;

  const NWRuffle = {
    main: null,
    containerEl: null,
    lastSWF: null,


    player: {
      __real: null,

      load(swf) {
        if (!NWRuffle.main) {
          console.error("[NWRuffle] not initialized");
          return;
        }

        if (!NWRuffle.containerEl) {
          console.error("[NWRuffle] container not set");
          return;
        }

        NWRuffle.lastSWF = swf;
        NWRuffle._ensurePlayer();
        NWRuffle.player.__real.load(swf);

        console.log("[NWRuffle] SWF loaded:", swf);
      }
    },



    initialize(cb) {
      const wait = () => {
        if (window.RufflePlayer) {
          NWRuffle.main = window.RufflePlayer.newest();
          cb && cb();
        } else {
          requestAnimationFrame(wait);
        }
      };
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

    _ensurePlayer() {
      if (NWRuffle.player.__real) return;

      const player = NWRuffle.main.createPlayer();
      NWRuffle.player.__real = player;

      Object.assign(player.style, {
        width: "100%",
        height: "100%",
        display: "block"
      });

      NWRuffle.containerEl.appendChild(player);
    },

 

    swap(swf) {
      if (!NWRuffle.player.__real) {
        console.warn("[NWRuffle] swap called before load");
        NWRuffle.player.load(swf);
        return;
      }
      NWRuffle.lastSWF = swf;
      NWRuffle.player.__real.load(swf);
      console.log("[NWRuffle] SWF swapped:", swf);
    },

    destroy() {
      if (!NWRuffle.player.__real) return;
      NWRuffle.player.__real.remove();
      NWRuffle.player.__real = null;
      console.log("[NWRuffle] player destroyed");
    },

    reinstate() {
      if (!NWRuffle.lastSWF) {
        console.error("[NWRuffle] no previous SWF to reinstate");
        return;
      }
      NWRuffle.destroy();
      NWRuffle.player.load(NWRuffle.lastSWF);
    },



    fullscreen() {

      if (typeof nw !== "undefined" && nw.Window) {
        const win = nw.Window.get();
        win.enterFullscreen();
        return;
      }


      NWRuffle.containerEl?.requestFullscreen?.();
    },
        what() {
      Object.assign(NWRuffle.player.style, {
        width: "10%",
        height: "10%",
        display: "block"
      });
    },

    exitFullscreen() {

      if (typeof nw !== "undefined" && nw.Window) {
        const win = nw.Window.get();
        win.leaveFullscreen();
        return;
      }


      document.exitFullscreen?.();
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
      console.log("[NWRuffle] ruffle.js loaded (nightly)");
    };

    script.onerror = () => {
      console.error("[NWRuffle] failed to load ruffle.js");
      console.error("[NWRuffle] install @ruffle-rs/ruffle");
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
