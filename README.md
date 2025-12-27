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
Just Download In the releases tab or [Here](https://github.com/Anikthedev-Official/NWRuffle/releases)
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
In package json and REMEMBER TO PUT THIS IN THE MIDDLE OF
```
"main": "YourFileHere",
```
and
```
"inject_js_start": "bootstrap.js",
```
so and the example of the ruffle things should be 
```
  "ruffle": {
    "pages": {
      "index.html": {
        "enabled": true,
        "swf": "file.swf",
        "width": 800,
        "height": 600,
        "layout": "center",
        "background": "black",
        "scale": "showAll"
      },
      "game.html": {
        "enabled": true,
        "swf": "gile.swf",
        "width": 1024,
        "height": 768,
        "layout": "custom",
        "x": 100,
        "y": 50,
        "background": "gray",
        "scale": "showAll"
      }
    }
  }
```
so 
```
"ruffle": {
// the stuff here
}
```
is the main part
and 
```
"pages": {
// pages here
}
```
is the pages
and by 
```
"index.html": {
// contents here
}
```
 and stuff you know what its for and 
```
"enabled": true,
```
is to is it enabled or not 
and 
```
"swf": "file.swf",
```
 is the swf file of the page
and
```
        "width": 800,
        "height": 600,
```
is the width and height man
BUT!
```
"layout": "center",
```
has three modes! 
there is 
```
"fullscreen"
```
```
"center"
```
```
"custom"
```
and thats IT!
```
"x": Number,
```
is the x position of the box 
```
"y": Number,
```
is the y position of the box 
and  
```
       "background": "black",
        "scale": "showAll"
```
 is just there .
 so together an good package.json for this would be
 ```
{
  "name": "nw-ruffle-player",
  "main": "index.html",
   "ruffle": {
    "pages": {
      "index.html": {
        "enabled": true,
        "swf": "file.swf",
        "width": 800,
        "height": 600,
        "layout": "center",
        "background": "black",
        "scale": "showAll"
      },
      "test.html": {
        "enabled": true,
        "swf": "gile.swf",
        "width": 1024,
        "height": 768,
        "layout": "custom",
        "x": 100,
        "y": 50,
        "background": "gray",
        "scale": "showAll"
      }
    }
  },
  
  "inject_js_start": "bootstrap.js",

  "window": {
    "width": 1000,
    "height": 900
  }
}
```
# end
remember you cant actually edit the bootstrap.js its obfuscated bai!!!!!!!
