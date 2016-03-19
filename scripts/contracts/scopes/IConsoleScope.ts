export interface IConsoleScope extends ng.IScope {
  EnterPressed: (keyEvent: any) => void;
  ConsoleCommand: string;
  ConsoleOutput: string;
}
