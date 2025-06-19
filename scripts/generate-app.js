const fs = require('fs');
const path = require('path');

function generateApp(appName) {
  if (!appName) {
    console.error('Error: App name is required');
    console.log('Usage: node scripts/generate-app.js <app-name>');
    process.exit(1);
  }

  const appDir = path.join(__dirname, '..', 'apps', appName);
  const templateDir = path.join(__dirname, '..', 'apps', 'template');

  if (fs.existsSync(appDir)) {
    console.error(`Error: App "${appName}" already exists`);
    process.exit(1);
  }

  console.log(`Creating new app: ${appName}`);
  
  // テンプレートをコピー
  copyDirectory(templateDir, appDir);
  
  // package.jsonを更新
  const packageJsonPath = path.join(appDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = `mintaryx-${appName}`;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log(`\n✅ Successfully created app: ${appName}`);
  console.log(`\n📁 Location: apps/${appName}`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. cd apps/${appName}`);
  console.log(`   2. npm install`);
  console.log(`   3. npm run dev`);
  console.log(`   4. Edit app/page.tsx to customize your tool`);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // .next, node_modules, outフォルダはスキップ
      if (['.next', 'node_modules', 'out', '.vercel'].includes(entry.name)) {
        continue;
      }
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// コマンドライン引数を取得
const appName = process.argv[2];
generateApp(appName);