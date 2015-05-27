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


    $scope.toPay = function(user) {
      restmod.model(DEFAULT_DOMAIN + '/orders/' + $stateParams.number + '/users/' + $rootScope.hasLoggedUser.id + '/payment').$create({
          realName: user.realName,
          idNo: user.idNo
        }).$then(function(response) {
        if (response.$status === 'ok') {
          var req = response.req;
          var sign = response.sign;
          var _f = newForm(); //创建一个form表单
          createElements(_f, 'req', req); //创建form中的input对象
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toTransfer'; //form提交地址
          _f.submit(); //提交
        }
        // $state.go('');
      })
    };

  }]);
