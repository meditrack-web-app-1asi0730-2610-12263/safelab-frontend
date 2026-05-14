export class Asset {
    constructor({ id = null, name = '', storageUnit = '', status = 'unknown' } = {}) {
        this.id = id
        this.name = name
        this.storageUnit = storageUnit
        this.status = status
    }
}