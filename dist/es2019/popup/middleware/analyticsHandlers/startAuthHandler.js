import { isStartAuthAction } from '../../actions/startAuth';
import { buttonClickPayload } from '.';
export default (action) => {
    if (isStartAuthAction(action)) {
        return [
            {
                ...buttonClickPayload,
                actionSubjectId: 'linkCloudAccountButton',
                attributes: {
                    cloudType: action.serviceName,
                },
            },
        ];
    }
};
//# sourceMappingURL=startAuthHandler.js.map