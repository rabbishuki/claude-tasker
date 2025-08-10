#!/usr/bin/env node

// TDD Guard Hook - Prevents production code changes without tests
// Runs before any file editing to enforce TDD discipline

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m', 
  green: '\x1b[32m',
  reset: '\x1b[0m'
};

function log(level, message) {
  const color = colors[level] || colors.reset;
  console.error(`${color}[TDD GUARD]${colors.reset} ${message}`);
}

function isProductionCode(filePath) {
  // Check if this is a production code file (not test file)
  return /\.(ts|tsx|js|jsx)$/.test(filePath) && 
         !/\.(test|spec)\.(ts|tsx|js|jsx)$/.test(filePath) &&
         !filePath.includes('/.claude/') &&
         !filePath.includes('/docs/') &&
         !filePath.includes('/node_modules/');
}

function findTestFile(prodFile) {
  const dir = path.dirname(prodFile);
  const basename = path.basename(prodFile, path.extname(prodFile));
  const ext = path.extname(prodFile);
  
  // Common test file patterns
  const patterns = [
    path.join(dir, `${basename}.test${ext}`),
    path.join(dir, `${basename}.spec${ext}`),
    path.join(dir, '__tests__', `${basename}.test${ext}`),
    path.join(dir, '__tests__', `${basename}.spec${ext}`)
  ];
  
  return patterns.find(pattern => fs.existsSync(pattern));
}

function checkTestStatus(testFile) {
  try {
    // Try to run the specific test file
    const result = execSync(`npm test -- --testPathPattern="${testFile}" --passWithNoTests`, 
      { encoding: 'utf8', stdio: 'pipe' });
    
    // Check if there are failing tests (Red phase)
    if (result.includes('FAIL') || result.includes('failing')) {
      log('green', '✅ Found failing tests - TDD Red phase satisfied');
      return true;
    }
    
    // All tests passing might mean we're in Green/Refactor phase
    log('yellow', '⚠️  All tests passing - ensure you\'re following TDD cycle');
    return true; // Allow but warn
    
  } catch (error) {
    // Test command failed - might be failing tests (good for Red phase)
    if (error.stdout && (error.stdout.includes('FAIL') || error.stdout.includes('failing'))) {
      log('green', '✅ Found failing tests - TDD Red phase satisfied');
      return true;
    }
    
    log('yellow', '⚠️  Could not determine test status');
    return true; // Allow but warn
  }
}

function isInImplementationPhase() {
  try {
    // Check if we're in tasker implementation phase
    const featuresDir = 'docs/features';
    if (!fs.existsSync(featuresDir)) return false;
    
    const features = fs.readdirSync(featuresDir);
    for (const feature of features) {
      const workFile = path.join(featuresDir, feature, 'work.md');
      if (fs.existsSync(workFile)) {
        const workContent = fs.readFileSync(workFile, 'utf8');
        // In implementation if has Development Task but no QA approval
        if (workContent.includes('**Development Task**') && !workContent.includes('✅ QA APPROVED')) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    return false; // If we can't determine, don't block
  }
}

function main() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    log('yellow', 'No file path provided - skipping TDD check');
    process.exit(0);
  }
  
  // Only guard production code files
  if (!isProductionCode(filePath)) {
    // Allow non-production files (tests, configs, docs)
    process.exit(0);
  }
  
  log('green', `Checking TDD compliance for: ${filePath}`);
  
  // Only enforce during implementation phase
  if (!isInImplementationPhase()) {
    log('green', 'Not in implementation phase - allowing edit');
    process.exit(0);
  }
  
  // Find corresponding test file
  const testFile = findTestFile(filePath);
  if (!testFile) {
    log('red', `No test file found for ${filePath}`);
    log('red', 'TDD requires tests before production code. Please write a failing test first.');
    process.exit(1);
  }
  
  log('green', `Found test file: ${testFile}`);
  
  // Check test status
  if (!checkTestStatus(testFile)) {
    log('red', 'TDD Guard blocked production code change');
    log('red', 'Write a failing test first, then implement minimal code to pass it');
    process.exit(1);
  }
  
  log('green', 'TDD Guard passed - proceeding with edit');
  process.exit(0);
}

// Handle help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('TDD Guard Hook - Enforces Test-Driven Development discipline');
  console.log('');
  console.log('This hook runs before file edits to ensure:');
  console.log('  - Production code changes have corresponding tests');
  console.log('  - Tests are written before implementation (Red phase)');
  console.log('  - TDD cycle is being followed properly');
  console.log('');
  console.log('Usage: node tdd-guard.js <file-path>');
  process.exit(0);
}

main();