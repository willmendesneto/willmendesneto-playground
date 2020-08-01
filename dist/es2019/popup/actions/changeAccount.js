export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
export function isChangeAccountAction(action) {
    return action.type === CHANGE_ACCOUNT;
}
export function changeAccount(serviceName, accountId) {
    return {
        type: CHANGE_ACCOUNT,
        serviceName,
        accountId,
    };
}
//# sourceMappingURL=changeAccount.js.map