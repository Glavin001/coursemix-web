import Ember from 'ember';

export function numberWithDigits(props) {
    var myNumber = props[0];
    var digits = props[1];

    if (digits !== 2) {
        throw new Error('Only 2 digits is currently supported. Cannot use '+digits+' digits.');
    }
    return ("0" + myNumber).slice(-2);
}

export default Ember.HTMLBars.makeBoundHelper(numberWithDigits);