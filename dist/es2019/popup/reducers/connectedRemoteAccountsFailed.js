import { isConnectedRemoteAccountFailedAction } from '../actions/getConnectedRemoteAccounts';
export const connectedRemoteAccountsFailed = (state, action) => {
    if (isConnectedRemoteAccountFailedAction(action)) {
        return {
            ...state,
            view: {
                ...state.view,
                isLoading: false,
                hasError: true,
            },
        };
    }
    else {
        return state;
    }
};
//# sourceMappingURL=connectedRemoteAccountsFailed.js.map