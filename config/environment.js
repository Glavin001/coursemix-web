/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'coursemix-web',
        environment: environment,
        baseURL: '/',
        locationType: 'hash',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },

        contentSecurityPolicy: {
            'default-src': "'self' 'unsafe-eval' 'unsafe-inline' * ",
            'script-src': "'self' 'unsafe-eval' https://ta-cdn.mybluemix.net/ ",
            'frame-src': "'self' 'unsafe-eval' https://ta-cdn.mybluemix.net/ ",
            'font-src': "'self' 'unsafe-eval' 'unsafe-inline' * ",
            'connect-src': "'self' 'unsafe-eval' * ",
            'img-src': "'self' 'unsafe-eval' 'unsafe-inline' * ",
            'style-src': "'self' 'unsafe-eval' 'unsafe-inline' * ",
            'media-src': "'self' 'unsafe-eval' 'unsafe-inline' * "
        }

    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
        ENV.APP.apiHost = "http://localhost:3000"

    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    if (process.env.COURSEMIX_API) {
        ENV.APP.apiHost = process.env.COURSEMIX_API;
    }

    return ENV;
};