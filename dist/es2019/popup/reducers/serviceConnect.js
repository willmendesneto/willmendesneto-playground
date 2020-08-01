export default function serviceConnect(state, action) {
    if (action.type === 'SERVICE_CONNECT') {
        const view = Object.assign({}, state.view, {
            connect: { name: action.serviceName },
            path: false,
        });
        return Object.assign({}, state, { view });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=serviceConnect.js.map