module gitconsole {
  export interface IGitService {
    CreateBranch(branchName: string);

    Commit(commitMessage: string);

    Checkout(branchName: string);
  }
}
