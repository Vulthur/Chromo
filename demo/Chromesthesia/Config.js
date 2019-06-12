/*jshint esversion: 6 */

// - IMPORTS -
import KeyCode from '../../core/KeyCode.js';
import KeyNumber from '../../core/KeyNumber.js';

// - MAIN -
export default {
    'beat': (1 / (110 / 60)) * 1000,
    'defaultVelocity': 96,
    'defaultMidiChannel': 0,
    'keyCodeNextScene': KeyCode.SPACEBAR,
    'keyCodeReset': KeyCode.ENTER,
    'midiNextScene': 81,
    'midiReset': 83,
    'midiResetData': [145, 83, 10],
    'midiType': {
        'noteOn': 144,
        'noteOff': 128,
        'CC': 176,
    },
    'propContainer': [
        'alpha',
        'rotation',
        'scale',
        'position',
        'pivot',
        'anchor',
        'skew',
        'visible',
    ],
    'drumKit': {
        'kick': {
            'midi': KeyNumber.C3,
            'keyCode': KeyCode.K
        },
        'snare': {
            'midi': KeyNumber.Cd3,
            'keyCode': KeyCode.L
        },
        'hihat': {
            'midi': KeyNumber.D3,
            'keyCode': KeyCode.I
        },
        'hihatc': {
            'midi': KeyNumber.Dd3,
            'keyCode': KeyCode.O
        }
    },
    'keyboardBass': {
        'keyC' : {
            'midi': KeyNumber.C4,
            'keyCode': KeyCode.Z
        },
        'keyCd': {
            'midi': KeyNumber.Cd4,
            'keyCode': KeyCode.S
        },
        'keyD': {
            'midi': KeyNumber.D4,
            'keyCode': KeyCode.X
        },
        'keyDd': {
            'midi': KeyNumber.Dd4,
            'keyCode': KeyCode.D
        },
        'keyE': {
            'midi': KeyNumber.E4,
            'keyCode': KeyCode.C
        },
        'keyF': {
            'midi': KeyNumber.F4,
            'keyCode': KeyCode.V
        },
        'keyFd': {
            'midi': KeyNumber.Fd4,
            'keyCode': KeyCode.G
        },
        'keyG': {
            'midi': KeyNumber.G4,
            'keyCode': KeyCode.B
        },
        'keyGd': {
            'midi': KeyNumber.Gd4,
            'keyCode': KeyCode.H
        },
        'keyA': {
            'midi': KeyNumber.A4,
            'keyCode': KeyCode.N
        },
        'keyAd': {
            'midi': KeyNumber.Ad4,
            'keyCode': KeyCode.J
        },
        'keyB': {
            'midi': KeyNumber.B4,
            'keyCode': KeyCode.M
        }
    },
    'keyboardLead': {
        'keyC' : {
            'midi': KeyNumber.C5,
            'keyCode': KeyCode.Q
        },
        'keyCd': {
            'midi': KeyNumber.Cd5,
            'keyCode': KeyCode.NUM2
        },
        'keyD': {
            'midi': KeyNumber.D5,
            'keyCode': KeyCode.W
        },
        'keyDd': {
            'midi': KeyNumber.Dd5,
            'keyCode': KeyCode.NUM3
        },
        'keyE': {
            'midi': KeyNumber.E5,
            'keyCode': KeyCode.E
        },
        'keyF': {
            'midi': KeyNumber.F5,
            'keyCode': KeyCode.R
        },
        'keyFd': {
            'midi': KeyNumber.Fd5,
            'keyCode': KeyCode.NUM5
        },
        'keyG': {
            'midi': KeyNumber.G5,
            'keyCode': KeyCode.T
        },
        'keyGd': {
            'midi': KeyNumber.Gd5,
            'keyCode': KeyCode.NUM6
        },
        'keyA': {
            'midi': KeyNumber.A5,
            'keyCode': KeyCode.Y
        },
        'keyAd': {
            'midi': KeyNumber.Ad5,
            'keyCode': KeyCode.NUM7
        },
        'keyB': {
            'midi': KeyNumber.B5,
            'keyCode': KeyCode.U
        },
    },
    'knobs': {
        'knob1': {
            'midi': '22'
        },
        'knob2': {
            'midi': '23'
        },
        'knob3': {
            'midi': '24'
        },
        'knob4': {
            'midi': '25'
        },
    },
    'pads': {
        'pad1': {
            'midi': '20'
        }
    },
    'switchs': {
        'switch1': {
            'midi': '21'
        }
    }
};