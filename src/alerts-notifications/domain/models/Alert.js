export class Alert {
    constructor({ id = null, severity = 'info', title = '', status = 'active' } = {}) {
        this.id = id
        this.severity = severity
        this.title = title
        this.status = status
    }
}