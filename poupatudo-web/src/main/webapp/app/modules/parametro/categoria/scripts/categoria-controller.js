/* global angular */

angular.module('poupatudo.categoria.controller', [])

    .controller('CategoriaController', ['$scope','mockJsonService',
            function ($scope,mockJsonService) {

                /**MOCK remover**/
                mockJsonService.getListMock('categoria')
                    .then(function(response) {
                        $scope.pager = response;
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });
                /**MOCK remover**/

            }
        ])

        .controller('CategoriaCreateController', ['$scope',
            function ($scope) {

            }
        ])

        .controller('CategoriaUpdateController', ['$scope','mockJsonService','$stateParams',
            function ($scope,mockJsonService,$stateParams) {

                $scope.categoria= {};
                /**MOCK remover**/

                mockJsonService.getMock('categoria',$stateParams.id)
                    .then(function(response) {
                        $scope.categoria = response;
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });
                /**MOCK remover**/


            }
        ])
        
        .controller('CategoriaViewController', ['$scope','mockJsonService','$stateParams',
            function ($scope,mockJsonService,$stateParams) {

                $scope.categoria= {};

                /**MOCK remover**/
                mockJsonService.getMock('categoria',$stateParams.id)
                    .then(function(response) {
                        $scope.categoria = response;
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });
                /**MOCK remover**/
            }
        ])

;
