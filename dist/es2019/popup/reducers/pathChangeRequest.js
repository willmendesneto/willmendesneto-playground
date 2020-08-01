import { isChangeCloudAccountFolderAction } from '../actions/changeCloudAccountFolder';
export default function pathChangeRequest(state, action) {
    if (isChangeCloudAccountFolderAction(action)) {
        const view = {
            ...state.view,
            ...{
                isLoading: true,
                path: action.path,
                currentCursor: undefined,
                nextCursor: undefined,
            },
        };
        return { ...state, ...{ view } };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=pathChangeRequest.js.map