export function decideProntoIntakeOutcome({ databasePersisted, crmPersisted }) {
  if (databasePersisted && crmPersisted) {
    return {
      status: 200,
      persistence: 'database+crm',
      crmQueued: true,
      reconciliationRequired: false,
    };
  }

  if (databasePersisted) {
    return {
      status: 200,
      persistence: 'database_only',
      crmQueued: true,
      reconciliationRequired: false,
    };
  }

  if (crmPersisted) {
    return {
      status: 202,
      persistence: 'crm_only',
      crmQueued: false,
      reconciliationRequired: true,
    };
  }

  return {
    status: 503,
    persistence: 'none',
    crmQueued: false,
    reconciliationRequired: true,
  };
}
