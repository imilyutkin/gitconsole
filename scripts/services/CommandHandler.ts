module gitconsole {
  export class CommandHandler implements ICommandHandler {
    constructor(private GitService: IGitService){

    }

    public Parse(command: string): ICommand {
      this.GitService.Commit(command);
      return {
        Execute: function() {
          console.log(command);
        }
      };
    }
  }
}
