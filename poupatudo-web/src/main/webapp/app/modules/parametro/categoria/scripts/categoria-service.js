/* global angular */

angular.module('poupatudo.categoria.service', [])

    .service('categoriaService', ['utilCRUD', function (utilCRUD) {
        return angular.extend({}, utilCRUD, {
            route: 'categoria'
        });
    }])


;