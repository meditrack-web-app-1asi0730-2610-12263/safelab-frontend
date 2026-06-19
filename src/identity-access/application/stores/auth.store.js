import { defineStore } from 'pinia'
import { IdentityAccessApiService } from '../../infrastructure/http/identity-access-api.service'
import { useAppStore } from '@/shared/application/stores/app.store'

const identityAccessApiService = new IdentityAccessApiService()
const SESSION_KEY = 'safelab-auth-session'

const roleDisplayMap = {
    safeLabAdministrator: 'SafeLab Administrator',
    bioclinicalCoordinator: 'Bioclinical Coordinator',
    labTechnician: 'Lab Technician',
    complianceOfficer: 'Compliance Officer',
    billingManager: 'Billing Manager'
}

const roleAccessMap = {
    safeLabAdministrator: [
        'dashboard-overview',
        'asset-inventory',
        'sensor-monitoring',
        'environmental-compliance',
        'alerts-notifications',
        'remote-control',
        'reports-analytics',
        'incident-management',
        'audit-traceability',
        'subscription-billing',
        'identity-access'
    ],
    bioclinicalCoordinator: [
        'dashboard-overview',
        'asset-inventory',
        'sensor-monitoring',
        'environmental-compliance',
        'alerts-notifications',
        'reports-analytics',
        'incident-management',
        'audit-traceability'
    ],
    labTechnician: [
        'dashboard-overview',
        'asset-inventory',
        'sensor-monitoring',
        'alerts-notifications',
        'remote-control',
        'incident-management'
    ],
    complianceOfficer: [
        'dashboard-overview',
        'environmental-compliance',
        'alerts-notifications',
        'reports-analytics',
        'incident-management',
        'audit-traceability'
    ],
    billingManager: [
        'dashboard-overview',
        'subscription-billing',
        'reports-analytics'
    ]
}

const buildInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || ''
    const last = lastName?.charAt(0) || ''

    return `${first}${last}`.toUpperCase() || 'SL'
}

const buildFullName = (firstName, lastName) => {
    return `${firstName || ''} ${lastName || ''}`.trim()
}

const syncAppUser = (user) => {
    const appStore = useAppStore()
    const roleLabel = user.position || roleDisplayMap[user.role] || user.role || 'SafeLab User'

    appStore.$patch({
        currentUser: {
            ...appStore.currentUser,
            id: user.id,
            fullName: user.fullName,
            name: user.fullName,
            displayName: user.fullName,
            initials: user.initials,
            email: user.email,
            role: user.role,
            position: roleLabel,
            roleLabel
        }
    })
}

