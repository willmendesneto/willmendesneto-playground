import { isEditorCloseAction } from '../../actions/editorClose';
import { buttonClickPayload } from '.';
export default (action) => {
    if (isEditorCloseAction(action)) {
        return [
            {
                ...buttonClickPayload,
                actionSubjectId: `mediaEditor${action.selection}Button`,
            },
        ];
    }
};
//# sourceMappingURL=editorCloseHandler.js.map