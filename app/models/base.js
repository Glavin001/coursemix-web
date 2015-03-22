import Ember from 'ember';
import config from '../config/environment';
import DS from 'ember-data';

var $ = Ember.$;

var BaseModel = Ember.Object.extend({

});

BaseModel.reopenClass({

    findAll: function(filter) {

        var self = this;
        filter = filter || {};
        console.log('findAll', filter, config, this);

        var modelName = self._endpoint;
        console.log('modelName', modelName);
        if (!modelName) {
            return [];
        }

        return DS.PromiseArray.create({
            promise: $.getJSON(config.APP.apiHost + '/api/' +
                    modelName + "?filter="+JSON.stringify(filter))
                .then(
                    function(response) {
                        console.log(response);
                        return response.map(function(
                            child) {
                            return self.create(
                                child);
                        });
                    }
                )
        });

    }

});

export default BaseModel;