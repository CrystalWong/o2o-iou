'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:FundsProjectDetailCtrl
 * @description
 * # FundsProjectDetailCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('MakeProfitCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'fundsProjects', 'restmod', 'DEFAULT_DOMAIN', 'config', function($scope, $state, $rootScope, $stateParams, fundsProjects, restmod, DEFAULT_DOMAIN, config) {
    $rootScope.selected = 'financing';
    
    $scope.showFundsAgreement = false;
    $scope.toggle = function () {
      $scope.showFundsAgreement = !$scope.showFundsAgreement;
    };


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
            }
          });
        }
      }
    }

    // simple project
    fundsProjects.$find('recommendations').$then(function(response) {
      if (response.$status === 'ok') {
        // 项目详情
        $scope.simpleFundsProject = response;
        $scope.profitSingle = $scope.simpleFundsProject.product.baseRate*$scope.simpleFundsProject.product.sealingDays/36500;
      } else {
        $scope.msg = response.msg;
      }
    });

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

    /*$scope.checkSession = function () {
      var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');
      checkModel.$find('checkSession').$then(function(response) {
        if (response.user) {
          return  response.user;
        }
      });
    }*/

    $scope.investmentFlag = false;
    $scope.toInvest = function(simpleFundsProject) {
      if (!$scope.investmentFlag) {
        $scope.investmentFlag = true;
        var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');
        checkModel.$find('checkSession').$then(function(response) {
          if (response.user) {
            $rootScope.userInfo = response.user;
            // restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/6/investment').$create({
            restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/' + $rootScope.userInfo.id + '/investment').$create({
              amount: simpleFundsProject.investAmount,
              projectId: simpleFundsProject.id,
              isRepeat: 2
            }).$then(function(response) {
              if (response.$status === 'ok') {
                if (response.number) {
                  // restmod.model(DEFAULT_DOMAIN + '/orders/' + response.number + '/users/6/payment').$create({
                  restmod.model(DEFAULT_DOMAIN + '/orders/' + response.number + '/users/' + $rootScope.userInfo.id + '/payment').$create({
                      payType: 2
                    }).$then(function(response) {
                    if (response.$status === 'ok') {
                      var merchantaccount = response.merchantaccount;
                      var encryptkey = response.encryptkey;
                      var data = response.data;
                      var _f = newForm(); //创建一个form表单
                      createElements(_f, 'merchantaccount', merchantaccount); //创建form中的input对象
                      createElements(_f, 'encryptkey', encryptkey); //创建form中的input对象
                      createElements(_f, 'data', data); //创建form中的input对象
                      _f.action = 'https://ok.yeepay.com/paymobile/api/pay/request'; //form提交地址
                      _f.submit(); //提交
                    } else {
                      $scope.msg = response.msg;
                    }
                  })
                }

              } else {
                $scope.msg = "服务器累瘫了，请稍后访问。";
              }
            })
          // }
          }
        });
      }

    };

  }]);
