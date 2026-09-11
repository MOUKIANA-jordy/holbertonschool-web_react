# Scripts de Validation des Tests Unitaires - React Styling

Ce dossier contient des scripts de validation pour vérifier que tous les tests unitaires passent correctement.

## Scripts Disponibles

### 1. `test-validator.js` (Pour un seul task)

Situé dans `task_0/dashboard/test-validator.js`, ce script teste uniquement le dossier task_0.

**Utilisation:**
```bash
cd react_styling/task_0/dashboard
node test-validator.js
```

**Résultat:**
- Affiche `RÉSULTAT: OK` si tous les tests passent (exit code 0)
- Affiche `RÉSULTAT: NOK` si un ou plusieurs tests échouent (exit code 1)

### 2. `test-all.js` (Pour tous les tasks)

Situé dans `react_styling/test-all.js`, ce script teste tous les dossiers task_* présents.

**Utilisation:**
```bash
cd react_styling
node test-all.js
```

**Résultat:**
- Teste tous les dossiers: task_0, task_1, task_2, etc.
- Affiche un résumé pour chaque task
- Affiche `RÉSULTAT GLOBAL: OK` si tous les tests de tous les tasks passent
- Affiche `RÉSULTAT GLOBAL: NOK` si au moins un test échoue

## Exemple de Sortie

### Script individuel (test-validator.js)

```
============================================================
Exécution des tests unitaires pour react_styling...
============================================================

PASS src/Footer/Footer.spec.js
PASS src/Notifications/NotificationItem.spec.js
...

============================================================
RÉSULTAT: OK
============================================================
Tous les tests unitaires ont réussi!
```

### Script global (test-all.js)

```
══════════════════════════════════════════════════════════════════
VALIDATION DES TESTS UNITAIRES - REACT STYLING
══════════════════════════════════════════════════════════════════

📁 Testing task_0...
──────────────────────────────────────────────────────────────────
  ✓ Tests réussis

📁 Testing task_1...
──────────────────────────────────────────────────────────────────
  ✗ Tests échoués
    FAIL src/Notifications/Notifications.spec.js

══════════════════════════════════════════════════════════════════
RÉSUMÉ DES RÉSULTATS
══════════════════════════════════════════════════════════════════
✓ task_0: OK
✗ task_1: NOK (tests échoués)

══════════════════════════════════════════════════════════════════
RÉSULTAT GLOBAL: NOK ✗
══════════════════════════════════════════════════════════════════
Un ou plusieurs tests ont échoué.
```

## Intégration avec npm scripts

Vous pouvez ajouter ces scripts dans votre `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:validate": "node test-validator.js"
  }
}
```

## Code de Sortie

Les deux scripts utilisent les codes de sortie standards:
- **0**: Tous les tests ont réussi (OK)
- **1**: Un ou plusieurs tests ont échoué (NOK)

Cela permet d'utiliser ces scripts dans des pipelines CI/CD:

```bash
# Exemple dans un script CI/CD
node test-all.js && echo "Déploiement autorisé" || echo "Déploiement bloqué"
```

## Statut Actuel des Tests

D'après la dernière exécution, il y a des tests en échec dans:
- `src/Notifications/Notifications.spec.js`:
  - Test: "Check that the Notifications component doesn't display the elements" (displayDrawer=false)
  - Test: "Check that the Notifications component displays the elements" (empty notifications array)

Ces tests doivent être corrigés pour obtenir un résultat OK.
