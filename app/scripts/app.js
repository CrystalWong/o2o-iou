'use strict';
/**
 * @ngdoc overview
 * @name o2oWechatIou
 * @description
 * # o2oWechatIou
 *
 * Main module of the application.
 */
var o2oWechatIou = angular.module('o2oWechatIou', [
  'ngAnimate',
  'ngTouch',
  // 'famous.angular',
  'ui.router',
  'restmod',
  'config',
  'ipCookie',
  'angularMoment',
  'angular-md5'
]);

o2oWechatIou
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$uiViewScrollProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $uiViewScrollProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $uiViewScrollProvider.useAnchorScroll();
    $stateProvider
      .state('register', {
        url: '/register/:openid',
        views: {
          'register': {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl',
            controllerUrl: 'scripts/controllers/register'
          }
        }
      })
      .state('root', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/root.html'
          },
          'header': {
            templateUrl: 'views/_header.html',
            controller: 'HeaderCtrl',
            controllerUrl: 'scripts/controller/header-ctrl'
          }
        }
      })
      // 去赚钱
      .state('root.main', {
        url: '/',
        views: {
          '': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerUrl: 'scripts/controllers/main'
          }
        }
      })
      .state('root.login', {
        url: '/login',
        views: {
          '': {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controllers/login'

          }
        }
      })
      .state('identity', {
        url: '/identity/:number',
        views: {
          'identity': {
            templateUrl: 'views/identity.html',
            controller: 'IdentityCtrl',
            controllerUrl: 'scripts/controllers/identity'
          }
        }
      })
      .state('root.lianlian-callback', {
        url: '/lianlian-callback/:type',
        views: {
          '': {
            templateUrl: 'views/lianlian-callback.html',
            controller: 'LianlianCallbackCtrl',
            controllerUrl: 'scripts/controllers/lianlian-callback'
          }
        }
      })
      .state('root.registration-agreement', {
        url: '/registration-agreement',
        views: {
          '': {
            templateUrl: 'views/registration-agreement.html'
          }
        }
      })
      // 个人中心
      .state('root.user-center', {
        abstract: true,
        url: '/user-center',
        views: {
          'user-center': {
            templateUrl: 'views/user-center/user-center.html'/*,
            controller: 'UserCenterCtrl',
            controllerUrl: 'scripts/controller/user-center/user-center'*/
          }
        }
      })
      //我的账户
      .state('root.user-center.account', {
        url: '/account',
        views: {
          '': {
            templateUrl: 'views/user-center/account.html',
            controller: 'AccountCtrl',
            controllerUrl: 'scripts/controllers/user-center/account'
          }
        }
      })
      
     
      // 常见问题
      .state('root.faq', {
        url: '/faq',
        views: {
          '': {
            templateUrl: 'views/faq.html',
            controller: 'FaqCtrl',
            controllerUrl: 'scripts/controllers/faq'
          }
        }
      })
      // 关于我们
      /*.state('root.about', {
        url: '/about',
        views: {
          '': {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerUrl: 'scripts/controllers/about'

          }
        }
      });*/
    $urlRouterProvider.otherwise('/');

}])
  .run(function($rootScope, $stateParams, DEFAULT_DOMAIN, $state, $location, $http, restmod) {
    var routespermission = [
      '/user-center'
    ];
    var titleMap = {'issue': '常见问题', 'about': '帮助中心', 'safe': '安全保障', 'account': '账户总览'};
    $rootScope.$on('$stateChangeStart', function() {
      // $rootScope.showTitle = titleMap[path];
      if(!$rootScope.openid) {
        var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');
        // 获取微信code
        $rootScope.wechatCodeStr = location.search.split('code=')[1];
        if($rootScope.wechatCodeStr) {
          $rootScope.wechatCode = $rootScope.wechatCodeStr.split('&state')[0];
        }
        
        if ($rootScope.wechatCode) {
          checkModel.$find($rootScope.wechatCode + '/openid').$then(function(response){
            $rootScope.openid = response.openid;
            $rootScope.userInfo = response;
            if (!response.mobile) {
              $state.go('register');
            }
          });
        }
      }
        
      
      
      
      
      /*checkModel.$find('checkSession').$then(function(response) {
        if (response.user) {
          $rootScope.isLogged = true;
          $rootScope.hasLoggedUser = response.user;
          $rootScope.securityStatus = response.securityStatus;
          $rootScope.account = response.account;
          //用户未登录状态
        } else if(response.ret === -1) {
          $rootScope.isLogged = false;
          $rootScope.hasLoggedUser = null;
          if (routespermission.indexOf('/' + $location.path().split('/')[1]) !== -1) {
            // $location.path('/login');
          }
        }
      });*/
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      var path = $location.path().split('/')[1];
      $rootScope.showPath = path;
      $rootScope.showTitle = titleMap[path];
    });
  })

  .constant('DEFAULT_DOMAIN', '/ious/rest');
