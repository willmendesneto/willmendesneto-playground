export const START_AUTH = 'AUTH_START';
export function isStartAuthAction(action) {
    return action.type === START_AUTH;
}
export function startAuth(serviceName) {
    return {
        type: START_AUTH,
        serviceName,
    };
}
//# sourceMappingURL=startAuth.js.map