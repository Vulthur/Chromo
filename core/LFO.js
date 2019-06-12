/*jshint esversion: 6 */

/*
*   Simulate Low Frequencies Osc
*/
// - MAIN -
export default class LFO {
    /**
     * @param  {string} name
     * @param  {number} frequencie
     * @param  {string} form
     * @param  {number} amplitude
     */
    constructor(name, frequencie, form, amplitude) {      
        if (arguments.length !== 4) {
            throw new Error('Invalid constructor(name, frequencie, form, amplitude)');
        }

        // - CONTROLES -
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        if (typeof (frequencie) !== 'number')
            throw new Error('frequencie is not a number');

        if (typeof (form) !== 'string')
            throw new Error('form is not a string');
        
        if (typeof (amplitude) !== 'number')
            throw new Error('amplitude is not a number');

        // Create the 4 wave shapes
        this.functionForm = {
            "square": function(start, frequencie, amplitude, now){
                let periode = (1 / frequencie);
                let ellapsed = (now - start) / 1000;
                let x = ellapsed % periode;

                if (x > (periode / 2)){
                    return amplitude / 2;
                } else {
                    return -amplitude / 2;
                }
            },
            "sinus": function (start, frequencie, amplitude, now){
                let periode = ((2*Math.PI) / frequencie);
                let ellapsed = (now - start) / 1000;
                let x = ellapsed % periode;

                return (Math.sin(x) * (amplitude / 2));
            },
            "triangle": function (start, frequencie, amplitude, now){
                let periode = (1 / frequencie);
                let ellapsed = (now - start) / 1000;
                let x = ellapsed % periode;

                let x1, x2, y1, y2;
                if (0 <= x && x <= (periode / 4)){
                    x1 = 0;
                    y1 = 0;
                    x2 = periode / 4;
                    y2 = amplitude / 2;                    
                } else if ((periode / 4) < x && x < (periode / 2)) {
                    x1 = periode / 4;
                    y1 = amplitude / 2;
                    x2 = (periode / 2);
                    y2 = 0;
                } else if ((periode / 2) < x && x < ((periode / 4) * 3)){
                    x1 = (periode / 2);
                    y1 = 0;
                    x2 = (periode / 4) * 3;
                    y2 = -1 * (amplitude / 2);
                } else {
                    x1 = (periode / 4) * 3;
                    y1 = -1 * (amplitude / 2);
                    x2 = periode;
                    y2 = 0;
                }
                
                return (((y2 - y1) / (x2 - x1)) * (x - x1) + y1);

            },
            "saw": function (start, frequencie, amplitude, now){
                let periode = (1 / frequencie);
                let ellapsed = (now - start) / 1000;
                let x = ellapsed % periode;

                let x1 = 0;
                let y1 = amplitude / 2;
                let x2 = periode;
                let y2 = -amplitude / 2; 

                return (((y2 - y1) / (x2 - x1)) * (x - x1) + y1);
            },
        };

        if (this.functionForm[form] === undefined)
            throw new Error('form is not a existing square, sinus, triangle');

        // - CONSTRUCTION -
        this.name = name;
        this.frequencie = frequencie;
        this.amplitude = amplitude;
        this.form = form;
        
        this.start = 0;
        this.tempFreq = null;
    }

    init() {
        this.start = Date.now();
    }

    update() {}
    
    value() {
        return (this.functionForm[this.form](this.start, this.frequencie, this.amplitude, Date.now()));
    }
}