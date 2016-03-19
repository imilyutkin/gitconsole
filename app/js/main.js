var gitconsole;
(function (gitconsole) {
    var GitConsoleApp = (function () {
        function GitConsoleApp() {
            var timelineApp = angular.module('gitconsole', [])
                .service('CommandHandler', ['GitService', gitconsole.CommandHandler])
                .service('GitService', [gitconsole.GitService])
                .controller('consoleCtrl', ['$scope', '$sce', 'CommandHandler', 'GitService', gitconsole.ConsoleCtrl]);
        }
        return GitConsoleApp;
    })();
    gitconsole.GitConsoleApp = GitConsoleApp;
})(gitconsole || (gitconsole = {}));
var gitconsole;
(function (gitconsole) {
    var ConsoleCtrl = (function () {
        function ConsoleCtrl($scope, $sce, CommandHandler, GitService) {
            var _this = this;
            this.$scope = $scope;
            this.$sce = $sce;
            this.CommandHandler = CommandHandler;
            this.GitService = GitService;
            $scope.EnterPressed = function (keyEvent) { return _this.PressEnter(keyEvent); };
            this.$scope.ConsoleOutput = this.$sce.trustAsHtml("<span style='color: red;'>this is main branch :)</span>");
            this.PrintStatusLine();
        }
        ConsoleCtrl.prototype.PrintStatusLine = function () {
        };
        ConsoleCtrl.prototype.PressEnter = function (keyEvent) {
            if (keyEvent.which === 13) {
                var comand = this.CommandHandler.Parse(this.$scope.ConsoleCommand);
                comand.Execute();
                this.PrintStatusLine(); //надо ввести понятие состояния, чтобы можно было шарить текущее состояние веток и прочее
                this.PrintCurrentCommand();
            }
        };
        ConsoleCtrl.prototype.PrintCurrentCommand = function () {
            var text = this.$scope.ConsoleOutput + ("\r\n" + this.$scope.ConsoleCommand);
            this.$scope.ConsoleOutput = this.$sce.trustAsHtml(text);
            this.$scope.ConsoleCommand = "";
            $("#consoleOutput").scrollTop($(".console-line-start").offset().top);
        };
        return ConsoleCtrl;
    })();
    gitconsole.ConsoleCtrl = ConsoleCtrl;
})(gitconsole || (gitconsole = {}));
var gitconsole;
(function (gitconsole) {
    var CommandHandler = (function () {
        function CommandHandler(GitService) {
            this.GitService = GitService;
        }
        CommandHandler.prototype.Parse = function (command) {
            this.GitService.Commit(command);
            return {
                Execute: function () {
                    console.log(command);
                }
            };
        };
        return CommandHandler;
    })();
    gitconsole.CommandHandler = CommandHandler;
})(gitconsole || (gitconsole = {}));
var gitconsole;
(function (gitconsole) {
    var GitService = (function () {
        function GitService() {
            this.gitgraph = new GitGraph({
                template: "metro",
                orientation: "horizontal",
                mode: "compact"
            });
            this.CreateBranch("master");
            this.Commit("start commit");
        }
        GitService.prototype.CreateBranch = function (branchName) {
            this.currentBranch = this.gitgraph.branch(branchName);
        };
        GitService.prototype.Commit = function (commitMessage) {
            this.currentBranch.commit(commitMessage);
        };
        return GitService;
    })();
    gitconsole.GitService = GitService;
})(gitconsole || (gitconsole = {}));
