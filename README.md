# IronLog

Project subagents live in `.claude/agents/`:

| Agent | Model | Role |
|---|---|---|
| story-writer | Sonnet | Turns feature ideas into user stories with acceptance criteria |
| requirements-reviewer | Opus | Reviews stories for gaps, ambiguity, untestable criteria |
| implementer | Sonnet | Implements one story at a time, with tests |
| code-reviewer | Opus | Read-only review of changes against acceptance criteria |
| test-writer | Sonnet | Writes test cases and automated tests from stories |
| test-runner | Haiku | Runs build/lint/tests and summarizes results |
