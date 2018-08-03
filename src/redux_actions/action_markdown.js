export const UPDATE_MARK_DOWN = 'UPDATE_MARK_DOWN'
export const INIT_MARK_DOWN = 'INIT_MARK_DOWN';

//https://www.youtube.com/watch?v=h892pHdLQtM&index=10&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_
// using redux-promise-middleware
//!!!!!!!!!!!!!!!!!!!!!!!!!!

export function markdownAction(name, value) {
    const payload = {}
    payload.name = name;
    payload.value = value;

    return {
        type: UPDATE_MARK_DOWN,
        payload: payload,
    }
}

export function markdownInitAction(name, data) {
    const payload = {}
    payload.name = name;
    payload.data = data;
    return {
        type: INIT_MARK_DOWN,
        payload: payload,
    }
}
