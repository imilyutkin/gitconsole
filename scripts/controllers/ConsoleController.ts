module gitconsole {
  export class ConsoleCtrl  {
    constructor(private $scope: IConsoleScope, private $sce: any, private CommandHandler: ICommandHandler, private GitService: IGitService){
      $scope.EnterPressed = (keyEvent) => this.PressEnter(keyEvent);
      this.$scope.ConsoleOutput = this.$sce.trustAsHtml("<span style='color: red;'>this is main branch :)</span>");
      this.PrintStatusLine();
    }

    private PrintStatusLine(): void {

    }

    private PressEnter(keyEvent: any) : void {
      if (keyEvent.which === 13) {
        var comand = this.CommandHandler.Parse(this.$scope.ConsoleCommand );
        comand.Execute();
        this.PrintStatusLine(); //надо ввести понятие состояния, чтобы можно было шарить текущее состояние веток и прочее
        this.PrintCurrentCommand();
      }
    }

    private PrintCurrentCommand(): void {
      var text = this.$scope.ConsoleOutput + ("\r\n" + this.$scope.ConsoleCommand);
      this.$scope.ConsoleOutput = this.$sce.trustAsHtml(text);
      this.$scope.ConsoleCommand = "";
      $("#consoleOutput").scrollTop($(".console-line-start").offset().top);​
    }
  }

  export interface IConsoleScope extends ng.IScope {
    EnterPressed: (keyEvent: any) => void;
    ConsoleCommand: string;
    ConsoleOutput: string;
  }
}
