import { couldNotLoadImage } from '../components/views/editor/phrases';
import { editorShowError } from '../actions/editorShowError';
import { editorShowImage } from '../actions/editorShowImage';
import { editorShowLoading } from '../actions/editorShowLoading';
import { EDIT_REMOTE_IMAGE, } from '../actions/editRemoteImage';
// When we complete upload, we need to check if we can open the editor.
// What can be changed:
// 1) The user pressed ESC and the editor shouldn't appear. In this case state.editorData will be null.
// 2) The user has chosen another image to edit. In this case state.editorData.originalFile.id will be different.
//
// We continue with the uploaded image only if:
// - the file is the same
// - state.imageUrl is not defined (the editor is not open)
const continueRenderingEditor = (id, store) => {
    const { editorData } = store.getState();
    if (!editorData) {
        return false;
    }
    const { originalFile, imageUrl } = editorData;
    if (originalFile) {
        return originalFile.id === id && !imageUrl;
    }
    else {
        return false;
    }
};
export const editRemoteImageMiddleware = () => (store) => (next) => (action) => {
    if (action.type === EDIT_REMOTE_IMAGE) {
        editRemoteImage(store, action);
    }
    return next(action);
};
export function editRemoteImage(store, action) {
    const { item, collectionName } = action;
    const { userMediaClient } = store.getState();
    store.dispatch(editorShowLoading(item));
    return userMediaClient
        .getImageUrl(item.id, {
        mode: 'full-fit',
        collection: collectionName,
    })
        .then(imageUrl => {
        if (continueRenderingEditor(item.id, store)) {
            store.dispatch(editorShowImage(imageUrl));
        }
    })
        .catch(() => {
        if (continueRenderingEditor(item.id, store)) {
            const retryHandler = () => {
                store.dispatch(action);
            };
            store.dispatch(editorShowError(couldNotLoadImage, retryHandler));
        }
    });
}
//# sourceMappingURL=editRemoteImage.js.map