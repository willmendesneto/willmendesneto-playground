import React from 'react';
import FieldText from '@atlaskit/textfield';
import { PluginHeaderWrapper } from './styled';
import { injectIntl } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
export var PluginHeader = injectIntl(function (_a) {
    var name = _a.name, loading = _a.loading, error = _a.error, totalImages = _a.totalImages, onQueryChange = _a.onQueryChange, query = _a.query, formatMessage = _a.intl.formatMessage;
    var isReady = !loading && !error;
    var hasImages = isReady && typeof totalImages === 'number';
    return (React.createElement(PluginHeaderWrapper, null,
        React.createElement("h3", null, name),
        !error && hasImages && (React.createElement(FieldText, { placeholder: formatMessage(messages.search), onChange: onQueryChange, value: query, width: 420 }))));
});
//# sourceMappingURL=header.js.map