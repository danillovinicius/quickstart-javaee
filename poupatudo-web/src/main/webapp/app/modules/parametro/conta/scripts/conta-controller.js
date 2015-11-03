/* global angular */

angular.module('poupatudo.conta.controller', [])

    .controller('ContaController', ['$scope', 'contaService','mockJsonService',
            function ($scope, contaService,mockJsonService) {

                /**MOCK remover**/
                mockJsonService.getListMock('conta')
                    .then(function(response) {
                        $scope.pager = response;
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });
                /**MOCK remover**/

                $scope.currentPage = 1;

                $scope.paginar = function () {
                    contaService.paginar($scope.currentPage, 10).then(function (retorno) {
                        $scope.pager = retorno;
                        $scope.total = $scope.pager.total;
                    });
                };

                $scope.pesquisar = function () {
                    $scope.currentPage = 1;
                    contaService.paginar($scope.currentPage, 10).then(function (retorno) {
                        $scope.pager = retorno;
                        $scope.total = $scope.pager.total;
                    });
                };

                $scope.limpar = function () {
                    $scope.consultaContaForm.$setPristine();
                    $scope.conta = {};
                    $scope.pager = null;
                    $scope.currentPage = 1;
                };
            }
        ])

        .controller('ContaCreateController', ['$scope', '$state', 'messageService', 'contaService',
            function ($scope, $state, messageService, contaService) {

                $scope.conta = {};

                $scope.form = {
                    submit: actionSave
                };

                function actionSave() {
                    contaService.salvar($scope.conta)
                            .then(function (retorno) {
                                messageService.success({messageProperties: 'MS001'});
                                $state.go('conta');
                            })
                            .catch(function (e) {
                                messageService.error({messageProperties: 'WS002', detail: e});
                            });

                }
            }
        ])

        .controller('ContaUpdateController', ['$scope', '$state', '$stateParams', 'messageService', 'contaService','mockJsonService',
            function ($scope, $state, $stateParams, messageService, contaService,mockJsonService) {


                /**MOCK remover**/
                mockJsonService.getMock('conta',$stateParams.id)
                    .then(function(response) {
                        $scope.conta = response;
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });
                /**MOCK remover**/

                //contaService.obterID($stateParams.id).then(function (retorno) {
                //    $scope.conta = retorno || {};
                //});

                $scope.form = {
                    submit: actionUpdate
                };

                function actionUpdate() {
                    contaService.atualizar($scope.conta)
                            .then(function (retorno) {
                                messageService.success({messageProperties: 'MS002'});
                                $state.go('conta');
                            })
                            .catch(function (e) {
                                messageService.error({messageProperties: 'WS002', detail: e});
                            });
                }
            }
        ])

        .controller('ContaViewController', ['$scope', '$stateParams', 'contaService', 'messageService','mockJsonService',
            function ($scope, $stateParams, contaService, messageService,mockJsonService) {


                /**MOCK remover**/
                mockJsonService.getMock('conta',$stateParams.id)
                    .then(function(response) {
                        $scope.conta = response;
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });
                /**MOCK remover**/



                //contaService.obterID($stateParams.id)
                //        .then(function (retorno) {
                //            $scope.conta = retorno || {};
                //        })
                //        .catch(function (e) {
                //            messageService.error({messageProperties: 'WS002', detail: e});
                //        });

            }
        ])

        ;