export class Notification {
    constructor({
                    id,
                    alertId,
                    recipientId,
                    channel,
                    message,
                    status,
                    sentAt = null,
                    deliveredAt = null,
                    retryCount = 0
                }) {
        this.id = id;
        this.alertId = alertId;
        this.recipientId = recipientId;
        this.channel = channel;
        this.message = message;
        this.status = status;
        this.sentAt = sentAt;
        this.deliveredAt = deliveredAt;
        this.retryCount = retryCount;
    }
}