import assert from 'node:assert/strict';
import { decideProntoIntakeOutcome } from '../src/lib/pronto-intake-policy.mjs';

assert.deepEqual(
  decideProntoIntakeOutcome({ databasePersisted: true, crmPersisted: true }),
  {
    status: 200,
    persistence: 'database+crm',
    crmQueued: true,
    reconciliationRequired: false,
  }
);

assert.deepEqual(
  decideProntoIntakeOutcome({ databasePersisted: true, crmPersisted: false }),
  {
    status: 200,
    persistence: 'database_only',
    crmQueued: true,
    reconciliationRequired: false,
  }
);

assert.deepEqual(
  decideProntoIntakeOutcome({ databasePersisted: false, crmPersisted: true }),
  {
    status: 202,
    persistence: 'crm_only',
    crmQueued: false,
    reconciliationRequired: true,
  }
);

assert.deepEqual(
  decideProntoIntakeOutcome({ databasePersisted: false, crmPersisted: false }),
  {
    status: 503,
    persistence: 'none',
    crmQueued: false,
    reconciliationRequired: true,
  }
);

console.log('Pronto intake resilience contract: PASS (4 durability states)');
