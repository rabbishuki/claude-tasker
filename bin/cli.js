#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function copyFileSync(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

function copyDirectorySync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src);
  for (const entry of entries) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectorySync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

const CLAUDE_TASKER_VERSION = require('../package.json').version;
const CLAUDE_TASKER_FILES = [
  { name: '.claude', isDirectory: true, managed: true },
  { name: '.claude-settings.json', isDirectory: false, managed: true },
  { name: 'CLAUDE.md', isDirectory: false, managed: true },
  { name: '.claude-tasker.json', isDirectory: false, managed: true } // Metadata file
];

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'init';
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Claude Tasker - Micro-task development workflow for Claude Code

Usage:
  npx claude-tasker [command]

Commands:
  init      Initialize Claude Tasker in current project (default)
  update    Update Claude Tasker files to latest version
  status    Show current Claude Tasker version and status
  --help    Show this help message

Examples:
  npx claude-tasker
  npx claude-tasker init
  npx claude-tasker update
  npx claude-tasker status
    `);
    process.exit(0);
  }

  switch (command) {
    case 'init':
      initializeProject();
      break;
    case 'update':
      updateProject();
      break;
    case 'status':
      showStatus();
      break;
    default:
      initializeProject();
      break;
  }
}

function showStatus() {
  const targetDir = process.cwd();
  const metadataPath = path.join(targetDir, '.claude-tasker.json');
  
  console.log('📋 Claude Tasker Status');
  console.log(`Package version: ${CLAUDE_TASKER_VERSION}`);
  
  if (fs.existsSync(metadataPath)) {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    console.log(`Installed version: ${metadata.version}`);
    console.log(`Installed on: ${metadata.installedAt}`);
    
    if (metadata.version !== CLAUDE_TASKER_VERSION) {
      console.log('🟡 Update available! Run: npx claude-tasker update');
    } else {
      console.log('✅ You have the latest version');
    }
  } else {
    console.log('❌ Claude Tasker not initialized in this directory');
    console.log('Run: npx claude-tasker init');
  }
}

function updateProject() {
  const targetDir = process.cwd();
  const metadataPath = path.join(targetDir, '.claude-tasker.json');
  
  console.log('🔄 Updating Claude Tasker...');
  
  if (!fs.existsSync(metadataPath)) {
    console.log('❌ Claude Tasker not found in this directory');
    console.log('Run: npx claude-tasker init');
    process.exit(1);
  }
  
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  console.log(`Updating from version ${metadata.version} to ${CLAUDE_TASKER_VERSION}`);
  
  // Perform update (same as init but with different messaging)
  try {
    copyClaudeTaskerFiles(targetDir, false); // false = update mode
    createMetadataFile(targetDir, true); // true = update mode
    
    console.log(`✅ Updated to Claude Tasker ${CLAUDE_TASKER_VERSION}`);
  } catch (error) {
    console.error('❌ Error during update:', error.message);
    process.exit(1);
  }
}

function initializeProject() {
  const targetDir = process.cwd();
  const metadataPath = path.join(targetDir, '.claude-tasker.json');
  
  console.log('🚀 Initializing Claude Tasker workflow...');
  
  // Check if already initialized
  if (fs.existsSync(metadataPath)) {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    console.log('⚠️  Claude Tasker already initialized in this directory.');
    console.log(`   Version ${metadata.version} installed on ${metadata.installedAt}`);
    console.log('   Run: npx claude-tasker update (to update)');
    console.log('   Run: npx claude-tasker status (to check status)');
    process.exit(1);
  }
  
  try {
    copyClaudeTaskerFiles(targetDir, true); // true = init mode
    createDocsStructure(targetDir);
    createMetadataFile(targetDir, false); // false = init mode
    
    console.log('\n✅ Claude Tasker initialized successfully!');
    console.log('\nNext steps:');
    console.log('1. Open your project in Claude Code');
    console.log('2. Start your first feature:');
    console.log('   /tasker-start [feature-name]');
    console.log('\n📖 See CLAUDE.md for complete workflow guidelines');
    
  } catch (error) {
    console.error('❌ Error during initialization:', error.message);
    process.exit(1);
  }
}

function copyClaudeTaskerFiles(targetDir, isInit) {
  const packageDir = path.dirname(__dirname);
  console.log('📁 Copying configuration files...');
  
  let copiedCount = 0;
  for (const item of CLAUDE_TASKER_FILES) {
    if (item.name === '.claude-tasker.json') continue; // Skip metadata file
    
    const srcPath = path.join(packageDir, item.name);
    const destPath = path.join(targetDir, item.name);
    
    if (fs.existsSync(srcPath)) {
      if (item.isDirectory) {
        copyDirectorySync(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
      console.log(`   ✓ ${item.name}${isInit ? '' : ' (updated)'}`);
      copiedCount++;
    }
  }
  
  if (copiedCount === 0) {
    throw new Error('No configuration files found to copy');
  }
}

function createDocsStructure(targetDir) {
  console.log('📚 Setting up docs structure...');
  const docsDir = path.join(targetDir, 'docs');
  const featuresDir = path.join(docsDir, 'features');
  const backlogFile = path.join(docsDir, 'backlog.md');
  
  fs.mkdirSync(featuresDir, { recursive: true });
  console.log('   ✓ docs/features/');
  
  if (!fs.existsSync(backlogFile)) {
    fs.writeFileSync(backlogFile, '# Global Business Ideas\n\n- [Add your cross-feature concepts and new feature ideas here]\n');
    console.log('   ✓ docs/backlog.md');
  }
}

function createMetadataFile(targetDir, isUpdate) {
  const metadataPath = path.join(targetDir, '.claude-tasker.json');
  const metadata = {
    version: CLAUDE_TASKER_VERSION,
    installedAt: new Date().toISOString(),
    managedFiles: CLAUDE_TASKER_FILES.filter(f => f.managed).map(f => f.name)
  };
  
  if (isUpdate && fs.existsSync(metadataPath)) {
    const existing = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    metadata.installedAt = existing.installedAt;
    metadata.updatedAt = new Date().toISOString();
  }
  
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`   ✓ .claude-tasker.json (v${CLAUDE_TASKER_VERSION})`);
}

if (require.main === module) {
  main();
}

module.exports = { main };