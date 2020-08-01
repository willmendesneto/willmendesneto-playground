import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isEditorShowImageAction } from '../../actions/editorShowImage';
export default (action) => {
    if (isEditorShowImageAction(action)) {
        const { imageUrl = undefined, originalFile = undefined } = action;
        return [
            {
                name: 'fileEditorModal',
                eventType: SCREEN_EVENT_TYPE,
                attributes: {
                    imageUrl,
                    originalFile,
                },
            },
        ];
    }
};
//# sourceMappingURL=editorShowImageHandler.js.map