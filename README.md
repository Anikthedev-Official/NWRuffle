<p align="center">
  <img alt="Ruffle" src="NWRuffle.svg" /></a>
</p>

# NWRuffle
This NWRuffle project combines and helps you to add Ruffle support to your NW.js projects

# Browse
* [Issues/What You Want](#issues)
* [Installing NWRuffle](#installing-nwruffle)
* [Adding And Customizing ruffle](#adding-ruffle)


# Issues 
What setup i have here you should not see any issues but if you do have issues in ruffle go to [Here](https://github.com/ruffle-rs/ruffle/issues)
And with NW.js go to [Here](https://github.com/nwjs/nw.js/issues)
But if you Want something or REALLY have some issues You can just go [Here](https://github.com/Anikthedev-Official/NWRuffle/)

# Install NWRuffle
Just Download the project files
and go to your NW.js project and unzip the folder there and add this below your 
```
"main": "YourFileHere",
```
so below it add this line 
```
"inject_js_start": "bootstrap.js",
```
Thats it and the Ruffle part
# Adding ruffle
add it in html now no more package.json
like here is an example code
```
    <script>
      // Settings
      // https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configuration-options
      window.RufflePlayer = {
        config: {
          // Must be longform hex value
          backgroundColor: '#000044',
          showLoadingBar: false,
          showRuffleLogo: false,
          showSpinner: false,
          SWF: 'file.swf'
        }
      };

      function initialize () {
        document.body.style.background = window.RufflePlayer.config.backgroundColor;
        window.addEventListener('DOMContentLoaded', () => {
          const container = document.querySelector('.flash-content');
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
            rufflePlayer.shadowRoot.querySelector('.loadbar')
              .setAttribute('style', 'display: none');
          }
          if (!window.RufflePlayer.config.showSpinner) {
            rufflePlayer.shadowRoot.querySelector('.loading-animation')
              .setAttribute('style', 'display: none');
          }
        });
      }

      initialize();
    </script>
```
and dont worry the ruffle.js is added automatically