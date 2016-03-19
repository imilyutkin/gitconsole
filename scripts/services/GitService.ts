module gitconsole {
  export class GitService implements IGitService {

    private gitGraph: any;

    private currentBranch: any;

    constructor (private $filter: ng.IFilterService) {
      this.gitGraph = new GitGraph({
        template: "metro",
        orientation: "horizontal",
        mode: "compact"
      });

      this.CreateBranch("master");
      this.Commit("start commit");
    }

    public CreateBranch(branchName: string): void {
      this.currentBranch = this.gitGraph.branch(branchName);
    }

    public Commit(commitMessage: string): void{
      this.currentBranch.commit(commitMessage);
    }

    public Checkout(branchName: string) {
      var branch = this.GetBranch(branchName);
      this.currentBranch = branch;
      this.currentBranch.checkout();
    }

    private GetBranch(branchName: string): any {
      var targetBranch = this.$filter('filter')(this.gitGraph.branches, { name: branchName })[0];
      return targetBranch;
    }
  }
}