export const useAuthStore = defineStore('identity-access-auth', {
    state: () => ({
        currentUser: null,
        failedLoginAttempts: 0,
        recoveryMessage: '',
        recoveryCode: '',
        loading: false,
        error: null,
        registerMessage: ''
    }),

    getters: {
        isAuthenticated: (state) => Boolean(state.currentUser),

        allowedContexts: (state) => state.currentUser?.allowedContexts || [],

        isAdmin: (state) => state.currentUser?.role === 'safeLabAdministrator',

        roleLabel: (state) => {
            if (!state.currentUser) return 'Guest'

            return (
                state.currentUser.position ||
                roleDisplayMap[state.currentUser.role] ||
                state.currentUser.role
            )
        },

        shouldShowForgotPassword: (state) => state.failedLoginAttempts >= 3,

        canAccessContext: (state) => (context) => {
            if (!context) return true
            if (!state.currentUser) return false
            if (state.currentUser.role === 'safeLabAdministrator') return true

            return state.currentUser.allowedContexts?.includes(context)
        }
    },

    actions: {
        restoreSession() {
            if (this.currentUser) return

            const rawSession = localStorage.getItem(SESSION_KEY)

            if (!rawSession) return

            try {
                const session = JSON.parse(rawSession)
                this.currentUser = session.user
                syncAppUser(session.user)
            } catch {
                localStorage.removeItem(SESSION_KEY)
            }
        },

        persistSession(user) {
            const normalizedUser = {
                ...user,
                position: user.position || roleDisplayMap[user.role] || user.role,
                allowedContexts: user.allowedContexts || roleAccessMap[user.role] || []
            }

            this.currentUser = normalizedUser
            this.failedLoginAttempts = 0

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify({
                    user: normalizedUser,
                    token: `fake-token-${normalizedUser.id}`,
                    createdAt: new Date().toISOString()
                })
            )

            syncAppUser(normalizedUser)
        },

        logout() {
            this.currentUser = null
            localStorage.removeItem(SESSION_KEY)
        },

        async login(identifier, password) {
            this.loading = true
            this.error = null

            try {
                const response = await identityAccessApiService.getUsers()
                const users = response.data

                const user = users.find((item) => {
                    const matchesIdentifier =
                        item.email.toLowerCase() === identifier.toLowerCase() ||
                        item.username.toLowerCase() === identifier.toLowerCase()

                    return matchesIdentifier && item.password === password
                })

                if (!user) {
                    this.failedLoginAttempts += 1
                    this.error = 'Invalid username, email or password.'
                    return false
                }

                if (user.status !== 'active') {
                    this.failedLoginAttempts += 1
                    this.error = 'This account is not active.'
                    return false
                }

                this.persistSession(user)
                return true
            } catch (error) {
                console.error(error)
                this.failedLoginAttempts += 1
                this.error = 'Could not sign in.'
                return false
            } finally {
                this.loading = false
            }
        },

        async register(form) {
            this.loading = true
            this.error = null
            this.registerMessage = ''

            try {
                const usersResponse = await identityAccessApiService.getUsers()
                const users = usersResponse.data

                const emailExists = users.some(
                    (user) => user.email.toLowerCase() === form.email.toLowerCase()
                )

                const usernameExists = users.some(
                    (user) => user.username.toLowerCase() === form.username.toLowerCase()
                )

                if (emailExists) {
                    this.error = 'Email is already registered.'
                    return false
                }

                if (usernameExists) {
                    this.error = 'Username is already registered.'
                    return false
                }

                const fullName = buildFullName(form.firstName, form.lastName)
                const initials = buildInitials(form.firstName, form.lastName)
                const position = roleDisplayMap[form.role] || form.role

                const userPayload = {
                    username: form.username,
                    email: form.email,
                    password: form.password,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    fullName,
                    initials,
                    phone: form.phone,
                    role: form.role,
                    position,
                    status: 'active',
                    organization: `${fullName} Workspace`,
                    laboratory: 'Main laboratory',
                    timezone: form.timezone,
                    allowedContexts: roleAccessMap[form.role] || [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }

                const userResponse = await identityAccessApiService.createUser(userPayload)
                const createdUser = userResponse.data

                await identityAccessApiService.createUserProfile({
                    userId: `USR-${String(createdUser.id).padStart(3, '0')}`,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    fullName,
                    initials,
                    email: form.email,
                    phone: form.phone,
                    role: form.role,
                    status: 'active',
                    position,
                    organization: `${fullName} Workspace`,
                    laboratory: 'Main laboratory',
                    language: 'en',
                    timezone: form.timezone,
                    notificationPreference: 'critical-and-daily',
                    lastAccess: new Date().toISOString(),
                    lastPasswordChange: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })

                this.persistSession(createdUser)
                this.registerMessage = 'Account created successfully.'
                return true
            } catch (error) {
                console.error(error)
                this.error = 'Could not create account.'
                return false
            } finally {
                this.loading = false
            }
        },

        async requestPasswordRecovery(email) {
            this.loading = true
            this.error = null
            this.recoveryMessage = ''
            this.recoveryCode = ''

            try {
                const response = await identityAccessApiService.getUsers()
                const users = response.data

                const userExists = users.some(
                    (user) => user.email.toLowerCase() === email.toLowerCase()
                )

                if (!userExists) {
                    this.error = 'No account was found with this email.'
                    return false
                }

                this.recoveryCode = `SL-${Math.floor(100000 + Math.random() * 900000)}`
                this.recoveryMessage = 'Recovery instructions were sent successfully.'
                return true
            } catch (error) {
                console.error(error)
                this.error = 'Could not process password recovery.'
                return false
            } finally {
                this.loading = false
            }
        }
    }
})