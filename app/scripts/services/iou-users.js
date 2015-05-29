'use strict';
angular.module('o2oWechatIou')
  .factory('IouUser', function(restmod) {
    return restmod.model('/ious/rest/users');
  });
