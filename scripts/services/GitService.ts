module gitconsole {
  export class GitService implements IGitService {

    private gitGraph: any;

    private currentBranch: any;

    constructor () {
      this.gitgraph = new GitGraph({
        template: "metro",
        orientation: "horizontal",
        mode: "compact"
      });

      this.CreateBranch("master");
      this.Commit("start commit");
    }

    public CreateBranch(branchName: string): void {
      this.currentBranch = this.gitgraph.branch(branchName);
    }

    public Commit(commitMessage: string): void{
      this.currentBranch.commit(commitMessage);
    }
  }
}
