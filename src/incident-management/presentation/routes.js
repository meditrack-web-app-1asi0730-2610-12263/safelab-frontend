import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue';

const IncidentsPage = () => import('./views/incidents-page.component.vue');
const IncidentDetailPage = () => import('./views/incident-detail-page.component.vue');
const IncidentReportPage = () => import('./views/incident-report-page.component.vue');

export const routes = [
  {
    path: 'incident-management',
    name: 'incident-management',
    component: IncidentsPage,
    meta: {
      title: 'Incident Management',
      contextKey: 'incident-management'
    }
  },
  {
    path: 'incident-management/incident-list',
    name: 'incident-management-incident-list',
    component: IncidentsPage,
    meta: {
      title: 'Incident List',
      contextKey: 'incident-management',
      viewKey: 'incidents.IncidentList'
    }
  },
  {
    path: 'incident-management/:id',
    name: 'incident-management-detail',
    component: IncidentDetailPage,
    meta: {
      title: 'Incident Detail',
      contextKey: 'incident-management',
      viewKey: 'incidents.IncidentDetail'
    }
  },
  {
    path: 'incident-management/:id/report',
    name: 'incident-management-report',
    component: IncidentReportPage,
    meta: {
      title: 'Incident Report',
      contextKey: 'incident-management',
      viewKey: 'incidents.IncidentReport'
    }
  },
  {
    path: 'incident-management/incident-tracking',
    name: 'incident-management-incident-tracking',
    component: ComingSoonView,
    meta: {
      title: 'Incident Tracking',
      contextKey: 'incident-management',
      viewKey: 'incidents.IncidentTracking'
    }
  },
  {
    path: 'incident-management/assignment',
    name: 'incident-management-assignment',
    component: ComingSoonView,
    meta: {
      title: 'Assignment',
      contextKey: 'incident-management',
      viewKey: 'incidents.Assignment'
    }
  },
  {
    path: 'incident-management/corrective-actions',
    name: 'incident-management-corrective-actions',
    component: ComingSoonView,
    meta: {
      title: 'Corrective Actions',
      contextKey: 'incident-management',
      viewKey: 'incidents.CorrectiveActions'
    }
  },
  {
    path: 'incident-management/resolution-review',
    name: 'incident-management-resolution-review',
    component: ComingSoonView,
    meta: {
      title: 'Resolution Review',
      contextKey: 'incident-management',
      viewKey: 'incidents.ResolutionReview'
    }
  },
  {
    path: 'incident-management/incident-evidence',
    name: 'incident-management-incident-evidence',
    component: ComingSoonView,
    meta: {
      title: 'Incident Evidence',
      contextKey: 'incident-management',
      viewKey: 'incidents.IncidentEvidence'
    }
  },
  {
    path: 'incident-management/critical-incidents',
    name: 'incident-management-critical-incidents',
    component: ComingSoonView,
    meta: {
      title: 'Critical Incidents',
      contextKey: 'incident-management',
      viewKey: 'incidents.CriticalIncidents'
    }
  }
];