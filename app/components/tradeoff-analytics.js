import Ember from 'ember';
import config from '../config/environment';
import layout from '../templates/components/tradeoff-analytics';

export default Ember.Component.extend({
    layout: layout,
    tagName: 'div',
    classNames: 'tradeoff-analytics-container container-fluid',

    taClient: null,
    errCallback: function(err) {
        console.error(err);
    },
    onResultsReady: function() {
        console.log('onResultsReady', arguments);
    },
    onResultSelection: function() {
        console.log('onResultSelection',
            arguments);
    },

    refresh: function() {
        var self = this;
        console.log('didInsertElement', this.element);

        var dilemmaServiceUrl = config.APP.apiHost +
            '/api/courses/dilemmas';

        var taClient = new TradeoffAnalytics({
            dilemmaServiceUrl: dilemmaServiceUrl,
            // customCssUrl: 'https://ta-cdn.mybluemix.net/modmt/styles/' +
            // themeName + '.css',
            // profile: profile,
            errCallback: this.get('errCallback')
        }, this.element);

        taClient.start(function() {
            console.log('started', arguments);

            var problem = self.get('problem');

            taClient.show(problem, self.get(
                    'onResultsReady'),
                self.get('onResultSelection'));

        });

    }.observes('problem').on('didInsertElement'),

    problem: {
        "subject": "phone",
        "columns": [{
            "key": "price",
            "full_name": "Price (Eur)",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MIN"
        }, {
            "key": "RAM",
            "full_name": "RAM (MB)",
            "type": "NUMERIC",
            "is_objective": false,
            "goal": "MAX"
        }, {
            "key": "screen_size",
            "full_name": "Screen size (inch)",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MAX"
        }, {
            "key": "camera",
            "full_name": "Camera (MP)",
            "type": "NUMERIC",
            "is_objective": false,
            "goal": "MAX"
        }, {
            "key": "memory_size",
            "full_name": "Memory size (GB)",
            "type": "NUMERIC",
            "is_objective": false,
            "goal": "MAX"
        }, {
            "key": "battery",
            "full_name": "Battery (mAh)",
            "type": "NUMERIC",
            "is_objective": false,
            "goal": "MAX"
        }, {
            "key": "weight",
            "full_name": "Weight (gr)",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MIN"
        }],
        "options": [{
            "key": " 1",
            "name": "Samsung Galaxy S4 White",
            "values": {
                "weight": 130,
                "price": 239,
                "RAM": 2048,
                "battery": 2600,
                "camera": 13,
                "memory_size": 16,
                "screen_size": 5
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Samsung_GALAXY_S4_zoom_%28White%29.jpg/800px-Samsung_GALAXY_S4_zoom_%28White%29.jpg'/> <a title='Photo by Samsung Belgium (Flickr: GALAXY S4 zoom (1)) [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:Samsung_GALAXY_S4_zoom_(White).jpg' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "2",
            "name": "Samsung Galaxy S4 Black",
            "values": {
                "weight": 130,
                "price": 239,
                "RAM": 2048,
                "battery": 2600,
                "camera": 13,
                "memory_size": 16,
                "screen_size": 5
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Samsung_Galaxy_S4.jpg/200px-Samsung_Galaxy_S4.jpg'/><a title='Photo by Karlis Dambrans (Flickr: Samsung Galaxy S4) [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:Samsung_Galaxy_S4.jpg' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "3",
            "name": "Samsung Galaxy S3 White",
            "values": {
                "weight": 133,
                "price": 79,
                "RAM": 2048,
                "battery": 2100,
                "camera": 8,
                "memory_size": 16,
                "screen_size": 4.8
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Samsung_Galaxy_S_III.png/300px-Samsung_Galaxy_S_III.png'/> <a title='Photo by GalaxyOptimus (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:Samsung_Galaxy_S_III.png' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "4",
            "name": "Samsung Galaxy S3 Blue",
            "values": {
                "weight": 133,
                "price": 79,
                "RAM": 2048,
                "battery": 2100,
                "camera": 8,
                "memory_size": 16,
                "screen_size": 4.8
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Samsung_Galaxy_S_Advance_i9070.JPG/250px-Samsung_Galaxy_S_Advance_i9070.JPG'/> <a title='Photo by Macs79 (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:Samsung_Galaxy_S_Advance_i9070.JPG' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "5",
            "name": "Samsung Galaxy S3 mini White",
            "values": {
                "weight": 111,
                "price": 299,
                "RAM": 1024,
                "battery": 1000,
                "camera": 5,
                "memory_size": 8,
                "screen_size": 4
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Samsung_Galaxy_S_III_mini.png/300px-Samsung_Galaxy_S_III_mini.png'/> <a title='Photo by GalaxyOptimus (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:Samsung_Galaxy_S_III_mini.png' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "6",
            "name": "Apple iPhone 5 White",
            "values": {
                "weight": 112,
                "price": 449,
                "RAM": 1024,
                "battery": 1440,
                "camera": 8,
                "memory_size": 32,
                "screen_size": 4
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/IPhone5white.png/228px-IPhone5white.png'/> <a title='Photo by Pixeden.com [CC BY 3.0 (http://creativecommons.org/licenses/by/3.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:IPhone5white.png' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "7",
            "name": "Apple iPhone 5 Black",
            "values": {
                "weight": 112,
                "price": 449,
                "RAM": 1024,
                "battery": 1440,
                "camera": 8,
                "memory_size": 32,
                "screen_size": 4
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/IPhone_5.png/300px-IPhone_5.png'/> <a title='Photo by Zach Vega (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:IPhone_5.png' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "9",
            "name": "HTC One",
            "values": {
                "weight": 143,
                "price": 189,
                "RAM": 2048,
                "battery": 2300,
                "camera": 4,
                "memory_size": 32,
                "screen_size": 4.7
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/7/70/HTC_One.png/149px-HTC_One.png'/> <a title='Photo by M0rphzone (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:HTC_One.png' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "10",
            "name": "LG Optimus G",
            "values": {
                "weight": 145,
                "price": 189,
                "RAM": 1024,
                "battery": 2100,
                "camera": 13,
                "memory_size": 32,
                "screen_size": 4.7
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/LG_Optimus_G_%28Black%29.jpg/330px-LG_Optimus_G_%28Black%29.jpg'/> <a title='Photo by LG전자 (Flickr: LG전자, 韓美서 친환경 경쟁력 인정받았다) [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:LG_Optimus_G_(Black).jpg' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "11",
            "name": "Nokia Lumia 520",
            "values": {
                "weight": 124,
                "price": 199,
                "RAM": 512,
                "battery": 1430,
                "camera": 5,
                "memory_size": 8,
                "screen_size": 4
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Lumia_520.jpg/450px-Lumia_520.jpg'/> <a title='Photo by Kārby Dambrāns from Latvia (MWC Barcelona 2013 260  Uploaded by RaviC) [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:Lumia_520.jpg' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "13",
            "name": "Samsung Galaxy Ace 2 Black",
            "values": {
                "weight": 122,
                "price": 220,
                "RAM": 768,
                "battery": 1000,
                "camera": 5,
                "memory_size": 4,
                "screen_size": 3.8
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Front_Ace_2.JPG/330px-Front_Ace_2.JPG'/> <a title='Photo by Fan samsung ace2 (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:Front_Ace_2.JPG' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "14",
            "name": "Samsung Galaxy Mini 2 Black",
            "values": {
                "weight": 105,
                "price": 220,
                "RAM": 512,
                "battery": 1300,
                "camera": 3.15,
                "memory_size": 4,
                "screen_size": 3.27
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/GT-S6500L.jpg/375px-GT-S6500L.jpg'/> <a title='Photo by Eriqvaldezz (Own work) [GFDL (http://www.gnu.org/copyleft/fdl.html) or CC BY 3.0 (http://creativecommons.org/licenses/by/3.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:GT-S6500L.jpg' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }, {
            "key": "15",
            "name": "Sony Xperia P Silver",
            "values": {
                "weight": 120,
                "price": 255,
                "RAM": 1024,
                "battery": 1305,
                "camera": 8,
                "memory_size": 16,
                "screen_size": 4
            },
            "description_html": "<img style='max-height: 100px; max-width: 100px;'  src='http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Xperia_P.jpg/330px-Xperia_P.jpg'/> <a title='Photo by vsy (http://www.flickr.com/photos/vsy/7176314726/) [CC BY-SA 2.0 (http://creativecommons.org/licenses/by-sa/2.0)], via Wikimedia Commons' href='http://commons.wikimedia.org/wiki/File:Xperia_P.jpg' target='_blank'> <img style='max-height: 14px; max-width: 14px;'  src='http://mirrors.creativecommons.org/presskit/icons/cc.png'/> </a>"
        }]
    }

});