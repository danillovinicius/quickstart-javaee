/* global angular */

angular.module('poupatudo.profile.service', [])

    .service('profileService', ['utilCRUD', function (utilCRUD) {
        return angular.extend({}, utilCRUD, {
            route: 'user'
        });
    }])


;