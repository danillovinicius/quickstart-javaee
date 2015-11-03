/* global angular */

angular.module('poupatudo.usuario.service', [])

    .service('usuarioService', ['utilCRUD', function (utilCRUD) {
        return angular.extend({}, utilCRUD, {
            route: 'usuario'
        });
    }])


;