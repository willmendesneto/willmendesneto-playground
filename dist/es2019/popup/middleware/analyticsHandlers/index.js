import { UI_EVENT_TYPE, } from '@atlaskit/analytics-gas-types';
import handleCloudFetchingEventHandler from './handleCloudFetchingEventHandler';
import editorCloseHandler from './editorCloseHandler';
import editRemoteImageHandler from './editRemoteImageHandler';
import changeServiceHandler from './changeServiceHandler';
import hidePopupHandler from './hidePopupHandler';
import startAuthHandler from './startAuthHandler';
import startFileBrowserHandler from './startFileBrowserHandler';
import fileListUpdateHandler from './fileListUpdateHandler';
import searchGiphyHandler from './searchGiphyHandler';
import editorShowImageHandler from './editorShowImageHandler';
import showPopupHandler from './showPopupHandler';
import failureErrorLoggerHandler from './failureErrorLoggerHandler';
export const buttonClickPayload = {
    action: 'clicked',
    actionSubject: 'button',
    eventType: UI_EVENT_TYPE,
};
export default [
    handleCloudFetchingEventHandler,
    editorCloseHandler,
    editRemoteImageHandler,
    changeServiceHandler,
    hidePopupHandler,
    startAuthHandler,
    startFileBrowserHandler,
    fileListUpdateHandler,
    searchGiphyHandler,
    editorShowImageHandler,
    showPopupHandler,
    failureErrorLoggerHandler,
];
//# sourceMappingURL=index.js.map