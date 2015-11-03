/* global angular */

angular.module('poupatudo.conta', [
    'poupatudo.conta.service',
    'poupatudo.conta.controller'
])

        .config(['$stateProvider', 'USER_ROLES',
            function ($stateProvider, USER_ROLES) {

                $stateProvider
                        .state("conta", {
                            url: "/conta",
                            templateUrl: 'app/modules/parametro/conta/views/conta.html',
                            controller: 'ContaController',
                            data: {
                                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
                            }
                        })

                        .state("contanew", {
                            url: "/incluir",
                            templateUrl: 'app/modules/parametro/conta/views/conta_new.html',
                            controller: 'ContaCreateController',
                            data: {
                                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                            }
                        })

                        .state("contaupdate", {
                            url: "/atualizar/:id/",
                            templateUrl: 'app/modules/parametro/conta/views/conta_update.html',
                            controller: 'ContaUpdateController',
                            data: {
                                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                            }
                        })

                        .state("contaview", {
                            url: "/view/:id",
                            templateUrl: 'app/modules/parametro/conta/views/conta_view.html',
                            controller: 'ContaViewController',
                            data: {
                                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
                            }
                        });
            }]);





 