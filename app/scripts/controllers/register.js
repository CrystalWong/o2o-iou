'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'md5', 'register', 'wechat', 'mobileCaptcha', function($rootScope, $scope, $state, $stateParams, md5, register, wechat, mobileCaptcha) {
    $scope.showRegistrationAgreement = false;
    $scope.toggle = function () {
      $scope.showRegistrationAgreement = !$scope.showRegistrationAgreement;
    };

    $scope.signUpButton = false;
    $scope.signUp = function(user) {
      $scope.signUpButton = true;
      register.$create({
        mobile: user.mobile,
        captcha: user.captcha,
        openId: $rootScope.openid
      }).$then(function(response) {
        if (response.ret === -1) {
          $scope.msg = response.msg;
        } else {
          $state.go('root.main');
        }
      });
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
