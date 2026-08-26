# Hands-On Lab: Git and GitHub from the Command Line

## Objective

Git is a **version control system**. It allows programmers to keep track of changes to source code, return to earlier versions, and collaborate with other developers.

**GitHub** is an online service that can store Git repositories and allow multiple developers to collaborate on the same project.

In this lab, you will use **Git from the command line** and GitHub to manage a small C++ project.

By the end of this lab, you should be able to explain and use:

```text
git clone
git status
git add
git commit
git push
git pull
git fetch
git branch
git switch
git merge
git log
```

You will work with a partner so that you can observe how Git is used in a collaborative programming environment.

---

# 1. Understanding the Git Workflow

Before using Git, understand that your project can exist in several different places.

```text
Your Files
(Working Directory)
      |
      | git add
      v
Staging Area
      |
      | git commit
      v
Local Git Repository
      |
      | git push
      v
GitHub
(Remote Repository)
```

Changes can also travel from GitHub back to your computer:

```text
GitHub
   |
   | git pull
   v
Your Local Repository
   +
Your Working Directory
```

Each Git command performs a different operation in this workflow.

---

# 2. Create a GitHub Account

Go to:

<https://github.com/>

If you do not already have a GitHub account, create one.

You will use your GitHub account to store and share Git repositories.

---

# 3. Verify Git

Open a terminal.

- **Windows:** PowerShell, Command Prompt, or Git Bash
- **macOS:** Terminal
- **Linux:** Terminal

Run:

```bash
git --version
```

### What does this command do?

`git --version` checks whether Git is installed and displays the installed version.

Now check your Git identity:

```bash
git config --global user.name
git config --global user.email
```

Git records the author of every commit. Therefore, Git needs to know your name and email address.

If necessary, configure them:

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

Use the email address associated with your GitHub account.

---

# 4. Create a Public GitHub Repository

For this exercise, **Student A** will create the repository.

Sign in to GitHub.

1. Click the **+** menu in the upper-right corner.
2. Select **New repository**.
3. Enter:

```text
cpp-git-practice
```

4. Under **Visibility**, select **Public**.
5. Select **Add a README file**.
6. Click **Create repository**.

### What is a repository?

A **repository**, often called a **repo**, is a project that Git tracks.

It contains your project files along with the history of changes that have been committed to the project.

### What does Public mean?

A public GitHub repository can be viewed and cloned by anyone.

However, **public does not mean that everyone can modify the repository**. Someone still needs permission to push changes.

---

# 5. Add Your Partner as a Collaborator

Student A owns the repository.

For Student B to push changes to Student A's repository, Student B must be added as a collaborator.

Student A should:

1. Open the repository.
2. Select **Settings**.
3. Select **Collaborators**.
4. Select **Add people**.
5. Search for Student B's GitHub username.
6. Send the invitation.

Student B should accept the invitation.

### Why is this necessary?

Anyone can **clone** a public repository.

However, only authorized users can **push** changes directly to the repository.

Adding Student B as a collaborator gives Student B permission to contribute changes.

---

# 6. Copy the Repository URL

Open the repository on GitHub.

Select:

**Code → HTTPS**

Copy the repository URL.

It should look similar to:

```text
https://github.com/username/cpp-git-practice.git
```

This URL identifies the remote GitHub repository.

---

# 7. Clone the Repository

Both students should now create a copy of the GitHub repository on their computers.

Navigate to where you want to store the project.

For example:

```bash
cd Desktop
```

Then:

```bash
git clone <repository-url>
```

For example:

```bash
git clone https://github.com/username/cpp-git-practice.git
```

Enter the repository:

```bash
cd cpp-git-practice
```

### What is `git clone`?

`git clone` creates a **local copy of an existing Git repository**.

It downloads:

- Project files
- Commit history
- Branch information
- Information about the remote repository

Conceptually:

```text
GitHub Repository
       |
       | git clone
       v
Your Computer
```

You normally use `git clone` **once**, when you first obtain a project.

---

# 8. Check Repository Status

Run:

```bash
git status
```

### What is `git status`?

`git status` tells you the current state of your working directory and staging area.

It can tell you:

- Which files have changed.
- Which files are untracked.
- Which files are staged.
- Which branch you are using.
- Whether your branch differs from the remote branch.

Use `git status` **frequently** while working with Git.

---

# 9. Create Your First C++ Program

### Student A

