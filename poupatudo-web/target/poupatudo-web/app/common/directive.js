/* global angular */

angular.module('poupatudo.directive', [])

    .directive('alertMessage', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/mensagem/layout-mensagem.html'
        };
    })

    .directive('loginApp', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/login/views/login.html',
            controller:'LoginController'
        };
    })

    .directive('myApp', function () {
        return {
            restrict: 'A',
            controller:'ManagerController'
        };
    })

 ;