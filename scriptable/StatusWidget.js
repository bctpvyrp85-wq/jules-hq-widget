// Jules HQ Status Widget — public, reusable Scriptable example.
// Install in the Scriptable iOS app: https://scriptable.app/
// Do not place secrets or private endpoints in a public status feed.

const SETTINGS = {
  // Replace with your own publicly accessible HTTPS JSON endpoint.
  statusUrl: "https://raw.githubusercontent.com/bctpvyrp85-wq/jules-hq-widget/main/status.json",
  title: "HQ STATUS",
  refreshMinutes: 30,
};

const COLORS = {
  background: "#111827",
  panel: "#1f2937",
  text: "#f9fafb",
  muted: "#9ca3af",
  accent: "#93c5fd",
};

function normalizeStatus(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Status must be a JSON object");
  }
  const fields = ["employees", "pending", "completed", "inReview"];
  for (const field of fields) {
    if (!Number.isInteger(data[field]) || data[field] < 0) {
      throw new Error("Invalid field: " + field);
    }
  }
  if (typeof data.updatedAt !== "string" || Number.isNaN(Date.parse(data.updatedAt))) {
    throw new Error("Invalid updatedAt");
  }
  return data;
}

async function getStatus() {
  const url = SETTINGS.statusUrl.trim();
  if (!/^https:\/\//i.test(url)) {
    throw new Error("Set a public HTTPS statusUrl in SETTINGS");
  }
  const request = new Request(url);
  request.timeoutInterval = 15;
  return normalizeStatus(await request.loadJSON());
}

function addLabel(stack, value, size, color, bold = false) {
  const text = stack.addText(String(value));
  text.font = bold ? Font.boldSystemFont(size) : Font.systemFont(size);
  text.textColor = new Color(color);
  text.lineLimit = 1;
  text.minimumScaleFactor = 0.75;
  return text;
}

function addMetric(row, label, count) {
  const card = row.addStack();
  card.layoutVertically();
  card.backgroundColor = new Color(COLORS.panel);
  card.cornerRadius = 10;
  card.setPadding(5, 10, 5, 10);
  card.size = new Size(125, 42);
  addLabel(card, label, 9, COLORS.muted);
  card.addSpacer(2);
  addLabel(card, count, 17, COLORS.text, true);
}

function drawWidget(status, error) {
  const widget = new ListWidget();
  widget.backgroundColor = new Color(COLORS.background);
  widget.setPadding(12, 14, 11, 14);
  widget.refreshAfterDate = new Date(Date.now() + SETTINGS.refreshMinutes * 60 * 1000);

  const header = widget.addStack();
  header.centerAlignContent();
  addLabel(header, SETTINGS.title, 13, COLORS.accent, true);
  header.addSpacer();
  addLabel(header, error ? "OFFLINE" : "SNAPSHOT", 9, COLORS.muted);

  widget.addSpacer(7);

  if (error) {
    addLabel(widget, "Status unavailable", 16, COLORS.text, true);
    widget.addSpacer(6);
    addLabel(widget, "Check your public URL and JSON format.", 11, COLORS.muted);
    widget.addSpacer();
    return widget;
  }

  if (config.widgetFamily === "small") {
    addLabel(widget, "Pending: " + status.pending, 16, COLORS.text, true);
    widget.addSpacer(5);
    addLabel(widget, "Completed: " + status.completed, 14, COLORS.text);
    widget.addSpacer(5);
    addLabel(widget, "In review: " + status.inReview, 12, COLORS.muted);
  } else {
    const top = widget.addStack();
    addMetric(top, "EMPLOYEES", status.employees);
    top.addSpacer(8);
    addMetric(top, "PENDING", status.pending);

    widget.addSpacer(6);

    const bottom = widget.addStack();
    addMetric(bottom, "COMPLETED", status.completed);
    bottom.addSpacer(8);
    addMetric(bottom, "IN REVIEW", status.inReview);
  }

  widget.addSpacer();
  const stamp = new Date(status.updatedAt);
  addLabel(widget, "Updated: " + stamp.toLocaleString(), 9, COLORS.muted);
  return widget;
}

let data = null;
let error = null;

try {
  data = await getStatus();
} catch (err) {
  error = err;
  console.warn("Widget status request failed: " + String(err));
}

const widget = drawWidget(data, error);
Script.setWidget(widget);
if (!config.runsInWidget) {
  if (config.widgetFamily === "small") await widget.presentSmall();
  else await widget.presentMedium();
}
Script.complete();
