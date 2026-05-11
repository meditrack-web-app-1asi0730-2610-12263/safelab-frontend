import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'audit-traceability',
    name: 'audit-traceability',
    component: ComingSoonView,
    meta: { title: 'Audit & Traceability', contextKey: 'audit' }
  },
  {
    path: 'audit-traceability/audit-log',
    name: 'audit-traceability-audit-log',
    component: ComingSoonView,
    meta: { title: 'Audit Log', contextKey: 'audit', viewKey: 'audit.AuditLog' }
  },
  {
    path: 'audit-traceability/activity-history',
    name: 'audit-traceability-activity-history',
    component: ComingSoonView,
    meta: { title: 'Activity History', contextKey: 'audit', viewKey: 'audit.ActivityHistory' }
  },
  {
    path: 'audit-traceability/traceability-timeline',
    name: 'audit-traceability-traceability-timeline',
    component: ComingSoonView,
    meta: { title: 'Traceability Timeline', contextKey: 'audit', viewKey: 'audit.TraceabilityTimeline' }
  },
  {
    path: 'audit-traceability/equipment-history',
    name: 'audit-traceability-equipment-history',
    component: ComingSoonView,
    meta: { title: 'Equipment History', contextKey: 'audit', viewKey: 'audit.EquipmentHistory' }
  },
  {
    path: 'audit-traceability/compliance-traceability',
    name: 'audit-traceability-compliance-traceability',
    component: ComingSoonView,
    meta: { title: 'Compliance Traceability', contextKey: 'audit', viewKey: 'audit.ComplianceTraceability' }
  },
  {
    path: 'audit-traceability/audit-evidence',
    name: 'audit-traceability-audit-evidence',
    component: ComingSoonView,
    meta: { title: 'Audit Evidence', contextKey: 'audit', viewKey: 'audit.AuditEvidence' }
  },
  {
    path: 'audit-traceability/operational-traceability',
    name: 'audit-traceability-operational-traceability',
    component: ComingSoonView,
    meta: { title: 'Operational Traceability', contextKey: 'audit', viewKey: 'audit.OperationalTraceability' }
  },
  {
    path: 'audit-traceability/change-history',
    name: 'audit-traceability-change-history',
    component: ComingSoonView,
    meta: { title: 'Change History', contextKey: 'audit', viewKey: 'audit.ChangeHistory' }
  },
  {
    path: 'audit-traceability/remote-command-history',
    name: 'audit-traceability-remote-command-history',
    component: ComingSoonView,
    meta: { title: 'Remote Command History', contextKey: 'audit', viewKey: 'audit.RemoteCommandHistory' }
  },
]
