/* global angular */
(function (window, angular, undefined) {

    angular.module('poupatudo.usuario.controller', [])

        .controller('UsuarioController', ['$scope', 'messageService', UsuarioController])
        .controller('UsuarioCreateController', ['$scope', 'messageService', 'memberService', '$state', UsuarioCreateController])
        .controller('UsuarioUpdateController', ['$scope', 'messageService', '$stateParams', UsuarioUpdateController])
        .controller('UsuarioViewController', ['$scope', 'messageService', '$stateParams', UsuarioViewController]);

    function UsuarioController($scope, messageService) {

        //$scope.currentPage = 1;
        //
        //$scope.paginar = function () {
        //    contaService.paginar($scope.currentPage, 10).then(function (retorno) {
        //        $scope.pager = retorno;
        //        $scope.total = $scope.pager.total;
        //    });
        //};
        //
        //$scope.pesquisar = function () {
        //    $scope.currentPage = 1;
        //    contaService.paginar($scope.currentPage, 10).then(function (retorno) {
        //        $scope.pager = retorno;
        //        $scope.total = $scope.pager.total;
        //    });
        //};
        //
        //$scope.limpar = function () {
        //    $scope.consultaContaForm.$setPristine();
        //    $scope.conta = {};
        //    $scope.pager = null;
        //    $scope.currentPage = 1;
        //};

    }

    function UsuarioUpdateController($scope, messageService, $stateParams) {


        //contaService.obterID($stateParams.id).then(function (retorno) {
        //    $scope.conta = retorno || {};
        //});

        //$scope.form = {
        //    submit: actionUpdate
        //};
        //
        //function actionUpdate() {
        //    contaService.atualizar($scope.conta)
        //        .then(function (retorno) {
        //            messageService.success({messageProperties: 'MS002'});
        //            $state.go('conta');
        //        })
        //        .catch(function (e) {
        //            messageService.error({messageProperties: 'WS002', detail: e});
        //        });
        //}
    }

    function UsuarioCreateController($scope, messageService, memberService, $state) {

        $scope.member = {
            name: "Usuario",
            email: "email@email.com",
            phoneNumber: "9999-0000",
            address: "Avenida Central, 999"
        };

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

    function UsuarioViewController($scope, messageService, $stateParams) {

        //contaService.obterID($stateParams.id)
        //        .then(function (retorno) {
        //            $scope.conta = retorno || {};
        //        })
        //        .catch(function (e) {
        //            messageService.error({messageProperties: 'WS002', detail: e});
        //        });
    }

})(window, window.angular);