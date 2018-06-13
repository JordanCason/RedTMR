
export const UPDATE_MARK_DOWN = 'UPDATE_MARK_DOWN'
export const UPDATE_MARK_DOWN_FULFILLED = 'UPDATE_MARK_DOWN_FULFILLED';
//https://www.youtube.com/watch?v=h892pHdLQtM&index=10&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_
// using redux-promise-middleware
//!!!!!!!!!!!!!!!!!!!!!!!!!!

export function markdownAction(name, value) {
    const payload = {}
    payload.name = name;
    payload.value = value;

    return {
        type: UPDATE_MARK_DOWN,
        payload: payload
    }
}
