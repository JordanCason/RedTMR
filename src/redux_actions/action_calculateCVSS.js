"use strict"
import {CVSS} from '../Comp_CVSS/cvsscalc30'

const ADD_CVSS_METRIC = "ADD_CVSS_METRIC"
const CALCULATE_CVSS = "CALCULATE_CVSS"

export const ADD_CVSS_METRIC_FULFILLED = "ADD_CVSS_METRIC_FULFILLED"
export const CALCULATE_CVSS_FULFILLED = 'CALCULATE_CVSS_FULFILLED';

export const addCVSSMetricAction = (metrics, name, value) => {
    return {
        type: ADD_CVSS_METRIC,
        payload: new Promise((resolve, reject) => {
            const payload = {}
            //this.setState({ metrics: {[evt.target.name]: evt.target.value }, ...this.state.metrics}, () => {
            payload.metrics = {...metrics, [name]: value}
            for (let key in payload.metrics) {
                if (payload.metrics[key] === '') {
                    payload.readyState = false
                    resolve(payload)
                    return
                }
            }
            payload.readyState = true
            resolve(payload)
        })
    }
}



export const calculateCVSSAction = (metrics) => {
    return {
        type: CALCULATE_CVSS,
        payload: new Promise((resolve, reject) => {
            const payload = {}
            const output = CVSS.calculateCVSSFromMetrics(
                metrics['AV'],
                metrics['AC'],
                metrics['PR'],
                metrics['UI'],
                metrics['S'],
                metrics['C'],
                metrics['I'],
                metrics['A'],
                metrics['E'],
                metrics['RL'],
                metrics['RC'],
                metrics['CR'],
                metrics['IR'],
                metrics['AR'],
                metrics['MAV'],
                metrics['MAC'],
                metrics['MPR'],
                metrics['MUI'],
                metrics['MS'],
                metrics['MC'],
                metrics['MI'],
                metrics['MA'],
            );

            if (output.success === true) {
                payload.base = {
                    score: output.baseMetricScore,
                    severity: output.baseSeverity,
                },
                payload.temporal = {
                    score: output.temporalMetricScore,
                    severity: output.temporalSeverity,
                },
                payload.environmental = {
                    score: output.environmentalMetricScore,
                    severity: output.environmentalSeverity,
                }
                payload.error = {
                    error: false,
                }
            } else {
                payload.error = {
                    error: true,
                    msg: `An error occurred. The error type is ${CVSS.errorType} and the metrics with errors are ${CVSS.errorMetrics}.`,
                }
            }
            resolve(payload)
        })
    }
}
