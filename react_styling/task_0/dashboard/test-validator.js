#!/usr/bin/env node

/**
 * Script de validation des tests unitaires
 * Retourne "OK" si tous les tests passent, "NOK" sinon
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function runTests() {
  try {
    console.log('='.repeat(60));
    console.log('Exécution des tests unitaires pour react_styling...');
    console.log('='.repeat(60));
    console.log('');

    // Exécuter les tests avec npm test
    const output = execSync('npm test -- --verbose', {
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: __dirname
    });

    // Afficher la sortie des tests
    console.log(output);

    // Si on arrive ici, les tests ont passé
    console.log('');
    console.log('='.repeat(60));
    console.log('RÉSULTAT: OK');
    console.log('='.repeat(60));
    console.log('Tous les tests unitaires ont réussi!');

    process.exit(0);

  } catch (error) {
    // Si une erreur survient, les tests ont échoué
    console.log(error.stdout || '');
    console.log(error.stderr || '');

    console.log('');
    console.log('='.repeat(60));
    console.log('RÉSULTAT: NOK');
    console.log('='.repeat(60));
    console.log('Un ou plusieurs tests ont échoué.');

    // Extraire les informations sur les tests échoués
    const output = error.stdout || error.stderr || '';
    const failedMatch = output.match(/FAIL\s+(.+)/g);

    if (failedMatch) {
      console.log('\nTests en échec:');
      failedMatch.forEach(line => console.log('  - ' + line));
    }

    process.exit(1);
  }
}

// Exécuter le script
runTests();
