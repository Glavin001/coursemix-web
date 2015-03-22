import Ember from 'ember';

export function formatDate(props) {
    var datetime = props[0];
    var format = props[1];

    if (moment) {
        return moment(datetime).format(format);
    } else {
        return datetime;
    }
}

export default Ember.HTMLBars.makeBoundHelper(formatDate);