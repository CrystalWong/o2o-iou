'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:AccountCtrl
 * @description
 * # UserCenterAccountCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('AccountCtrl', ['$scope', '$rootScope', '$state', 'IouUser', 'restmod', 'DEFAULT_DOMAIN', function ($scope, $rootScope, $state, IouUser, restmod, DEFAULT_DOMAIN) {
    $rootScope.selected =  'account';

    //检测用户是否已注册
    if (!$rootScope.openid || $rootScope.openid === null || $rootScope.openid === undefined) {
      var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');
      // 获取微信code
      $rootScope.wechatCodeStr = window.location.href.split('code=')[1];
      if ($rootScope.wechatCodeStr) {
        $rootScope.wechatCode = $rootScope.wechatCodeStr.split('&state')[0];
        if ($rootScope.wechatCode) {
          checkModel.$find($rootScope.wechatCode + '/openid').$then(function(response){
            $rootScope.openid = response.openid;
            $rootScope.userInfo = response;
            if ($rootScope.openid && !response.mobile) {
              $state.go('register',{'openid': $rootScope.openid});
            } else if ($rootScope.openid && response.mobile) {
              IouUser.$find($rootScope.userInfo.id + '/account').$then(function(response) {
                if (response.$status === 'ok') {
                  // 获取用户金额信息
                  $scope.userAccount = response;
                } else {
                  // 获取信息失败。
                }
              });
            }
          });
        }
      }
    }


    




  }]);
