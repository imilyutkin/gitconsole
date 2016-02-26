var gitconsole;
(function (gitconsole) {
    var GitConsoleApp = (function () {
        function GitConsoleApp() {
            var timelineApp = angular.module('gitconsole', [])
                .controller('startCtrl', ['$scope', gitconsole.StartCtrl]);
        }
        return GitConsoleApp;
    })();
    gitconsole.GitConsoleApp = GitConsoleApp;
})(gitconsole || (gitconsole = {}));
var gitconsole;
(function (gitconsole) {
    var StartCtrl = (function () {
        function StartCtrl($scope) {
            var gitgraph = new GitGraph({
                template: "metro",
                orientation: "horizontal",
                mode: "compact"
            });
            var master = gitgraph.branch("master");
            gitgraph.commit().commit().commit(); // 3 commits upon HEAD
            var develop = gitgraph.branch("develop"); // New branch from HEAD
            var myfeature = develop.branch("myfeature"); // New branch from develop
            // Well, if you need to go deeper…
            var hotfix = gitgraph.branch({
                parentBranch: develop,
                name: "hotfix",
                column: 2 // which column index it should be displayed in
            });
            develop.commit().commit();
            master.commit().commit().commit();
            hotfix.commit().commit().commit();
            develop.commit();
            hotfix.merge(develop);
            develop.merge(master);
            master.commit().commit().commit().commit().commit().commit().commit().commit().commit().commit().commit().commit().commit().commit();
        }
        return StartCtrl;
    })();
    gitconsole.StartCtrl = StartCtrl;
})(gitconsole || (gitconsole = {}));
