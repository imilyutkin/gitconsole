module gitconsole {

  export class GitConsoleApp {
    constructor() {
      var timelineApp = angular.module('gitconsole', [])
        .controller('startCtrl', ['$scope', StartCtrl]);
    }
  }
}
