import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'identity-access',
    name: 'identity-access',
    component: ComingSoonView,
    meta: { title: 'Identity & Access', contextKey: 'iam' }
  },
  {
    path: 'identity-access/login',
    name: 'identity-access-login',
    component: ComingSoonView,
    meta: { title: 'Login', contextKey: 'iam', viewKey: 'iam.Login' }
  },
  {
    path: 'identity-access/register',
    name: 'identity-access-register',
    component: ComingSoonView,
    meta: { title: 'Register', contextKey: 'iam', viewKey: 'iam.Register' }
  },
  {
    path: 'identity-access/users',
    name: 'identity-access-users',
    component: ComingSoonView,
    meta: { title: 'User Management', contextKey: 'iam', viewKey: 'iam.UserManagement' }
  },
  {
    path: 'identity-access/roles',
    name: 'identity-access-roles',
    component: ComingSoonView,
    meta: { title: 'Role Management', contextKey: 'iam', viewKey: 'iam.RoleManagement' }
  },
  {
    path: 'identity-access/permissions',
    name: 'identity-access-permissions',
    component: ComingSoonView,
    meta: { title: 'Permission Management', contextKey: 'iam', viewKey: 'iam.PermissionManagement' }
  },
  {
    path: 'identity-access/sessions',
    name: 'identity-access-sessions',
    component: ComingSoonView,
    meta: { title: 'Session Status', contextKey: 'iam', viewKey: 'iam.SessionStatus' }
  },
]
