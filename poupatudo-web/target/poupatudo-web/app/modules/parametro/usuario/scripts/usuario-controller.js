/* global angular */
(function (window, angular, undefined) {

    angular.module('poupatudo.usuario.controller', [])

        .controller('UsuarioController', ['$scope', 'memberService', 'messageService', UsuarioController])
        .controller('UsuarioCreateController', ['$scope', 'messageService', 'memberService', '$state', UsuarioCreateController])
        .controller('UsuarioUpdateController', ['$scope', 'messageService', '$stateParams', 'memberService', '$state', UsuarioUpdateController])
        .controller('UsuarioViewController', ['$scope', 'messageService', '$stateParams', 'memberService', UsuarioViewController]);

    function UsuarioController($scope, memberService, messageService) {

        $scope.currentPage = 1;

        $scope.paginar = function () {
            memberService.paginar($scope.currentPage, 10).then(function (retorno) {
                $scope.pager = retorno.list;
                $scope.total = $scope.pager.total;
            });
        };

        $scope.pesquisar = function () {
            $scope.currentPage = 1;
            memberService.paginar($scope.currentPage, 10).then(function (retorno) {
                $scope.pager = retorno.list;
                $scope.total = $scope.pager.total;
            });
        };

        $scope.limpar = function () {
            $scope.consultaForm.$setPristine();
            $scope.conta = {};
            $scope.pager = null;
            $scope.currentPage = 1;
        };

        $scope.remover = function (id) {
            memberService.remover(id).then(function (retorno) {
                messageService.success({messageProperties: 'MS003'});
                $scope.pager = null;
                $scope.currentPage = 1;
            });
        }

    }

    function UsuarioUpdateController($scope, messageService, $stateParams, memberService, $state) {

        memberService.obterID($stateParams.id).then(function (retorno) {
            //$scope.member = retorno.plain() || {};
            $scope.member = retorno
            ;
        });

        $scope.form = {
            submit: actionUpdate
        };

        function actionUpdate() {
            memberService.atualizar($scope.member)
                .then(function (retorno) {
                    messageService.success({messageProperties: 'MS002'});
                    $state.go('usuario');
                })
                .catch(function (e) {
                    messageService.error({messageProperties: 'WS002', detail: e});
                });
        }
    }

    function UsuarioCreateController($scope, messageService, memberService, $state) {

        //$scope.member = {name: "Usuario",email: "email@email.com",phoneNumber: "9999-0000",address: "Avenida Central, 999"};
        $scope.member = {};

        $scope.form = {
            submit: actionSave
        };

        function actionSave() {
            memberService.salvar($scope.member)
                .then(function (retorno) {
                    messageService.success({message: 'Salvo'});
                    $state.go('usuario');
                })
                .catch(function (e) {
                    messageService.error({message: e});
                });
        }
    }

    function UsuarioViewController($scope, messageService, $stateParams, memberService) {

        memberService.obterID($stateParams.id)
            .then(function (retorno) {
                $scope.member = retorno || {};
            })
            .catch(function (e) {
                messageService.error({messageProperties: 'WS002', detail: e});
            });
    }

})(window, window.angular);