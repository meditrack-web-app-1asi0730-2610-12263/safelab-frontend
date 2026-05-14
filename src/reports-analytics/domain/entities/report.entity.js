import { ReportStatus } from '../models/report-status.enum'
import { ReportFormat } from '../models/report-format.enum'

export class Report {
    constructor({
                    id,
                    title,
                    equipmentId = null,
                    equipmentName = '',
                    startDate,
                    endDate,
                    format = ReportFormat.PDF,
                    status = ReportStatus.PENDING,
                    createdAt = null,
                    downloadUrl = null
                }) {
        this.id = id
        this.title = title
        this.equipmentId = equipmentId
        this.equipmentName = equipmentName
        this.startDate = startDate
        this.endDate = endDate
        this.format = format
        this.status = status
        this.createdAt = createdAt
        this.downloadUrl = downloadUrl
    }

    markGenerated(downloadUrl) {
        this.status = ReportStatus.GENERATED
        this.downloadUrl = downloadUrl
    }

    markFailed() {
        this.status = ReportStatus.FAILED
    }
}
