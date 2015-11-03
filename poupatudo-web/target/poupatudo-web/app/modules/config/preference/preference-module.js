/* global angular */

angular.module('poupatudo.preference', [
    'poupatudo.preference.service',
    'poupatudo.preference.controller'
])

        .config(['$stateProvider', 'USER_ROLES',
            function ($stateProvider, USER_ROLES) {

                $stateProvider
                        .state("preference", {
                            url: "/preference",
                            templateUrl: 'app/modules/config/preference/views/preference.html',
                            controller: 'PreferenceController',
                            data: {
                                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                            }
                        });
            }]);