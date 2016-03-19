module gitconsole {
  export class CommandHandler implements ICommandHandler {
    constructor(private GitService: IGitService){

    }

    public Parse(command: string): ICommand {
      this.GitService.Commit(command);
      this.GitService.CreateBranch("develop");
      this.GitService.Commit("test 1");
      this.GitService.Commit("test 2");

      this.GitService.Checkout("master");
      this.GitService.Commit("hello master");

      return {
        Execute: function() {
          console.log(command);
        }
      };
    }
  }
}
