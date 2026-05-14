import { NotificationsApiService } from '../../infrastructure/http/notifications-api.service';
import { Notification } from '../../domain/entities/notification.entity';

const api = new NotificationsApiService();

export class NotificationService {
    async findAll(filters = {}) {
        const response = await api.getAll(filters);
        return response.data.map((notification) => new Notification(notification));
    }

    async retry(id) {
        const response = await api.retry(id);
        return new Notification(response.data);
    }
}