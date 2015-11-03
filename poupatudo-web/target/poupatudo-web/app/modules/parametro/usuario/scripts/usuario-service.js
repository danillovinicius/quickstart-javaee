/* global angular */

angular.module('poupatudo.usuario.service', [])

    .service('memberService', ['utilCRUD', function (utilCRUD) {
        return angular.extend({}, utilCRUD, {
            route: 'member'
        });
    }])


;