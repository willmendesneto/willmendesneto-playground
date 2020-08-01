import { isChangeAccountAction } from '../actions/changeAccount';
export default function accountChange(state, action) {
    if (isChangeAccountAction(action)) {
        const { accountId, serviceName } = action;
        // remove loading state from view, as we only reload the recents collection when the popup is shown
        const isLoading = serviceName === 'upload' ? false : state.view.isLoading;
        return {
            ...state,
            view: {
                ...state.view,
                isLoading,
                service: {
                    accountId,
                    name: serviceName,
                },
                path: [],
                items: [],
            },
        };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=accountChange.js.map