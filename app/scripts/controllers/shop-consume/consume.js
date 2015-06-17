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

    $rootScope.checkSession.promise.then(function(){
    //检测用户是否已注册
    if (!$rootScope.openid || $rootScope.openid === null || $rootScope.openid === undefined) {
      // var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');
      // 获取微信code
      $rootScope.wechatCodeStr = window.location.href.split('code=')[1];
      if ($rootScope.wechatCodeStr) {
        $rootScope.wechatCode = $rootScope.wechatCodeStr.split('&state')[0];
        if ($rootScope.wechatCode) {
          IouUser.$find($rootScope.wechatCode + '/openid').$then(function(response){
            $rootScope.openid = response.openid;
            $rootScope.userInfo = response;

            if ($rootScope.openid && !response.mobile) { // 用户未注册

              $state.go('register',{'openid': $rootScope.openid});

            } else if ($rootScope.openid && response.mobile) { // 用户已注册
              Consume.$find('/').$then(function(response) {
                if (response.$status === 'ok') {
                  
                  $scope.shopsPaging = response; // 当前页店铺信息
                } else {
                  // 获取信息失败。
                }
              });
            }
          });
        }
      }
    } else {
      Consume.$find('/').$then(function(response) {
        if (response.$status === 'ok') {
          
          $scope.shopsPaging = response; // 当前页店铺信息
        } else {
          // 获取信息失败。
        }
      });
    }


  });




}]);
