export const START_APP = 'START_APP';
export function isStartAppAction(action) {
    return action.type === START_APP;
}
export function startApp(payload) {
    return {
        type: START_APP,
        payload,
    };
}
//# sourceMappingURL=startApp.js.map