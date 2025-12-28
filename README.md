<p align="center">
  <img alt="Ruffle" src="NWRuffle.svg" /></a>
</p>

# NWRuffle
This NWRuffle project combines and helps you to add Ruffle support to your NW.js projects

## 📘 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Adding & Customizing Ruffle](#adding--customizing-ruffle)
- [Troubleshooting & Issues](#troubleshooting--issues)

## Overview

NWRuffle provides an easy way to add Ruffle support to your NW.js projects, Once set up, it automatically includes `ruffle.js` and allows you to do all the normal ruffle stuff

---

## Installation

1. **Download** the NWRuffle project files.
2. **Unzip** them inside your NW.js project directory.
3. In your NW.js `package.json`, add the following line **below** your `"main": "YourFileHere",` entry:

   ```json
   "inject_js_start": "bootstrap.js",
   ```
4. Add the ruffle dependency
```
"dependencies": {
  "@ruffle-rs/ruffle": "latest"
}
```
and installation done.

---

## Adding & Customizing ruffle
If you dont understand check index.json and package.json to understand it (i also reccomend checking and tinkering around the example that will be release and linked) ok now to the main part.
Ruffle must be included in your HTML.
Since NWRuffle handles script injection automatically, you only need to add the configuration and player container in your HTML file 
**Example Setup**
```
<div id="flash-content"></div>

<script>
  // Ruffle Configuration
  // Full options: https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configuration-options
  window.RufflePlayer = {
    config: {
      backgroundColor: '#000044', // Long-form hex value required
      showLoadingBar: false,
      showRuffleLogo: false,
      showSpinner: false,
      SWF: 'file.swf'
    }
  };

  function initialize() {
    document.body.style.background = window.RufflePlayer.config.backgroundColor;

    window.addEventListener('DOMContentLoaded', () => {
      const container = document.querySelector('#flash-content');
      const ruffle = window.RufflePlayer.newest();
      const player = ruffle.createPlayer();

      container.appendChild(player);
      player.ruffle().load(window.RufflePlayer.config.SWF);

      const rufflePlayer = document.querySelector('ruffle-player');
      const splashBackground = '--splash-screen-background: ' + window.RufflePlayer.config.backgroundColor;

      if (window.RufflePlayer.config.showRuffleLogo) {
        rufflePlayer.setAttribute('style', splashBackground);
      } else {
        rufflePlayer.setAttribute('style', '--logo-display: none;' + splashBackground);
      }

      if (!window.RufflePlayer.config.showLoadingBar) {
        rufflePlayer.shadowRoot.querySelector('.loadbar').style.display = 'none';
      }
      if (!window.RufflePlayer.config.showSpinner) {
        rufflePlayer.shadowRoot.querySelector('.loading-animation').style.display = 'none';
      }
    });
  }

  initialize();
</script>
```

# Troubleshooting & Issues
If you encounter issues:
 1. Ruffle-related issues:
    [Report Here](https://github.com/ruffle-rs/ruffle/issues)
 2. NW.js-related issues:
    [Report Here](https://github.com/nwjs/nw.js/issues)
 3. NWRuffle-specific issues or feature requests:
    [Report Here](https://github.com/Anikthedev-Official/NWRuffle/issues)

# Contributing
Contributions, suggestions, and improvements are always welcome!
Feel free to submit a pull request or open an issue.

### End
<p align="center"> Made with ❤️ by <a href="https://github.com/Anikthedev-Official">Anikthedev</a> </p> 
Special thanks:
dr.taco - helped me very much
agoknee - honest reviews
my brother - its for him that i wanted to code

