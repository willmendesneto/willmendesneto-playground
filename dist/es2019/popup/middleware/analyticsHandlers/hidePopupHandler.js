import { isHidePopupAction } from '../../actions/hidePopup';
import { buttonClickPayload } from '.';
import { normalizeRecentFilesAge } from '../../tools/normalizeRecentFilesAge';
export default (action, store) => {
    if (isHidePopupAction(action)) {
        const { selectedItems = [] } = store.getState();
        const actionSubjectId = selectedItems.length > 0 ? 'insertFilesButton' : 'cancelButton';
        const files = actionSubjectId === 'insertFilesButton'
            ? selectedItems.map(item => ({
                fileId: item.id,
                fileMimetype: item.mimeType,
                fileSize: item.size,
                accountId: item.accountId,
                serviceName: item.serviceName,
                ...(item.serviceName === 'recent_files'
                    ? { fileAge: normalizeRecentFilesAge(item.createdAt) }
                    : {}),
            }))
            : [];
        const serviceNames = selectedItems.length > 0
            ? {
                serviceNames: selectedItems.map(i => i.serviceName),
            }
            : {};
        return [
            {
                ...buttonClickPayload,
                actionSubjectId,
                attributes: {
                    fileCount: selectedItems.length,
                    ...serviceNames,
                    ...(actionSubjectId === 'insertFilesButton' ? { files } : {}),
                },
            },
        ];
    }
};
//# sourceMappingURL=hidePopupHandler.js.map