import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'user-profiles',
    name: 'user-profiles',
    component: ComingSoonView,
    meta: { title: 'User Profiles', contextKey: 'profiles' }
  },
  {
    path: 'user-profiles/my-profile',
    name: 'user-profiles-my-profile',
    component: ComingSoonView,
    meta: { title: 'My Profile', contextKey: 'profiles', viewKey: 'profiles.MyProfile' }
  },
  {
    path: 'user-profiles/company-profile',
    name: 'user-profiles-company-profile',
    component: ComingSoonView,
    meta: { title: 'Company Profile', contextKey: 'profiles', viewKey: 'profiles.CompanyProfile' }
  },
  {
    path: 'user-profiles/profile-management',
    name: 'user-profiles-profile-management',
    component: ComingSoonView,
    meta: { title: 'Profile Management', contextKey: 'profiles', viewKey: 'profiles.ProfileManagement' }
  },
  {
    path: 'user-profiles/preferences',
    name: 'user-profiles-preferences',
    component: ComingSoonView,
    meta: { title: 'Preferences', contextKey: 'profiles', viewKey: 'profiles.Preferences' }
  },
  {
    path: 'user-profiles/notification-settings',
    name: 'user-profiles-notification-settings',
    component: ComingSoonView,
    meta: { title: 'Notification Settings', contextKey: 'profiles', viewKey: 'profiles.NotificationSettings' }
  },
  {
    path: 'user-profiles/contact-information',
    name: 'user-profiles-contact-information',
    component: ComingSoonView,
    meta: { title: 'Contact Information', contextKey: 'profiles', viewKey: 'profiles.ContactInformation' }
  },
]
