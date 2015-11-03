/* global angular */

angular.module('poupatudo.dashboard.service', [])

    .service('dashboardService', ['utilCRUD', function (utilCRUD) {
        return angular.extend({}, utilCRUD, {
            route: 'dashboard'
        });
    }])


;