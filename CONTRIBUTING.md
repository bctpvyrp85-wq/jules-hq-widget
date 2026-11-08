# Contributing

Thank you for helping improve this public Scriptable widget!

## Good first contributions

- Improve the small or medium widget layout
- Translate setup instructions
- Improve contrast or accessibility
- Add documentation for safely publishing a read-only status snapshot
- Report reproducible bugs without disclosing private data

## Workflow

1. Open an issue describing the change, or fork the repository.
2. Make a focused change in a descriptive branch.
3. Run \`node scripts/validate-status.mjs\` and \`node --check --input-type=module < scriptable/StatusWidget.js\`.
4. If you change UI behavior, describe how you tested it in the Scriptable iOS app.
5. Submit a pull request that explains the change and links any relevant issue.

Please do not add credentials, personal data, or URLs pointing at private systems. Never modify the public \`status.json\` just to invent usage or activity.
