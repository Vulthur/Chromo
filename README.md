# CHROMO
Application builded for Vjing some drawings of a friend and play live music.
Result on Vimeo : https://vimeo.com/318985508

The project is in the demo folder.
My midi controller send midi to the app which send midi to Ableton.
The app is also recveiving midi (drum) from ableton.

I'm using this software a windows https://www.tobias-erichsen.de/software/loopmidi.html to simulate a midi connection
beetween ableton and my app.

Midi API is only implemented in Chrome.
This project is for desktop use, actually neither optimisation for the web have been made.
Just deploy on a local server an browse to : http://localhost/demo/Chromesthesia/.

The documention is really minimalist just contact my if you need help.

The mains goals were :
* Improve skill in js.
* Learning more about ES6/7/8/9.
* Linking music, animation and web programming in one project.
* Help a friend.
* Maybe make other vjing for other bands.

## Built With
### Javascript libraries
* http://www.pixijs.com/
* http://pixijs.github.io/pixi-particles-editor/#

### Tools
* https://www.ableton.com/ version 9
* https://www.jslint.com/

# TODO
* Solve LFO  problem when linked to a knob, only change the value when it's at the origine
* MIDI clock
    Create a Clock class
    Receving the beat via midi
    allow access to the current timing  
* Animations
    order notion -> choose next function
    original properties on an animation ?
    define list of properties animable
    propAnimation {
        alpha
        rotation
        scale
        position
        pivot
        anchor 
        skew
        visible   
    }
    stepAnimation => animate one parameter element controle
* Link propContainer to animable variable ?
* Create a Keyboard class OR in MidiElement
    ** Handle multiple Keys
    ** Mono/Poly
    ** Mono (lastTouch, higher note, lower note)
* for transition scene should take an array of animation and manage to animate any elements of the scene
* Improve keyboard event handler, create a class OR create a class Controller with midi + keyboard.
* Improve error handling and design for error.
* For knob think about a way to handle them with a real keyboard
* Think about loader for a web version.
    PIXI.loader()
    Audio loader()
* Scarab project :
    Just one scene with Kiri drawing and audio from webbrowser.
    Do a node project with webpack.
* JSDoc on the core, improve the doc with optionnal parameters
* Learn JEST and use it on this project
* Think about aftertouch
* Think of different kind of knob (start value, endless, ...)