/* global angular */

angular.module('poupatudo.conta.service', [])

    .service('contaService', ['utilCRUD', function (utilCRUD) {
        return angular.extend({}, utilCRUD, {
            route: 'conta'
        });
    }])


;