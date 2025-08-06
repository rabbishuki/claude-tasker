#!/usr/bin/env node

// Context Injection Hook - Adds relevant project context to user prompts
// Runs on user prompt submission to provide Claude with current project state

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  reset: '\x1b[0m'
};

function log(level, message) {
  const color = colors[level] || colors.reset;
  console.error(`${color}[CONTEXT]${colors.reset} ${message}`);
}

function getCurrentTaskerContext() {
  try {
    const featuresDir = 'docs/features';
    if (!fs.existsSync(featuresDir)) return null;
    
    const features = fs.readdirSync(featuresDir);
    const activeFeatures = [];
    
    for (const feature of features) {
      const statusFile = path.join(featuresDir, feature, 'status.json');
      if (fs.existsSync(statusFile)) {
        const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
        if (status.current_phase && status.current_phase !== 'completed') {
          activeFeatures.push({
            name: feature,
            phase: status.current_phase,
            completed_phases: status.completed_phases || [],
            last_activity: status.last_approved || status.last_code_change || status.created
          });
        }
      }
    }
    
    return activeFeatures.length > 0 ? activeFeatures : null;
  } catch (error) {
    return null;
  }
}

function getProjectTechStack() {
  const techStack = [];
  
  // Check package.json for dependencies
  if (fs.existsSync('package.json')) {
    try {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      
      if (deps.react) techStack.push('React');
      if (deps.typescript) techStack.push('TypeScript');
      if (deps.express) techStack.push('Express.js');
      if (deps.jest || deps.vitest) techStack.push('Jest/Vitest');
      if (deps['@testing-library/react']) techStack.push('React Testing Library');
      if (deps.tailwindcss) techStack.push('Tailwind CSS');
    } catch (error) {
      // Ignore package.json parsing errors
    }
  }
  
  return techStack;
}

function getCurrentTestStatus() {
  try {
    // Quick check if tests are passing
    const { execSync } = require('child_process');
    const result = execSync('npm test -- --passWithNoTests --watchAll=false', {
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 10000
    });
    
    if (result.includes('PASS')) return 'passing';
    if (result.includes('FAIL')) return 'failing';
    return 'unknown';
  } catch (error) {
    if (error.stdout && error.stdout.includes('FAIL')) return 'failing';
    return 'unknown';
  }
}

function generateContextInjection() {
  const context = [];
  
  // Add tasker workflow context
  const activeFeatures = getCurrentTaskerContext();
  if (activeFeatures) {
    context.push('## Current Tasker Workflow Status');
    activeFeatures.forEach(feature => {
      context.push(`- **${feature.name}**: ${feature.phase} phase (completed: ${feature.completed_phases.join(', ')})`);
    });
    context.push('');
  }
  
  // Add tech stack context
  const techStack = getProjectTechStack();
  if (techStack.length > 0) {
    context.push('## Project Tech Stack');
    context.push(`Technologies: ${techStack.join(', ')}`);
    context.push('');
  }
  
  // Add test status context
  const testStatus = getCurrentTestStatus();
  if (testStatus !== 'unknown') {
    context.push('## Current Test Status');
    context.push(`Tests are currently: ${testStatus}`);
    context.push('');
  }
  
  // Add TDD reminder if in implementation phase
  if (activeFeatures && activeFeatures.some(f => f.phase === 'implementation')) {
    context.push('## TDD Reminder');
    context.push('🔴 **Red-Green-Refactor cycle is active** - ensure failing tests before production code');
    context.push('');
  }
  
  return context.length > 0 ? context.join('\n') : null;
}

function main() {
  try {
    const contextInjection = generateContextInjection();
    
    if (contextInjection) {
      // Output context that will be prepended to the user's prompt
      console.log('---CONTEXT INJECTION---');
      console.log(contextInjection);
      console.log('---END CONTEXT---');
      
      log('green', 'Context injected successfully');
    } else {
      log('green', 'No relevant context to inject');
    }
    
  } catch (error) {
    log('red', `Error generating context: ${error.message}`);
  }
  
  process.exit(0);
}

// Handle help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Context Injection Hook - Adds project context to prompts');
  console.log('');
  console.log('This hook runs on prompt submission to inject:');
  console.log('  - Current tasker workflow status');
  console.log('  - Project technology stack');
  console.log('  - Current test status');
  console.log('  - Relevant TDD reminders');
  console.log('');
  console.log('Usage: node inject-context.js');
  process.exit(0);
}

main();