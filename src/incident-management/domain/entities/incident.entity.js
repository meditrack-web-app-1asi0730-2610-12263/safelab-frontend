import { IncidentSeverity, IncidentStatus } from '../model/incident-status.model';

export class Incident {
    constructor({
                    id = null,
                    title = '',
                    description = '',
                    severity = IncidentSeverity.WARNING,
                    status = IncidentStatus.OPEN,
                    sourceAlertId = null,
                    assignedTo = '',
                    affectedArea = '',
                    correctiveAction = '',
                    createdAt = new Date().toISOString(),
                    updatedAt = new Date().toISOString()
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.status = status;
        this.sourceAlertId = sourceAlertId;
        this.assignedTo = assignedTo;
        this.affectedArea = affectedArea;
        this.correctiveAction = correctiveAction;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    isOpen() {
        return this.status === IncidentStatus.OPEN;
    }

    isInvestigating() {
        return this.status === IncidentStatus.INVESTIGATING;
    }

    isResolved() {
        return this.status === IncidentStatus.RESOLVED;
    }

    isClosed() {
        return this.status === IncidentStatus.CLOSED;
    }

    isCritical() {
        return this.severity === IncidentSeverity.CRITICAL;
    }
}