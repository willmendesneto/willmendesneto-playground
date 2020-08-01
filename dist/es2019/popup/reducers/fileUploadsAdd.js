import { isFileUploadsStartAction } from '../actions/fileUploadsStart';
export default function fileUploadsAdd(state, action) {
    if (isFileUploadsStartAction(action)) {
        const { uploads, selectedItems, lastUploadIndex } = state;
        const files = action.files;
        const newUploads = {};
        let newLastUploadIndex = lastUploadIndex;
        files.forEach(({ id, name, type, size, occurrenceKey }) => {
            newUploads[id] = {
                file: {
                    metadata: {
                        id,
                        name,
                        mimeType: type,
                        size,
                        occurrenceKey,
                    },
                },
                timeStarted: Date.now(),
                index: newLastUploadIndex++,
            };
        });
        const newSelectedItems = files.map(({ id, name, type, size, occurrenceKey }) => ({
            date: 0,
            id,
            occurrenceKey,
            mimeType: type,
            name,
            parentId: '',
            size,
            serviceName: 'upload',
        }));
        return {
            ...state,
            uploads: {
                ...uploads,
                ...newUploads,
            },
            selectedItems: [...selectedItems, ...newSelectedItems],
            lastUploadIndex: newLastUploadIndex,
        };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=fileUploadsAdd.js.map