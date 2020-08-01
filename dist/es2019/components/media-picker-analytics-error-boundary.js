import React from 'react';
import AnalyticsErrorBoundary from '@atlaskit/analytics-next/AnalyticsErrorBoundary';
export const ANALYTICS_MEDIA_CHANNEL = 'media';
export default class MediaPickerAnalyticsErrorBoundary extends React.Component {
    render() {
        const { data = {}, children } = this.props;
        return (React.createElement(AnalyticsErrorBoundary, { channel: ANALYTICS_MEDIA_CHANNEL, data: data }, children));
    }
}
MediaPickerAnalyticsErrorBoundary.displayName = 'MediaPickerAnalyticsErrorBoundary';
//# sourceMappingURL=media-picker-analytics-error-boundary.js.map