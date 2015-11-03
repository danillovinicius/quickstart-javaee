/* global angular */

angular.module('poupatudo.profile.controller', [])

        .controller('ProfileController', ['$scope', '$rootScope','$state', 'messageService', 'profileService','mockJsonService',
            function ($scope,$rootScope, $state, messageService, profileService,mockJsonService) {

                $scope.profile = {};

                /**MOCK remover**/
                var usersMock = ["dvlima","admin","editor","guest"];
                    mockJsonService.getMock('user',usersMock.indexOf($rootScope.currentUser.login))
                        .then(function(response) {
                            $scope.profile = response;
                        }, function(reason) {
                            alert('Failed: ' + reason);
                        });
                /**MOCK remover**/

                //profileService.obterID($stateParams.id).then(function (retorno) {
                //    $scope.projeto = retorno || {};
                //});

                $scope.form = {
                    submit: actionUpdate
                };

                function actionUpdate() {
                    profileService.atualizar($scope.profile)
                            .then(function (retorno) {
                                messageService.success({messageProperties: 'MS002'});
                                $state.go('profile');
                            })
                            .catch(function (e) {
                                messageService.error({messageProperties: 'WS002', detail: e});
                            });
                }


            }
        ])

    .controller('ProfileKeyController', ['$scope', 'messageService',
        function ($scope, messageService) {

//           messageService.success({messageProperties:'MS001'});
        }
    ])


        ;