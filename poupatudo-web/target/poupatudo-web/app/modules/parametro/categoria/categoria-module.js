/* global angular */

angular.module('poupatudo.categoria', [
    'poupatudo.categoria.service',
    'poupatudo.categoria.controller'
])

        .config(['$stateProvider', 'USER_ROLES',
            function ($stateProvider, USER_ROLES) {

                $stateProvider
                    .state("categoria", {
                        url: "/categoria",
                        templateUrl: 'app/modules/parametro/categoria/views/categoria.html',
                        controller: 'CategoriaController',
                        data: {
                            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
                        }
                    })

                    .state("categorianew", {
                        url: "/incluir",
                        templateUrl: 'app/modules/parametro/categoria/views/categoria_new.html',
                        controller: 'CategoriaCreateController',
                        data: {
                            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                        }
                    })

                    .state("categoriaupdate", {
                        url: "/atualizar/:id/",
                        templateUrl: 'app/modules/parametro/categoria/views/categoria_update.html',
                        controller: 'CategoriaUpdateController',
                        data: {
                            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                        }
                    })

                    .state("categoriaview", {
                        url: "/view/:id",
                        templateUrl: 'app/modules/parametro/categoria/views/categoria_view.html',
                        controller: 'CategoriaViewController',
                        data: {
                            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                        }
                    });
            }]);