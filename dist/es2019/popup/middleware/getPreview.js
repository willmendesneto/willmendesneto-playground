import { isGetPreviewAction } from '../actions/getPreview';
import { sendUploadEvent } from '../actions/sendUploadEvent';
import { getPreviewFromMetadata } from '../../domain/preview';
export default function () {
    return store => (next) => (action) => {
        if (isGetPreviewAction(action)) {
            getPreview(store, action);
        }
        return next(action);
    };
}
const dispatchPreviewUpdate = (store, { fileId, file }, preview) => {
    store.dispatch(sendUploadEvent({
        event: {
            name: 'upload-preview-update',
            data: {
                file,
                preview,
            },
        },
        fileId,
    }));
};
export function getPreview(store, action) {
    const { file, collection } = action;
    const { userMediaClient } = store.getState();
    userMediaClient.file
        .getFileState(file.id, { collectionName: collection })
        .subscribe({
        async next(state) {
            if (state.status === 'error') {
                return;
            }
            const { mediaType } = state;
            this.unsubscribe();
            if (mediaType === 'image' || mediaType === 'video') {
                const metadata = await userMediaClient.getImageMetadata(file.id, {
                    collection,
                });
                const preview = getPreviewFromMetadata(metadata);
                dispatchPreviewUpdate(store, action, preview);
            }
            else {
                const blob = state.preview && (await state.preview);
                const preview = {
                    file: state.preview && blob instanceof Blob ? blob : undefined,
                };
                dispatchPreviewUpdate(store, action, preview);
            }
        },
    });
}
//# sourceMappingURL=getPreview.js.map