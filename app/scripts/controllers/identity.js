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
    function newForm() {
      var f = document.createElement('form');
      document.body.appendChild(f);
      f.method = 'post';
      // f.target = '_blank';
      return f;
    }

    function createElements(eForm, eName, eValue) {
      var e = document.createElement('input');
      eForm.appendChild(e);
      e.type = 'text';
      e.name = eName;
      if (!document.all) {
        e.style.display = 'none';
      } else {
        e.style.display = 'block';
        e.style.width = '0px';
        e.style.height = '0px';
      }
      e.value = eValue;
      return e;
    }

    $scope.toPay = function(user) {
      restmod.model(DEFAULT_DOMAIN + '/orders/' + $stateParams.number + '/users/' + $rootScope.userInfo.id + '/payment').$create({
          realName: user.realName,
          idNo: user.idNo
        }).$then(function(response) {
        if (response.$status === 'ok') {
          var req_data = response.req_data;
          var _f = newForm(); //创建一个form表单
          createElements(_f, 'req_data', req_data); //创建form中的input对象
          _f.action = 'https://yintong.com.cn/llpayh5/authpay.htm'; //form提交地址
          _f.submit(); //提交
        } else {
          $scope.msg = response.msg;
        }
      })
    };

  }]);
