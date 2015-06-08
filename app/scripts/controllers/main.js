'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:FundsProjectDetailCtrl
 * @description
 * # FundsProjectDetailCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('MainCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'restmod', 'DEFAULT_DOMAIN', 'config', function($scope, $state, $rootScope, $stateParams, restmod, DEFAULT_DOMAIN, config) {
    $rootScope.selected = 'iou';
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
              window.location.href = 'http://api.rexingo.com/index.php/api/index/blankNote?userid=' + $rootScope.userInfo.id + '&mobile='+ $rootScope.userInfo.mobile;
            }
            
          });
        }
      }
    }

  }]);
