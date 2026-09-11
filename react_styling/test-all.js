#!/usr/bin/env node

/**
 * Script de validation globale pour tous les dossiers react_styling
 * Teste task_0, task_1, task_2, etc.
 * Retourne "OK" si tous les tests passent, "NOK" sinon
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REACT_STYLING_DIR = __dirname;

function getTaskDirectories() {
  const dirs = fs.readdirSync(REACT_STYLING_DIR);
  return dirs.filter(dir => {
    const fullPath = path.join(REACT_STYLING_DIR, dir);
    return fs.statSync(fullPath).isDirectory() && dir.startsWith('task_');
  }).sort();
}

function runTestsForTask(taskDir) {
  const dashboardPath = path.join(REACT_STYLING_DIR, taskDir, 'dashboard');

  if (!fs.existsSync(dashboardPath)) {
    console.log(`  ⚠️  Aucun dossier dashboard trouvé`);
    return { success: false, reason: 'no-dashboard' };
  }

  const packageJsonPath = path.join(dashboardPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`  ⚠️  Aucun package.json trouvé`);
    return { success: false, reason: 'no-package-json' };
  }

  try {
    execSync('npm test -- --passWithNoTests', {
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: dashboardPath
    });
    console.log(`  ✓ Tests réussis`);
    return { success: true };
  } catch (error) {
    const output = error.stdout || error.stderr || '';
    const failedMatch = output.match(/FAIL\s+(.+)/g);

    console.log(`  ✗ Tests échoués`);
    if (failedMatch) {
      failedMatch.forEach(line => console.log(`    ${line}`));
    }

    return { success: false, reason: 'tests-failed', details: failedMatch };
  }
}

function main() {
  console.log('═'.repeat(70));
  console.log('VALIDATION DES TESTS UNITAIRES - REACT STYLING');
  console.log('═'.repeat(70));
  console.log('');

  const tasks = getTaskDirectories();

  if (tasks.length === 0) {
    console.log('❌ Aucun dossier task_* trouvé');
    console.log('');
    console.log('RÉSULTAT GLOBAL: NOK');
    process.exit(1);
  }

  const results = {};
  let allPassed = true;

  tasks.forEach(task => {
    console.log(`\n📁 Testing ${task}...`);
    console.log('─'.repeat(70));
    const result = runTestsForTask(task);
    results[task] = result;

    if (!result.success && result.reason === 'tests-failed') {
      allPassed = false;
    }
  });

  // Afficher le résumé
  console.log('\n');
  console.log('═'.repeat(70));
  console.log('RÉSUMÉ DES RÉSULTATS');
  console.log('═'.repeat(70));

  Object.entries(results).forEach(([task, result]) => {
    if (result.success) {
      console.log(`✓ ${task}: OK`);
    } else if (result.reason === 'tests-failed') {
      console.log(`✗ ${task}: NOK (tests échoués)`);
    } else {
      console.log(`⚠ ${task}: SKIP (${result.reason})`);
    }
  });

  console.log('');
  console.log('═'.repeat(70));

  if (allPassed) {
    console.log('RÉSULTAT GLOBAL: OK ✓');
    console.log('═'.repeat(70));
    console.log('Tous les tests unitaires ont réussi!');
    process.exit(0);
  } else {
    console.log('RÉSULTAT GLOBAL: NOK ✗');
    console.log('═'.repeat(70));
    console.log('Un ou plusieurs tests ont échoué.');
    process.exit(1);
  }
}

main();
