import { isGetFilesInRecentsAction, isGetFilesInRecentsFullfilledAction, isGetFilesInRecentsFailedAction, } from '../actions/getFilesInRecents';
export const getRecentFilesStarted = (state, action) => {
    if (isGetFilesInRecentsAction(action)) {
        return {
            ...state,
            view: {
                ...state.view,
                service: {
                    name: 'upload',
                    accountId: '',
                },
                path: [],
                hasError: false,
            },
        };
    }
    else {
        return state;
    }
};
export const getRecentFilesFullfilled = (state, action) => {
    if (isGetFilesInRecentsFullfilledAction(action)) {
        const { items } = action;
        return {
            ...state,
            view: {
                ...state.view,
                isLoading: false,
            },
            recents: {
                items,
            },
        };
    }
    return state;
};
export const getRecentFilesFailed = (state, action) => {
    if (isGetFilesInRecentsFailedAction(action)) {
        return {
            ...state,
            view: {
                ...state.view,
                hasError: true,
                isLoading: false,
            },
        };
    }
    return state;
};
//# sourceMappingURL=getFilesInRecents.js.map