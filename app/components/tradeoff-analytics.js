import Ember from 'ember';
import config from '../config/environment';
import layout from '../templates/components/tradeoff-analytics';

export default Ember.Component.extend({
    layout: layout,
    tagName: 'div',
    classNames: 'tradeoff-analytics-component',

    problem: {},

    _setup: function() {
        var self = this;
        this.set('refresh', function() {
            self._refresh.apply(self);
        });
        console.log('init');
    }.on('init'),

    taClient: null,
    errCallback: function(err) {
        console.error('errCallback', err);
    },
    onResultsReady: function() {
        console.log('onResultsReady', arguments);
    },
    onResultSelection: function() {
        console.log('onResultSelection',
            arguments);
    },

    _refresh: function() {
        var self = this;
        console.log('refresh', this.element);

        var dilemmaServiceUrl = config.APP.apiHost +
            '/api/courses/dilemmas';

        var taClient = self.get('taClient');

        var cb = function() {

            console.log('init tradeoff analytics');

            taClient = new TradeoffAnalytics({
                dilemmaServiceUrl: dilemmaServiceUrl,
                // customCssUrl: 'https://ta-cdn.mybluemix.net/modmt/styles/' +
                // themeName + '.css',
                profile: self.get('profile'),
                errCallback: function(err) {
                    console.log('errCallback', err);

                    var errMsg = err;
                    try {
                        errMsg = JSON.parse(err.responseText).error.error;
                    } catch (e) {}

                    self.$()
                        .removeClass('loading')
                        .removeClass('ready')
                        .addClass('error');
                    self.$('.error-message')
                        .text(errMsg);

                    self.get('errCallback').apply(
                        self, arguments);
                }
            }, self.$('.tradeoff-analytics-container').get(
                0));

            taClient.start(function() {
                console.log('started', arguments);

                var problem = self.get('problem');

                self.$()
                    .addClass('loading')
                    .removeClass('error')
                    .removeClass('ready');

                taClient.show(problem, function() {
                        console.log(
                            'onResultsReady1',
                            arguments);
                        self.$()
                            .removeClass('loading')
                            .removeClass('error')
                            .addClass('ready');

                        self.get('onResultsReady').apply(
                            self, arguments);
                    },
                    self.get('onResultSelection'));

            });

            self.set('taClient', taClient);

        };

        if (taClient !== null) {
            taClient.destroy(cb);
        } else {
            cb();
        }

    }.observes('problem').on('didInsertElement'),

    profile: {
        "favorites": true,
        "favoritesTab": true,
        "filters": true,
        "filterHistogram": true,
        "objectivesOnly": false,
        "zoomIn": true,
        "optimalsList": true,
        "autoExcludedList": true,
        "incompleteList": true,
        "tradeoffAnalyzer": true,
        "undoRedo": true,
        "exploreViz": "both",
        "questionEditor": "fullyEditable"
    }


});