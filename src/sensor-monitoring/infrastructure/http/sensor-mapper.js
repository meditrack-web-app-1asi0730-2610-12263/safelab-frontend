import { ReadingStatus, SensorType } from '@/sensor-monitoring/domain/models'

const parseInstalledAt = (value) => {
  if (!value) {
    return null
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export const mapSensorDto = (dto) => {
  const installedAt = parseInstalledAt(dto.installedAt)

  if (!Object.values(SensorType).includes(dto.type)) {
    throw new Error(`Sensor.type must be one of: ${Object.values(SensorType).join(', ')}`)
  }

  if (!Object.values(ReadingStatus).includes(dto.status)) {
    throw new Error(`Sensor.status must be one of: ${Object.values(ReadingStatus).join(', ')}`)
  }

  return {
    id: dto.id,
    name: dto.name,
    code: dto.code,
    type: dto.type,
    value: dto.value,
    status: dto.status,
    sensorStatus: dto.sensorStatus,
    installedAt,
    thresholds: Array.isArray(dto.thresholds) ? dto.thresholds : [],
    calibrations: Array.isArray(dto.calibrations) ? dto.calibrations : []
  }
}

export const mapSensorList = (dtos) => dtos.map(mapSensorDto)

