import { defineStore } from 'pinia';
import { DeliveryRuleService } from '../services/delivery-rule.service';

const deliveryRuleService = new DeliveryRuleService();

export const useDeliveryRuleStore = defineStore('deliveryRules', {
    state: () => ({
        deliveryRules: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchDeliveryRules(filters = {}) {
            this.loading = true;
            this.error = null;

            try {
                this.deliveryRules = await deliveryRuleService.findAll(filters);
            } catch (error) {
                this.error = 'Could not load delivery rules.';
            } finally {
                this.loading = false;
            }
        },

        async createDeliveryRule(payload) {
            await deliveryRuleService.create(payload);
            await this.fetchDeliveryRules();
        },

        async updateDeliveryRule(id, payload) {
            await deliveryRuleService.update(id, payload);
            await this.fetchDeliveryRules();
        },

        async deleteDeliveryRule(id) {
            await deliveryRuleService.delete(id);
            await this.fetchDeliveryRules();
        }
    }
});