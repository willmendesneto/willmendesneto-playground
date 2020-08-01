export const REMOVE_FILES_FROM_RECENTS = 'REMOVE_FILES_FROM_RECENTS';
export const isRemoveFileFromRecentsAction = (action) => {
    return action.type === REMOVE_FILES_FROM_RECENTS;
};
export const removeFileFromRecents = (id, occurrenceKey) => {
    return {
        type: REMOVE_FILES_FROM_RECENTS,
        id,
        occurrenceKey,
    };
};
//# sourceMappingURL=removeFileFromRecents.js.map