import { UPDATE_SERVICE_LIST, } from '../actions/updateServiceList';
export default function serviceListUpdate(state, action) {
    if (action.type === UPDATE_SERVICE_LIST) {
        return {
            ...state,
            accounts: action.accounts,
            view: {
                ...state.view,
                isLoading: false,
                hasError: false,
            },
        };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=serviceListUpdate.js.map