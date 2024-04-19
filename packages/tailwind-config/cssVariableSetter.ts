function setDocumentStyleProperty(
  property: string,
  lightValue: string,
  darkValue?: string,
) {
  document.documentElement.style.setProperty(`--${property}`, lightValue);
  document.documentElement.style.setProperty(
    `--${property}-dark`,
    darkValue || lightValue,
  );
}

export function themeVariablesCSS() {
  setDocumentStyleProperty("background", "255, 255, 255", "23, 23, 23");
  setDocumentStyleProperty("foreground", "23, 23, 23", "236, 237, 238");
  setDocumentStyleProperty("border", "229, 231, 235", "63, 63, 70");
  setDocumentStyleProperty("content", "255, 255, 255", "39, 39, 42");
  setDocumentStyleProperty("input-border", "63, 63, 70", "156, 166, 163");
  setDocumentStyleProperty("divider", "218, 222, 242", "78, 84, 83");
  setDocumentStyleProperty("primary", "255, 137, 36");
  setDocumentStyleProperty("primary-foreground", "255, 255, 255");
  setDocumentStyleProperty("secondary", "212, 212, 216", "63, 63, 70");
  setDocumentStyleProperty(
    "secondary-foreground",
    "17, 24, 28",
    "255, 255, 255",
  );
  setDocumentStyleProperty("success", "23, 201, 100");
  setDocumentStyleProperty("success-foreground", "17, 24, 28");
  setDocumentStyleProperty("warning", "245, 165, 36");
  setDocumentStyleProperty("warning-foreground", "17, 24, 28");
  setDocumentStyleProperty("danger", "243, 18, 96");
  setDocumentStyleProperty("danger-foreground", "255, 255, 255");
  setDocumentStyleProperty("focus", "var(--primary");
}
