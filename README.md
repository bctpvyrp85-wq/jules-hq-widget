# Jules HQ Status Widget

A lightweight, open-source **Scriptable widget for iPhone** that displays a few operational metrics from a public JSON status feed. No account, API key, backend, or paid service is required to use the widget.

> This repository is a reusable widget project — **not** the source code of the private Jules HQ application.

## Features

- Small and medium iOS home-screen layouts
- Employee, pending-task, completed-task, and review counts
- Last-update timestamp and a clear error state if data cannot be loaded
- Configurable HTTPS JSON endpoint
- Example data, JSON Schema, and automated validation
- No external dependencies or analytics

## Quick start

1. Install the [Scriptable](https://scriptable.app/) iOS app.
2. Create a new script and paste [StatusWidget.js](scriptable/StatusWidget.js).
3. Edit \`SETTINGS.statusUrl\` at the top of the script to point to your own publicly accessible HTTPS JSON endpoint. The included URL points to this repository's existing public status snapshot as a working example.
4. Run the script once in Scriptable to preview it.
5. Add a **Scriptable** widget to your iPhone home screen, then select the saved script.

**Important:** If you use a private backend, publish only a deliberately sanitized status file. Never put passwords, private tokens, personal details, or private API URLs in a public repository.

## Status JSON

The default example points to [status.json](status.json), a manually published public snapshot. It is **not live telemetry**; the displayed date tells you how old the last snapshot is.

You can use your own endpoint with this structure:

\`\`\`json
{
  "employees": 12,
  "pending": 4,
  "completed": 7,
  "inReview": 1,
  "updatedAt": "2026-11-08T12:00:00Z",
  "source": "public-demo"
}
\`\`\`

All four counts must be non-negative integers. \`updatedAt\` must be an ISO-8601 date-time string. \`source\` is optional. See [data format documentation](docs/status-format.md) and the [JSON Schema](schema/status.schema.json).

## Validation and development

Node.js 20 or later is recommended for contributors. No npm install is necessary.

\`\`\`sh
node scripts/validate-status.mjs
node --check --input-type=module < scriptable/StatusWidget.js
\`\`\`

The first command validates both \`status.json\` and \`examples/status.example.json\`. GitHub Actions runs both checks on changes to the repository.

The Scriptable app is required to preview the actual iPhone widget; passing the checks does not replace device testing.

## Contributing

Bug reports, improvements to accessibility, translations, and new layouts are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request. Please avoid including private information in issues.

## Roadmap

- [ ] More widget themes and accessibility improvements
- [ ] Optional stale-data indicator
- [ ] Additional compact layouts
- [ ] Better automated UI-level testing

## License

MIT — see [LICENSE](LICENSE). This license covers the code and documentation in **this public repository**, not any separate private Jules HQ repositories.
