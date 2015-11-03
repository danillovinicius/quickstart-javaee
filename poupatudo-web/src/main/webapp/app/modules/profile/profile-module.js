/* global angular */

angular.module('poupatudo.profile', [
    'poupatudo.profile.service',
    'poupatudo.profile.controller'
])

    .config(['$stateProvider', 'USER_ROLES',
        function ($stateProvider, USER_ROLES) {

            $stateProvider
                .state("profile", {
                    url: "/profile",
                    templateUrl: 'app/modules/profile/views/profile.html',
                    controller: 'ProfileController',
                    data: {
                        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                    }
                })
                .state("profilekey", {
                    url: "/profile",
                    templateUrl: 'app/modules/profile/views/profile_key.html',
                    controller: 'ProfileKeyController',
                    data: {
                        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                    }
                });


        }]);