import { isEditRemoteImageAction } from '../../actions/editRemoteImage';
import { buttonClickPayload } from '.';
export default (action) => {
    if (isEditRemoteImageAction(action)) {
        const { collectionName, item: { id = undefined } = {} } = action;
        return [
            {
                ...buttonClickPayload,
                actionSubjectId: 'annotateFileButton',
                attributes: {
                    collectionName,
                    fileId: id,
                },
            },
        ];
    }
};
//# sourceMappingURL=editRemoteImageHandler.js.map