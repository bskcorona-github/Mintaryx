#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const appName = process.argv[2];
if (!appName) {
  console.error("Usage: node generate-app.js <app-name>");
  process.exit(1);
}

const appsDir = path.join(__dirname, "..", "apps");
const templateDir = path.join(appsDir, "template");
const newAppDir = path.join(appsDir, appName);

// テンプレートをコピー
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // node_modules と .next は除外
      if (!["node_modules", ".next", ".vercel"].includes(entry.name)) {
        copyDirectory(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log(`Creating new app: ${appName}`);
  copyDirectory(templateDir, newAppDir);

  // package.json のアプリ名を更新
  const packageJsonPath = path.join(newAppDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.name = `mintaryx-${appName}`;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(`✅ App "${appName}" created successfully!`);
  console.log(`📁 Location: ${newAppDir}`);
  console.log(`🚀 To get started:`);
  console.log(`   cd apps/${appName}`);
  console.log(`   npm run dev`);
} catch (error) {
  console.error("Error creating app:", error);
  process.exit(1);
}
