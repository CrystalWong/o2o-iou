'use strict';

/**
 * @ngdoc service
 * @name o2oWechatIou.login
 * @description
 * # login
 * Service in the o2oWechatIou.
 */
angular.module('o2oWechatIou')
  .service('wechat', function (restmod) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      login: restmod.model('/ipa/hongcai/users/login'),
      signUp: restmod.model('/ipa/hongcai/users/signup')
    };
  });
