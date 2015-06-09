'use strict';
angular.module('o2oWechatIou')
  .controller('HeaderCtrl', ['$scope', '$location', '$state', '$rootScope', '$stateParams', 'restmod', 'DEFAULT_DOMAIN', 'config', function($scope, $location, $state, $rootScope, $stateParams, restmod, DEFAULT_DOMAIN, config) {

    $rootScope.showMe = false;
    $scope.toggle = function () {
        $rootScope.showMe = !$rootScope.showMe;
    };

    $scope.config = config;
    // 退出登录功能
    $scope.toLogout = function() {
      // var
      if ($rootScope.hasLoggedUser) {
        // TODO  登出的model在这里不太好吧。
        var logoutModel = restmod.model(DEFAULT_DOMAIN + '/users/' + $rootScope.hasLoggedUser.id + '/logout');
        logoutModel.$create().$then(function(response) {
          if (response.ret === 1) {
            $rootScope.hasLoggedUser = null;
            $rootScope.isLogged = false;
            $state.go('root.main');
          }
        });
      } else {
        // 没登录怎么登出
      }
    };

  }]);
