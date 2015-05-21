'use strict';
angular.module('o2oWechatIou')
  .factory('HongcaiUser', function(restmod) {
    return restmod.model('/hongcai/rest/users');
  });
