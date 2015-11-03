/* global angular */

angular.module('poupatudo.dashboard', [
    'poupatudo.dashboard.service',
    'poupatudo.dashboard.controller'
])

        .config(['$stateProvider', 'USER_ROLES',
            function ($stateProvider, USER_ROLES) {

                $stateProvider
                        .state("dashboard", {
                            url: "/dashboard",
                            templateUrl: 'app/modules/dashboard/views/dashboard.html',
                            controller: 'DashboardController',
                            data: {
                                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
                            }
                        });
            }]);