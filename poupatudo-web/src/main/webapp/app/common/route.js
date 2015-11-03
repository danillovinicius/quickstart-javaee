/* global angular */

angular.module('poupatudo.route', [])

        .config(function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider.state("login", {
                url: "/login",
                controller: 'ManagerController'
            });
        })

        ;


