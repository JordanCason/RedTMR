const TABLE_CLICK = "TABLE_CLICK"
export const TABLE_CLICK_FULFILLED = 'TABLE_CLICK_FULFILLED';



export const tableClickAction = (key, reduxTableName) => {
    return {
        type: TABLE_CLICK,
        payload: new Promise((resolve, reject) => {
            const payload = {}
            payload.reduxTableName = reduxTableName
            payload.key = key
            resolve(payload)
        })
    }
}
