import { RECENTS_COLLECTION } from '@atlaskit/media-client/constants';
import { getFilesInRecentsFullfilled } from '../actions/getFilesInRecents';
import { getFilesInRecentsFailed } from '../actions/getFilesInRecents';
import { saveCollectionItemsSubscription } from '../actions/saveCollectionItemsSubscription';
import { isGetFilesInRecentsAction } from '../actions/getFilesInRecents';
export const getFilesInRecents = () => (store) => (next) => (action) => {
    if (isGetFilesInRecentsAction(action)) {
        requestRecentFiles(store);
    }
    return next(action);
};
export const requestRecentFiles = (store) => {
    const { userMediaClient, collectionItemsSubscription } = store.getState();
    if (collectionItemsSubscription) {
        collectionItemsSubscription.unsubscribe();
    }
    const subscription = userMediaClient.collection
        .getItems(RECENTS_COLLECTION)
        .subscribe({
        next(items) {
            store.dispatch(getFilesInRecentsFullfilled(items));
        },
        error() {
            store.dispatch(getFilesInRecentsFailed());
        },
    });
    store.dispatch(saveCollectionItemsSubscription(subscription));
};
//# sourceMappingURL=getFilesInRecents.js.map