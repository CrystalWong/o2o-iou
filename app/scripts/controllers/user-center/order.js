'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('OrderCtrl', ['$scope', '$rootScope', 'HongcaiUser', function($scope, $rootScope, HongcaiUser) {
    if ($rootScope.hasLoggedUser) {
      HongcaiUser.$find($rootScope.hasLoggedUser.id + '/orders').$then(function(response) {
        if (response.$status === 'ok') {
          // 获取用户的订单列表
          $scope.simpleOrders = response;
        } else {
          // 获取信息失败。
        }
      });
    }
  }]);
