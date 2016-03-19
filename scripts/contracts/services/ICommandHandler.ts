module gitconsole{
  export interface ICommandHandler {
    Parse(command: string): ICommand;
  }
}
