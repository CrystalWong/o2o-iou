'use strict';


/**
 * @ngdoc function
 * @name o2oWechatIou.controller:AccountCtrl
 * @description 消费详情页的ctrl
 * # ShopDetailCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('ShopDetailCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 'IouUser', 'Consume', function ($scope, $stateParams, $rootScope, $state, IouUser, Consume) {
    $rootScope.selected =  'iou';

    $rootScope.checkSession.promise.then(function(){
      
      Consume.$find('/'+ $stateParams.shopId).$then(function(response) {
        if (response.$status === 'ok') {
          
          $scope.shop = response; // 当前页店铺信息
          $scope.seller = response.sellers[0];
        } else {
          // 获取信息失败。
        }
      });
    
  });

}]);