Create `main.cpp`:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello from Git!" << std::endl;
    return 0;
}
```

Save the file and run:

```bash
git status
```

### What does untracked mean?

Git can see the file, but Git is not currently tracking it as part of the project's version history.

### Questions

1. Does Git recognize `main.cpp`?
2. Why does Git call the file untracked?
3. Has `main.cpp` been committed yet?

---

# 10. Stage the File with `git add`

Run:

```bash
git add main.cpp
git status
```

### What is `git add`?

`git add` tells Git to include a change in the next commit.

```text
Working Directory
       |
       | git add
       v
Staging Area
```

The **staging area** allows you to choose which changes will be included in your next commit.

---

# 11. Create a Commit

Run:

```bash
git commit -m "Add initial C++ program"
```

### What is a commit?

A **commit** records a snapshot of your staged changes in your **local Git repository**.

Think of a commit as a meaningful checkpoint in the history of your project.

```text
Staging Area
     |
     | git commit
     v
Local Repository
```

View the history:

```bash
git log
```

### What is `git log`?

`git log` displays the commit history, including commit identifiers, authors, dates, and messages.

Your commit currently exists **only on your computer**. It has not yet been sent to GitHub.

---

# 12. GitHub Authentication

Before pushing your commit, you may need to authenticate with GitHub.

## Do Not Use Your GitHub Password

GitHub does **not** accept your regular GitHub account password for Git operations over HTTPS.

When you run `git push`, your Git installation may open a browser and ask you to sign in to GitHub. If that happens, sign in, authorize Git, and return to the terminal.

## Personal Access Token

If Git specifically asks for a username and password, use a **Personal Access Token (PAT)** instead of your GitHub password.

On GitHub:

1. Open your profile picture.
2. Select **Settings**.
3. Select **Developer settings**.
4. Select **Personal access tokens**.
5. Select **Fine-grained tokens**.
6. Select **Generate new token**.
7. Give the token a descriptive name, such as `CISC Git`.
8. Set an expiration date.
9. Select the repository or repositories the token should access.
10. Give the token the repository permissions necessary to work with the repository.
11. Generate the token.
12. Copy and securely save the token.

If Git asks for `Username:`, enter your GitHub username.

If Git asks for `Password:`, enter your **Personal Access Token**, not your GitHub password.

Treat a PAT like a password. Never put it in source code, commit it, upload it, share it, or include it in screenshots.

---

# 13. Push the Commit to GitHub

Student A should run:

```bash
git push
```

If necessary:

```bash
git push origin main
```

### What is `git push`?

`git push` sends commits from your **local Git repository** to a **remote repository**, such as GitHub.

```text
Your Computer
Local Repository
       |
       | git push
       v
GitHub
Remote Repository
```

### Important distinction

`git commit` saves a change to your **local repository**.

`git push` sends those commits to the **remote GitHub repository**.

A commit does not automatically appear on GitHub.

---

# 14. Student B Uses `git pull`

Student A has pushed `main.cpp` to GitHub. Student B's local repository does not yet contain this change.

Student B runs:

```bash
git status
git pull
```

### What is `git pull`?

`git pull` retrieves the latest changes from a remote repository and integrates them into your current local branch.

```text
GitHub
   |
   | git pull
   v
Your Local Repository
   +
Working Directory
```

When collaborating, it is useful to first run `git fetch` and `git status` so you can see whether the remote repository has changes that your local branch does not yet contain. If your branch is behind, use `git pull` to integrate those changes before beginning your work.

### Why check before working?

Your partner may have changed the project since you last worked on it. Using `git fetch` followed by `git status` lets you check the remote state without immediately changing your working files. If your branch is behind, `git pull` brings those remote changes into your local branch so you can begin from the latest shared version.

---

# 15. Student B Makes a Change

Student B modifies `main.cpp`:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello from Git!" << std::endl;
    std::cout << "This line was added by Student B." << std::endl;
    return 0;
}
```

Perform the complete workflow:

```bash
git status
git add main.cpp
git status
git commit -m "Add message from Student B"
git push
```

Think about the flow:

```text
Modified File
     |
     | git add
     v
Staging Area
     |
     | git commit
     v
Local Repository
     |
     | git push
     v
GitHub
```

---

# 16. Student A Pulls Student B's Change

Student A runs:

```bash
git pull
```

Open `main.cpp`. Student A should now see Student B's modification.

---

# 17. Understanding `git fetch`

### What is `git fetch`?

