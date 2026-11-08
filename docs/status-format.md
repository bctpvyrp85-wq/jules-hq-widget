# Status feed format

Provide a **public HTTPS URL** that returns a JSON object. The widget does not authenticate requests. Do not expose a private backend or include any credentials in the URL.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| \`employees\` | integer >= 0 | Yes | Number of employees |
| \`pending\` | integer >= 0 | Yes | Pending tasks |
| \`completed\` | integer >= 0 | Yes | Completed tasks |
| \`inReview\` | integer >= 0 | Yes | Tasks under review |
| \`updatedAt\` | ISO-8601 date-time string | Yes | Time the snapshot was created |
| \`source\` | string | No | Optional source label |

The counters represent distinct categories, not necessarily a partition of one total. Do not assume they add up to a specific number.

## Publishing safely

1. Generate an explicit allowlist of just the six fields above.
2. Exclude names, emails, private issue details, secrets, access tokens, and internal endpoints.
3. Review the generated JSON before publishing it publicly.
4. Update \`updatedAt\` only when a new snapshot is actually written.
5. Keep an explicit distinction between snapshot age and how often Scriptable refreshes.

## Validation

Run \`node scripts/validate-status.mjs\` from the repository root. GitHub Actions also validates the sample and repository feed on every relevant push or pull request.

Reference: [JSON Schema](../schema/status.schema.json).
