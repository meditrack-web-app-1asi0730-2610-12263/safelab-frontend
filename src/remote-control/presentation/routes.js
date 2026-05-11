import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'remote-control',
    name: 'remote-control',
    component: ComingSoonView,
    meta: { title: 'Remote Control', contextKey: 'remote' }
  },
  {
    path: 'remote-control/remote-control-panel',
    name: 'remote-control-remote-control-panel',
    component: ComingSoonView,
    meta: { title: 'Remote Control Panel', contextKey: 'remote', viewKey: 'remote.RemoteControlPanel' }
  },
  {
    path: 'remote-control/command-history',
    name: 'remote-control-command-history',
    component: ComingSoonView,
    meta: { title: 'Command History', contextKey: 'remote', viewKey: 'remote.CommandHistory' }
  },
  {
    path: 'remote-control/command-status',
    name: 'remote-control-command-status',
    component: ComingSoonView,
    meta: { title: 'Command Status', contextKey: 'remote', viewKey: 'remote.CommandStatus' }
  },
  {
    path: 'remote-control/actuator-status',
    name: 'remote-control-actuator-status',
    component: ComingSoonView,
    meta: { title: 'Actuator Status', contextKey: 'remote', viewKey: 'remote.ActuatorStatus' }
  },
  {
    path: 'remote-control/device-control-policy',
    name: 'remote-control-device-control-policy',
    component: ComingSoonView,
    meta: { title: 'Device Control Policy', contextKey: 'remote', viewKey: 'remote.DeviceControlPolicy' }
  },
  {
    path: 'remote-control/execution-result',
    name: 'remote-control-execution-result',
    component: ComingSoonView,
    meta: { title: 'Execution Result', contextKey: 'remote', viewKey: 'remote.ExecutionResult' }
  },
  {
    path: 'remote-control/safety-validation',
    name: 'remote-control-safety-validation',
    component: ComingSoonView,
    meta: { title: 'Safety Validation', contextKey: 'remote', viewKey: 'remote.SafetyValidation' }
  },
]