`git fetch` contacts the remote repository and downloads information about new commits and branches.

However, it **does not immediately integrate those changes into your current local branch**.

This allows you to inspect remote changes before integrating them.

```text
GitHub
   |
   | git fetch
   v
Remote-tracking information
on your computer

Your current branch is
not automatically changed.
```

---

# 18. Practice `git fetch`

### Student A

Add another line to `main.cpp`:

```cpp
std::cout << "Another change from Student A." << std::endl;
```

Then:

```bash
git status
git add main.cpp
git commit -m "Add another message"
git push
```

### Student B

Do **not** run `git pull`.

Instead:

```bash
git fetch
git status
```

Compare:

```bash
git log main
git log origin/main
```

### What is `origin/main`?

`origin` is the default name Git normally gives to the remote repository when you clone it.

- `main` represents your local `main` branch.
- `origin/main` represents your local remote-tracking reference for the remote `main` branch.

After `git fetch`, `origin/main` can move forward while your local `main` remains unchanged.

### Questions

1. Did `git fetch` change `main.cpp`?
2. Did Git learn about Student A's new commit?
3. Are `main` and `origin/main` currently at the same commit?

---

# 19. Merge the Fetched Changes

Student B runs:

```bash
git merge origin/main
```

### What is `git merge`?

`git merge` combines changes from another branch or commit history into your **current branch**.

In this case, the command integrates the fetched `origin/main` changes into Student B's current branch.

When the histories are compatible, Git may perform the merge automatically.

---

# 20. `git fetch` + `git merge` vs. `git pull`

At an introductory level:

```text
git pull
   ≈
git fetch
   +
git merge
```

With `git pull`, Git retrieves and integrates remote changes as part of one operation.

With `git fetch`, you can retrieve information first, inspect what changed, and then decide when to merge it.

---

# 21. Understanding Branches

A **branch** allows you to develop something separately from the main line of development.

```text
main
  |
  A ---- B
          \
           C ---- D    feature
```

You can experiment on `feature` without immediately changing `main`. Later, the feature can be merged into `main`.

---

# 22. Create a Branch

Create and switch to a branch named `feature`:

```bash
git switch -c feature
```

Check your branches:

```bash
git branch
```

### What is `git branch`?

`git branch` displays your local branches. The `*` indicates your current branch.

### What is `git switch`?

`git switch` changes which branch you are currently working on.

`git switch -c feature` creates a new branch named `feature` and immediately switches to it.

---

# 23. Make a Change on the Feature Branch

Modify `main.cpp` and add:

```cpp
std::cout << "Feature branch is working." << std::endl;
```

Then:

```bash
git status
git add main.cpp
git commit -m "Add feature branch message"
```

This commit belongs to the `feature` branch.

---

# 24. Merge the Feature into `main`

Switch back:

```bash
git switch main
```

Then merge:

```bash
git merge feature
```

### Why did we merge?

The new work was developed separately on `feature`. Once the feature is ready, `git merge feature` integrates it into the current `main` branch.

Push the result:

```bash
git push
```

---

# 25. Partner Challenge

Complete a collaborative workflow with less guidance.

## Student A

Create `studentA.cpp` with a simple C++ program.

Use Git to:

1. Determine what changed.
2. Stage the file.
3. Record the change locally.
4. Send the commit to GitHub.

## Student B

Retrieve Student A's changes and verify that `studentA.cpp` appears.

Create `studentB.cpp`, record the change, and upload it.

## Student A

Retrieve Student B's changes.

At the end, both students should have:

```text
README.md
main.cpp
studentA.cpp
studentB.cpp
```

---

# 26. Command Challenge

For each situation, write both the **command** and its **purpose**.

### 1. You want to determine which files have changed.

```text
Command: ___________________________________

Purpose:

________________________________________________________
```

### 2. You want to prepare `main.cpp` for the next commit.

```text
Command: ___________________________________

Purpose:

________________________________________________________
```

### 3. You want to record your staged changes in your local repository.

```text
Command: ___________________________________

Purpose:

________________________________________________________
```

### 4. You want to send your local commits to GitHub.

```text
Command: ___________________________________

Purpose:

________________________________________________________
```

### 5. Your partner pushed new code and you want to retrieve and integrate it.

```text
Command: ___________________________________

Purpose:

________________________________________________________
```

### 6. You want to check for remote changes without immediately integrating them into your branch.

