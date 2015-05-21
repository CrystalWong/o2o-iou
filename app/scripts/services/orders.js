'use strict';

/**
 * @ngdoc service
 * @name o2oWechatIou.orders
 * @description
 * # orders
 * Service in the o2oWechatIou.
 */
angular.module('o2oWechatIou')
/*  .service('orders', function (restmod, DEFAULT_DOMAIN) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return restmod.model(DEFAULT_DOMAIN + '/orders');

  });*/
  .controller('OrderCtrl', ['$scope', '$rootScope', '$state', 'HongcaiUser', 'restmod', 'DEFAULT_DOMAIN', function($scope, $rootScope, $state, HongcaiUser, restmod, DEFAULT_DOMAIN) {

    $rootScope.selectedSide =  'investments-stat';

    if ($rootScope.hasLoggedUser) {
      HongcaiUser.$find($rootScope.hasLoggedUser.id + '/orders').$then(function(response) {
        if (response.$status === 'ok') {
          $scope.simpleOrder = response;
        } else {
          //
        }
      });
      
    }
  }]);

