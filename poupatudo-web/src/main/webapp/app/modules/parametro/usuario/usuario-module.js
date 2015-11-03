/* global angular */

angular.module('poupatudo.member', [
    'poupatudo.usuario.service',
    'poupatudo.usuario.controller'
])

    .config(['$stateProvider', 'USER_ROLES',
        function ($stateProvider, USER_ROLES) {

            $stateProvider
                .state("usuario", {
                    url: "/usuario",
                    templateUrl: 'app/modules/parametro/usuario/views/usuario.html',
                    controller: 'UsuarioController',
                    data: {
                        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                    }
                })

                .state("usuarionew", {
                    url: "/incluir",
                    templateUrl: 'app/modules/parametro/usuario/views/usuario_new.html',
                    controller: 'UsuarioCreateController',
                    data: {
                        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                    }
                })

                .state("usuarioupdate", {
                    url: "/atualizar/:id/",
                    templateUrl: 'app/modules/parametro/usuario/views/usuario_update.html',
                    controller: 'UsuarioUpdateController',
                    data: {
                        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                    }
                })

                .state("usuarioview", {
                    url: "/view/:id",
                    templateUrl: 'app/modules/parametro/usuario/views/usuario_view.html',
                    controller: 'UsuarioViewController',
                    data: {
                        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                    }
                });
        }]);