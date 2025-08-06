#!/usr/bin/env node

// Auto Test Hook - Runs tests after code changes to maintain green state
// Runs after file edits to ensure tests stay passing

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
  console.error(`${color}[AUTO TEST]${colors.reset} ${message}`);
}

function isCodeFile(filePath) {
  return /\.(ts|tsx|js|jsx)$/.test(filePath);
}

function isInImplementationPhase() {
  try {
    const featuresDir = 'docs/features';
    if (!fs.existsSync(featuresDir)) return false;
    
    const features = fs.readdirSync(featuresDir);
    for (const feature of features) {
      const statusFile = path.join(featuresDir, feature, 'status.json');
      if (fs.existsSync(statusFile)) {
        const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
        if (status.current_phase === 'implementation') {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}

function runTests(filePath) {
  try {
    log('green', `Running tests after editing: ${filePath}`);
    
    // Try to run tests for the specific file or related tests
    let testCommand;
    
    if (filePath.includes('.test.') || filePath.includes('.spec.')) {
      // If editing a test file, run just that test
      testCommand = `npm test -- --testPathPattern="${filePath}" --passWithNoTests`;
    } else {
      // If editing production code, try to find and run related tests
      const dir = path.dirname(filePath);
      const basename = path.basename(filePath, path.extname(filePath));
      const ext = path.extname(filePath);
      
      const possibleTestFiles = [
        path.join(dir, `${basename}.test${ext}`),
        path.join(dir, `${basename}.spec${ext}`),
        path.join(dir, '__tests__', `${basename}.test${ext}`)
      ];
      
      const existingTestFile = possibleTestFiles.find(f => fs.existsSync(f));
      
      if (existingTestFile) {
        testCommand = `npm test -- --testPathPattern="${existingTestFile}" --passWithNoTests`;
      } else {
        // Run all tests if no specific test file found
        testCommand = 'npm test -- --passWithNoTests --watchAll=false';
      }
    }
    
    const result = execSync(testCommand, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      timeout: 30000 // 30 second timeout
    });
    
    if (result.includes('PASS')) {
      log('green', '✅ Tests passing after code change');
    } else if (result.includes('FAIL')) {
      log('yellow', '⚠️  Some tests failing - this might be expected in TDD Red phase');
    } else {
      log('green', '✅ Test run completed');
    }
    
  } catch (error) {
    if (error.stdout && error.stdout.includes('FAIL')) {
      log('yellow', '⚠️  Tests failing - this might be expected in TDD cycle');
    } else if (error.code === 'TIMEOUT') {
      log('yellow', '⚠️  Test run timed out - tests may be taking too long');
    } else {
      log('red', `❌ Error running tests: ${error.message}`);
    }
  }
}

function updateTaskerStatus(filePath) {
  try {
    // If we're in implementation phase, we could update task status
    // This is a placeholder for more sophisticated task tracking
    const featuresDir = 'docs/features';
    if (!fs.existsSync(featuresDir)) return;
    
    const features = fs.readdirSync(featuresDir);
    for (const feature of features) {
      const statusFile = path.join(featuresDir, feature, 'status.json');
      if (fs.existsSync(statusFile)) {
        const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
        if (status.current_phase === 'implementation') {
          // Update last modified timestamp
          status.last_code_change = new Date().toISOString();
          status.files_modified = status.files_modified || [];
          
          if (!status.files_modified.includes(filePath)) {
            status.files_modified.push(filePath);
          }
          
          fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));
          log('green', `Updated status for feature: ${feature}`);
          break;
        }
      }
    }
  } catch (error) {
    // Fail silently for status updates
  }
}

function main() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    log('yellow', 'No file path provided');
    process.exit(0);
  }
  
  // Only run for code files
  if (!isCodeFile(filePath)) {
    process.exit(0);
  }
  
  log('green', `Post-edit hook triggered for: ${filePath}`);
  
  // Update tasker status if applicable
  updateTaskerStatus(filePath);
  
  // Only run tests during implementation phase
  if (isInImplementationPhase()) {
    runTests(filePath);
  } else {
    log('green', 'Not in implementation phase - skipping test run');
  }
  
  process.exit(0);
}

// Handle help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Auto Test Hook - Runs tests after code changes');
  console.log('');
  console.log('This hook runs after file edits to:');
  console.log('  - Run relevant tests to ensure they still pass');
  console.log('  - Update tasker status with file modifications');
  console.log('  - Maintain visibility into TDD cycle state');
  console.log('');
  console.log('Usage: node auto-test.js <file-path>');
  process.exit(0);
}

main();