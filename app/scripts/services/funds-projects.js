'use strict';

/**
 * @ngdoc service
 * @name o2oWechatIou.fundsProjects
 * @description
 * # fundsProjects
 * Service in the o2oWechatIou.
 */
angular.module('o2oWechatIou')
  .service('fundsProjects', function (restmod, DEFAULT_DOMAIN) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return restmod.model(DEFAULT_DOMAIN + '/fundsProjects');
  });
