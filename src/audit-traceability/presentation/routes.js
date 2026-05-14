import AuditTraceabilityView from '@/audit-traceability/presentation/views/AuditTraceabilityView.vue'

const auditView = AuditTraceabilityView

export const routes = [
  {
    path: 'audit-traceability',
    redirect: '/audit-traceability/audit-log'
  },
  {
    path: 'audit-traceability/audit-log',
    name: 'audit-traceability-audit-log',
    component: auditView,
    meta: { title: 'Audit Log', contextKey: 'audit', viewKey: 'audit.AuditLog' }
  },
  {
    path: 'audit-traceability/activity-history',
    name: 'audit-traceability-activity-history',
    component: auditView,
    meta: { title: 'Activity History', contextKey: 'audit', viewKey: 'audit.ActivityHistory' }
  },
  {
    path: 'audit-traceability/traceability-timeline',
    name: 'audit-traceability-traceability-timeline',
    component: auditView,
    meta: { title: 'Traceability Timeline', contextKey: 'audit', viewKey: 'audit.TraceabilityTimeline' }
  },
  {
    path: 'audit-traceability/equipment-history',
    name: 'audit-traceability-equipment-history',
    component: auditView,
    meta: { title: 'Equipment History', contextKey: 'audit', viewKey: 'audit.EquipmentHistory' }
  },
  {
    path: 'audit-traceability/compliance-traceability',
    name: 'audit-traceability-compliance-traceability',
    component: auditView,
    meta: { title: 'Compliance Traceability', contextKey: 'audit', viewKey: 'audit.ComplianceTraceability' }
  },
  {
    path: 'audit-traceability/audit-evidence',
    name: 'audit-traceability-audit-evidence',
    component: auditView,
    meta: { title: 'Audit Evidence', contextKey: 'audit', viewKey: 'audit.AuditEvidence' }
  },
  {
    path: 'audit-traceability/operational-traceability',
    name: 'audit-traceability-operational-traceability',
    component: auditView,
    meta: { title: 'Operational Traceability', contextKey: 'audit', viewKey: 'audit.OperationalTraceability' }
  },
  {
    path: 'audit-traceability/change-history',
    name: 'audit-traceability-change-history',
    component: auditView,
    meta: { title: 'Change History', contextKey: 'audit', viewKey: 'audit.ChangeHistory' }
  },
  {
    path: 'audit-traceability/remote-command-history',
    name: 'audit-traceability-remote-command-history',
    component: auditView,
    meta: { title: 'Remote Command History', contextKey: 'audit', viewKey: 'audit.RemoteCommandHistory' }
  }
]
