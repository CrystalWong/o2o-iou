'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:FundsProjectDetailCtrl
 * @description
 * # FundsProjectDetailCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('IdentityCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'fundsProjects', 'restmod', 'DEFAULT_DOMAIN', 'config', function($scope, $state, $rootScope, $stateParams, fundsProjects, restmod, DEFAULT_DOMAIN, config) {


    $scope.toInvest = function(simpleFundsProject) {
      /*if (simpleFundsProject.isRepeatFlag && $scope.fundsFlag === 3) {
        $scope.isRepeat = 1;
      } else {
        $scope.isRepeat = 2;
      }
      $scope.investAmount = simpleFundsProject.investAmount;
      if ($scope.fundsFlag === 0) {
        $state.go('root.login');
      } else if ($scope.fundsFlag === 1) {
        // 需要跳到实名认证页面
      } else if ($scope.checkLargeUserCanAmount(simpleFundsProject)) {
        $state.go('root.user-center.recharge');
      } else if ($scope.fundsFlag === 2 || $scope.fundsFlag === 3) {*/
        // how to bulid investment path restmod.model
        // restmod.model(DEFAULT_DOMAIN + '/projects')
        
        // restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/' + $rootScope.hasLoggedUser.id + '/investment').$create({
        restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/6/investment').$create({
          // fundsProjects.$find(number + '/users/' + $rootScope.hasLoggedUser.id + '/investment').$create({
          amount: simpleFundsProject.investAmount,
          projectId: simpleFundsProject.id,
          isRepeat: 2
        }).$then(function(response) {
          // 重复下单后，response.number为undefined
          if (response.$status === 'ok') {
            if (response.number !== null && response.number !== undefined) {
              // restmod.model(DEFAULT_DOMAIN + '/orders/' + simpleFundsProject.number + '/users/' + $rootScope.hasLoggedUser.id + '/payment').$create({'orderNumber' : response.number}).$then(function(response) {
              restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/6/payment').$create({'orderNumber' : response.number}).$then(function(response) {
                if (response.$status === 'ok') {
                  /*var req = response.req;
                  var sign = response.sign;
                  var _f = newForm(); //创建一个form表单
                  createElements(_f, 'req', req); //创建form中的input对象
                  createElements(_f, 'sign', sign);
                  _f.action = config.YEEPAY_ADDRESS + 'toTransfer'; //form提交地址
                  _f.submit(); //提交*/
                }
                // $state.go('');
              })
            } else if (response.ret === -1) {
              $scope.msg = response.msg;
            }
          } else {
            $scope.msg = "服务器累瘫了，请稍后访问。";
          }
        })
      // }
    };

  }]);
