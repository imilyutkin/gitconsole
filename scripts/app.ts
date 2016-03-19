module gitconsole {

  export class GitConsoleApp {
    constructor() {
      var timelineApp = angular.module('gitconsole', [])
        .service('CommandHandler', ['GitService', CommandHandler])
        .service('GitService', ['$filter', GitService])
        .controller('consoleCtrl', ['$scope', '$sce', 'CommandHandler', 'GitService', ConsoleCtrl]);
    }
  }
}
