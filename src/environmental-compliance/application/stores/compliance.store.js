import { defineStore } from 'pinia'
import { fetchComplianceSensors } from '../services'

const buildRuleKey = (type, minValue, maxValue) => `${type}:${minValue}:${maxValue}`

const isOutOfRange = (value, minValue, maxValue) => value < minValue || value > maxValue

const deriveRules = (sensors) => {
  const rulesByKey = new Map()

  sensors.forEach((sensor) => {
    sensor.thresholds.forEach((threshold) => {
      const key = buildRuleKey(sensor.type, threshold.minValue, threshold.maxValue)
      if (!rulesByKey.has(key)) {
        rulesByKey.set(key, {
          id: key,
          type: sensor.type,
          minValue: threshold.minValue,
          maxValue: threshold.maxValue,
          sensorCount: 0,
          violationCount: 0
        })
      }

      const rule = rulesByKey.get(key)
      rule.sensorCount += 1

      if (typeof sensor.value === 'number' && isOutOfRange(sensor.value, threshold.minValue, threshold.maxValue)) {
        rule.violationCount += 1
      }
    })
  })

  return Array.from(rulesByKey.values())
}

const computeKpis = (sensors) => {
  const totalSensors = sensors.length
  const compliantSensors = sensors.filter((sensor) => {
    const threshold = sensor.thresholds[0]
    if (!threshold || typeof sensor.value !== 'number') {
      return true
    }
    return !isOutOfRange(sensor.value, threshold.minValue, threshold.maxValue)
  }).length

  const complianceRate = totalSensors === 0 ? 0 : (compliantSensors / totalSensors) * 100

  const activeViolations = sensors.filter((sensor) => {
    const threshold = sensor.thresholds[0]
    if (!threshold || typeof sensor.value !== 'number') {
      return false
    }
    return isOutOfRange(sensor.value, threshold.minValue, threshold.maxValue)
  }).length

  const pendingAudits = activeViolations > 0 ? 1 : 0

  return {
    totalSensors,
    complianceRate,
    activeViolations,
    pendingAudits
  }
}

export const useComplianceStore = defineStore('environmental-compliance', {
  state: () => ({
    sensors: [],
    rules: [],
    kpis: {
      totalSensors: 0,
      complianceRate: 0,
      activeViolations: 0,
      pendingAudits: 0
    },
    loading: false,
    error: null
  }),
  getters: {
    complianceRules(state) {
      return state.rules
    }
  },
  actions: {
    async loadCompliance() {
      this.loading = true
      this.error = null
      try {
        this.sensors = await fetchComplianceSensors()
        this.rules = deriveRules(this.sensors)
        this.kpis = computeKpis(this.sensors)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})

