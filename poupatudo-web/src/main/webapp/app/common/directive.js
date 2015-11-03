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

    .directive('tipo', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    tipo: "="
                },
                replace: true,
                template: '<i class="fa {{icone}}"></i>',
                controller: function ($scope) {

                    function verificarTIPO() {
                        if ($scope.tipo == 'despesa') {
                            $scope.icone = "fa-arrow-down tipo-despesa";
                        } else if ($scope.tipo == 'receita') {
                            $scope.icone = "fa-arrow-up tipo-receita";
                        } else if ($scope.tipo == 'transferencia') {
                            $scope.icone = "fa-random tipo-transferencia";
                        }
                    }

                    $scope.$watch('tipo', function () {
                        verificarTIPO();
                    });

                }
            }
        }])
;