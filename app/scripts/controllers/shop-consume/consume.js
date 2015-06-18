'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:AccountCtrl
 * @description 消费列表页的ctrl
 * # UserCenterAccountCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('ConsumeCtrl', ['$scope', '$rootScope', '$state', 'IouUser', 'Consume', function ($scope, $rootScope, $state, IouUser, Consume) {
    $rootScope.selected =  'iou';


    $scope.goShopDetail = function(shop){
      $state.go('shop-detail', {shopId: shop.shopId});
    }

    $rootScope.checkSession.promise.then(function(){
      Consume.$find('/').$then(function(response) {
        if (response.$status === 'ok') {
          
          $scope.pagingShops = response; // 当前页店铺信息
        } else {
          // 获取信息失败。
        }
      });


  });




}]);
