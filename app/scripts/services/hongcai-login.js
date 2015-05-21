'use strict';

/**
 * @ngdoc service
 * @name o2oWechatIou.hongcaiLogin
 * @description
 * # hongcaiLogin
 * Service in the o2oWechatIou.
 */
angular.module('o2oWechatIou')
  .service('HongcaiLogin', function (restmod, DEFAULT_DOMAIN) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      userLogin : restmod.model(DEFAULT_DOMAIN + '/users/login')
    };
  });
