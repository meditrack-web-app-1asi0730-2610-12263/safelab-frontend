import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'
const IncidentsPage = () => import('./views/incidents-page.component.vue');
const IncidentDetailPage = () => import('./views/incident-detail-page.component.vue');
const IncidentReportPage = () => import('./views/incident-report-page.component.vue');

export const routes = [
  {
    path: '/incident-management',
    name: 'incident-management',
    component: IncidentsPage,
    meta: {
      title: 'Incident Management',
      contextKey: 'incidentManagement'
    }
  },
  {
    path: 'incident-management/incident-list',
    name: 'incident-management-incident-list',
    component: ComingSoonView,
    meta: { title: 'Incident List', contextKey: 'incidents', viewKey: 'incidents.IncidentList' }
  },
  {
    path: '/incident-management/:id',
    name: 'incident-management-detail',
    component: IncidentDetailPage,
    meta: {
      title: 'Incident Detail',
      contextKey: 'incidentManagement'
    }
  },
  {
    path: '/incident-management/:id/report',
    name: 'incident-management-report',
    component: IncidentReportPage,
    meta: {
      title: 'Incident Report',
      contextKey: 'incidentManagement'
    }
  },
  {
    path: 'incident-management/incident-detail',
    name: 'incident-management-incident-detail',
    component: ComingSoonView,
    meta: { title: 'Incident Detail', contextKey: 'incidents', viewKey: 'incidents.IncidentDetail' }
  },
  {
    path: 'incident-management/incident-tracking',
    name: 'incident-management-incident-tracking',
    component: ComingSoonView,
    meta: { title: 'Incident Tracking', contextKey: 'incidents', viewKey: 'incidents.IncidentTracking' }
  },
  {
    path: 'incident-management/assignment',
    name: 'incident-management-assignment',
    component: ComingSoonView,
    meta: { title: 'Assignment', contextKey: 'incidents', viewKey: 'incidents.Assignment' }
  },
  {
    path: 'incident-management/corrective-actions',
    name: 'incident-management-corrective-actions',
    component: ComingSoonView,
    meta: { title: 'Corrective Actions', contextKey: 'incidents', viewKey: 'incidents.CorrectiveActions' }
  },
  {
    path: 'incident-management/resolution-review',
    name: 'incident-management-resolution-review',
    component: ComingSoonView,
    meta: { title: 'Resolution Review', contextKey: 'incidents', viewKey: 'incidents.ResolutionReview' }
  },
  {
    path: 'incident-management/incident-evidence',
    name: 'incident-management-incident-evidence',
    component: ComingSoonView,
    meta: { title: 'Incident Evidence', contextKey: 'incidents', viewKey: 'incidents.IncidentEvidence' }
  },
  {
    path: 'incident-management/critical-incidents',
    name: 'incident-management-critical-incidents',
    component: ComingSoonView,
    meta: { title: 'Critical Incidents', contextKey: 'incidents', viewKey: 'incidents.CriticalIncidents' }
  },
]
