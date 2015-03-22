import Ember from 'ember';

export function jsonStringify(props) {
    var obj = props[0];

    if (typeof obj === "object") {
        return JSON.stringify(obj);
    } else {
        return obj;
    }
}

export default Ember.HTMLBars.makeBoundHelper(jsonStringify);