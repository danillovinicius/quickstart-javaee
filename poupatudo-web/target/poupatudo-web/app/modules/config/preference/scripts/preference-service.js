/* global angular */

angular.module('poupatudo.preference.service', [])

    .service('preferenceService', ['utilCRUD', function (utilCRUD) {
        return angular.extend({}, utilCRUD, {
            route: 'preference'
        });
    }])


;