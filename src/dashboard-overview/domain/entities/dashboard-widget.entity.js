export class DashboardWidget {
  constructor({ id, title, type, value, status = 'neutral', description = '', route = '', items = [] }) {
    this.id = id
    this.title = title
    this.type = type
    this.value = value
    this.status = status
    this.description = description
    this.route = route
    this.items = items
  }

  get hasItems() {
    return Array.isArray(this.items) && this.items.length > 0
  }
}
