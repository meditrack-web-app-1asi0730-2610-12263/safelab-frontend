export const boundedContextNavigation = [
    {
        context: 'dashboard-overview',
        titleKey: 'contextLabels.dashboard',
        icon: 'table',
        path: '/dashboard-overview/laboratory-dashboard',
        roleScope: 'All roles'
    },
    {
        context: 'asset-inventory',
        titleKey: 'contextLabels.assets',
        icon: 'box',
        path: '/asset-inventory/asset-list',
        roleScope: 'Laboratory / Pharma'
    },
    {
        context: 'sensor-monitoring',
        titleKey: 'contextLabels.sensors',
        icon: 'wifi',
        path: '/sensor-monitoring/live-readings',
        roleScope: 'Laboratory / Pharma'
    },
    {
        context: 'environmental-compliance',
        titleKey: 'contextLabels.compliance',
        icon: 'check-circle',
        path: '/environmental-compliance/compliance-status',
        roleScope: 'Compliance'
    },
    {
        context: 'alerts-notifications',
        titleKey: 'contextLabels.alerts',
        icon: 'exclamation-circle',
        path: '/alerts-notifications/active-alerts',
        roleScope: 'All roles'
    },
    {
        context: 'remote-control',
        titleKey: 'contextLabels.remote',
        icon: 'sliders-h',
        path: '/remote-control/remote-control-panel',
        roleScope: 'Authorized operators'
    },
    {
        context: 'reports-analytics',
        titleKey: 'contextLabels.reports',
        icon: 'chart-line',
        path: '/reports-analytics/analytics-dashboard',
        roleScope: 'Supervisors / Admin'
    },
    {
        context: 'incident-management',
        titleKey: 'contextLabels.incidents',
        icon: 'exclamation-triangle',
        path: '/incident-management/incident-list',
        roleScope: 'All roles'
    },
    {
        context: 'audit-traceability',
        titleKey: 'contextLabels.audit',
        icon: 'history',
        path: '/audit-traceability/audit-log',
        roleScope: 'Admin / Compliance'
    },
    {
        context: 'subscription-billing',
        titleKey: 'contextLabels.billing',
        icon: 'credit-card',
        path: '/subscription-billing/plans',
        roleScope: 'Company admin'
    },
    {
        context: 'identity-access',
        titleKey: 'contextLabels.administration',
        icon: 'shield',
        path: '/identity-access/users',
        roleScope: 'SafeLab Admin'
    }
]

export const hiddenOperationalContexts = [
    { context: 'user-profiles', path: '/user-profiles/my-profile' },
    { context: 'identity-access', path: '/identity-access/login' },
    { context: 'identity-access', path: '/identity-access/register' }
]