```text
Command: ___________________________________

Purpose:

________________________________________________________
```

### 7. You have fetched `origin/main` and now want to integrate it.

```text
Command: ___________________________________

Purpose:

________________________________________________________
```

### 8. You want to see previous commits.

```text
Command: ___________________________________

Purpose:

________________________________________________________
```

---

# 27. Essential Git Commands

| Command | What it does | When you use it |
|---|---|---|
| `git clone URL` | Creates a local copy of an existing repository | When obtaining a project for the first time |
| `git status` | Shows the current state of your files and staging area | Frequently while working |
| `git add file` | Places a change into the staging area | Before committing |
| `git commit -m "message"` | Records staged changes in the local repository | When creating a meaningful checkpoint |
| `git push` | Sends local commits to the remote repository | When sharing your commits through GitHub |
| `git pull` | Retrieves and integrates remote changes | When synchronizing with collaborators |
| `git fetch` | Retrieves information about remote changes without immediately integrating them | When you want to inspect remote changes first |
| `git merge branch` | Integrates another branch into your current branch | When combining development histories |
| `git branch` | Displays local branches | When examining branches |
| `git switch branch` | Changes your current branch | When moving between lines of development |
| `git switch -c branch` | Creates and switches to a new branch | When starting separate development |
| `git log` | Displays commit history | When examining previous commits |

---

# 28. The Everyday Git Workflow

## Before you start

```bash
git fetch
git status
```

**Purpose:** Check the remote repository for new commits and then determine whether your local branch is ahead of or behind the remote branch.

`git fetch` retrieves information about changes from the remote repository without immediately integrating those changes into your current branch. `git status` then helps you determine whether your local branch is up to date.

If Git reports that your branch is behind the remote branch, integrate the remote changes before beginning your work:

```bash
git pull
```

This workflow helps distinguish between checking for remote changes and integrating them:

```text
git fetch   → Check/download information about remote changes
git status  → Determine whether your local branch is ahead, behind, or up to date
git pull    → Retrieve and integrate remote changes when needed
```

## Make your changes

Edit your source code.

## Examine your changes

```bash
git status
```

**Purpose:** Determine what Git sees as modified or untracked.

## Stage the changes

```bash
git add .
```

**Purpose:** Select changes for your next commit.

## Verify the staging area

```bash
git status
```

**Purpose:** Make sure you are committing what you intended.

## Create a checkpoint

```bash
git commit -m "Describe what you changed"
```

**Purpose:** Record the staged changes in your local repository.

## Share your work

```bash
git push
```

**Purpose:** Upload your commits to GitHub so collaborators can access them.

---

# 29. Git Mental Model

Do not think of Git as simply an "upload" system.

Think about **where your changes currently exist**:

```text
Working Directory
      |
      | git add
      v
Staging Area
      |
      | git commit
      v
Local Repository
      |
      | git push
      v
Remote Repository (GitHub)
```

Understanding this model is more important than memorizing individual commands.

---

# 30. Completion Requirements

Before completing this lab, make sure you can explain **what each operation does**, not simply execute the command.

- [ ] Explain the difference between Git and GitHub.
- [ ] Create a public GitHub repository.
- [ ] Add a partner as a collaborator.
- [ ] Explain and perform `git clone`.
- [ ] Explain and perform `git status`.
- [ ] Explain the purpose of the staging area.
- [ ] Explain and perform `git add`.
- [ ] Explain and perform `git commit`.
- [ ] Explain the difference between a commit and a push.
- [ ] Explain and perform `git push`.
- [ ] Explain and perform `git pull`.
- [ ] Explain the difference between `git pull` and `git fetch`.
- [ ] Explain and perform `git fetch`.
- [ ] Explain the purpose of a branch.
- [ ] Create and switch branches.
- [ ] Explain and perform `git merge`.
- [ ] Collaborate with another student using GitHub.

## Final Repository

Your public GitHub repository should contain at least:

```text
README.md
main.cpp
studentA.cpp
studentB.cpp
```

Both students must make and push at least one commit.

Before leaving the lab, open the repository on GitHub and verify that your team's changes are visible.

---

# Final Question

Without looking at the command table, explain in your own words what happens during:

```text
git add
    ↓
git commit
    ↓
git push
```

Then explain how another developer can obtain your changes using:

```text
git pull
```

The goal of this lab is not simply to memorize Git commands. You should understand **where your code is, what state it is in, and why you are performing each Git operation**.
