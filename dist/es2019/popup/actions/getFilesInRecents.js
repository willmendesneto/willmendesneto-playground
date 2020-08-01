export const GET_FILES_IN_RECENTS = 'GET_FILES_IN_RECENTS';
export const isGetFilesInRecentsAction = (action) => {
    return action.type === GET_FILES_IN_RECENTS;
};
export const getFilesInRecents = () => {
    return {
        type: GET_FILES_IN_RECENTS,
    };
};
export const GET_FILES_IN_RECENTS_FULLFILLED = 'GET_FILES_IN_RECENTS_FULLFILLED';
export const isGetFilesInRecentsFullfilledAction = (action) => {
    return action.type === GET_FILES_IN_RECENTS_FULLFILLED;
};
export function getFilesInRecentsFullfilled(items) {
    return {
        type: GET_FILES_IN_RECENTS_FULLFILLED,
        items,
    };
}
export const GET_FILES_IN_RECENTS_FAILED = 'GET_FILES_IN_RECENTS_FAILED';
export const isGetFilesInRecentsFailedAction = (action) => {
    return action.type === GET_FILES_IN_RECENTS_FAILED;
};
export function getFilesInRecentsFailed() {
    return {
        type: GET_FILES_IN_RECENTS_FAILED,
    };
}
//# sourceMappingURL=getFilesInRecents.js.map