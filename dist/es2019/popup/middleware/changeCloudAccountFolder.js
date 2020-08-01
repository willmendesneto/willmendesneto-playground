import { requestUnlinkCloudAccount } from '../actions/unlinkCloudAccount';
import { isChangeCloudAccountFolderAction } from '../actions/changeCloudAccountFolder';
import { fileListUpdate } from '../actions/fileListUpdate';
export const changeCloudAccountFolderMiddleware = (fetcher) => (store) => (next) => (action) => {
    if (isChangeCloudAccountFolderAction(action)) {
        const { userMediaClient } = store.getState();
        const { serviceName, accountId, path } = action;
        const lastPath = path.length === 0 ? { id: '', name: '' } : path[path.length - 1];
        userMediaClient.config
            .authProvider()
            .then(auth => fetcher.fetchCloudAccountFolder(auth, serviceName, accountId, lastPath.id))
            .then(folder => store.dispatch(fileListUpdate(accountId, path, folder.items, serviceName, undefined, folder.cursor)))
            .catch(error => {
            /* TODO: Error Collector */
            if (error.response && error.response.status === 401) {
                store.dispatch(requestUnlinkCloudAccount({ id: accountId, name: serviceName }));
            }
        });
    }
    return next(action);
};
//# sourceMappingURL=changeCloudAccountFolder.js.map