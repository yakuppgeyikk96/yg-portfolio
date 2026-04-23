---
name: smart-commit
description: Analyze git changes, group them logically, and create well-structured commits
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(ls *) Read Glob Grep
---

# Smart Commit

Analyze the current git working tree and create logically grouped commits. Follow these steps carefully:

## Step 1: Analyze Changes

1. Run `git status` to see all changed, added, and deleted files.
2. Run `git diff` to see unstaged changes.
3. Run `git diff --cached` to see staged changes.
4. Run `git log --oneline -10` to understand recent commit style and convention.

If there are no changes, inform the user and stop.

## Step 2: Group Changes Logically

Analyze all changes and group them into logical commits based on:

- **By feature/purpose**: Changes that serve the same goal go together (e.g., a new component + its types + its route = one commit).
- **By scope**: Config changes separate from code changes, style changes separate from logic changes.
- **By type**: Separate concerns like refactoring, bug fixes, new features, dependency updates, cleanup.

Present the proposed commit groups to the user in a clear table format:

```
| Commit # | Type | Files | Message |
|----------|------|-------|---------|
| 1        | ...  | ...   | ...     |
| 2        | ...  | ...   | ...     |
```

## Step 3: Wait for Confirmation

Ask the user if they approve the grouping or want changes. Do NOT proceed without confirmation.

## Step 4: Execute Commits

For each approved group, in order:

1. Stage only the relevant files: `git add <file1> <file2> ...`
2. Create the commit with a clear, conventional message using this format:

```
<type>(<scope>): <short description>

<optional body explaining why>

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

**Commit types**: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `test`, `perf`

3. Use a HEREDOC for the commit message to preserve formatting.

## Step 5: Summary

After all commits are created, run `git log --oneline -<N>` (where N = number of new commits) to show the result.

## Rules

- Never use `git add -A` or `git add .` — always add specific files.
- Never amend existing commits.
- Never force push.
- Never skip hooks (no `--no-verify`).
- Commit messages should be in English.
- Keep commit messages concise but descriptive.
- If a single logical change touches many files, that's still ONE commit.
- If unrelated changes exist in the same file, mention this to the user.
