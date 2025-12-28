/* this new version is suited well for NW.js projects that use Ruffle as a swf player all the time.
it is made just for this purpose, so please support it */
(function () {
  if (window.__RUFFLE_INJECTED__) return;
  window.__RUFFLE_INJECTED__ = true;

  function inject() {
    // Already injected? then ill die LOL!
    if (window.RufflePlayer) return;

    const script = document.createElement("script");
    script.src = "node_modules/@ruffle-rs/ruffle/ruffle.js";
    script.defer = true;

    script.onload = () => {
      console.log("[NWRuffle] ruffle.js injected");
      console.log("[NWRuffle] UNSUPPORTED VERSION WARNING: This verison of NWRuffle may lag/crash/break. its using Ruffle Nightly 0.2.0");
    };

    script.onerror = () => {
      console.error("[NWRuffle] FAILED to load ruffle.js");
      console.error("[NWRuffle] im sorry i know im stupid but please make sure you have @ruffle-rs/ruffle installed in your project dependencies. - yours truly, Anikthedev");
    };

    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
// finally the end now i can dance
// https://media.tenor.com/nFODQdUDbwoAAAAj/lerolero-dancing-cat.gif
