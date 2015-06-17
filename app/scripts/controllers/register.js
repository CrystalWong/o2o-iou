'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'md5', 'register', 'mobileCaptcha', 'config', '$timeout', function($rootScope, $scope, $state, $stateParams, md5, register, mobileCaptcha, config, $timeout) {
    $scope.forbiddenSignUp = false;
    $scope.signUp = function(user) {
      if(!$scope.forbiddenSignUp) {
        $scope.forbiddenSignUp = true;
        register.$create({
          mobile: user.mobile,
          captcha: user.captcha,
          openId: $rootScope.openid
        }).$then(function(response) {
          var mytimeout = $timeout(function() {
            $scope.forbiddenSignUp = false;
            $timeout.cancel(mytimeout);
          }, 100);
          
          if (response.ret === -1) {
            $scope.msg = response.msg;
          } else {
            window.location.href = config.wechatRedirect;
          }
        });
      }
      
    };

    

    // 用户获取手机验证码
    $scope.sendMobileCaptcha = function(user) {
      mobileCaptcha.$create({
        mobile: user.mobile
      }).$then(function(response) {
        if (response.ret === -1) {
          $scope.msg = response.msg;
        }
      });
    };

  }]);
