import BaseModel from './base';
import config from '../config/environment';

var CoursesModel = BaseModel.extend({

});

CoursesModel.reopenClass({
    _endpoint: "courses",

    subjects: function() {

        var self = this;
        console.log('subjects', config, this);

        var modelName = self._endpoint;
        console.log('modelName', modelName);
        if (!modelName) {
            return [];
        }

        return DS.PromiseArray.create({
            promise: $.getJSON(config.APP.apiHost + '/api/' +
                    modelName + "/subjects")
                .then(
                    function(response) {
                        console.log(response);
                        return Ember.A(response);
                    }
                )
        });

    }

});

export default CoursesModel;