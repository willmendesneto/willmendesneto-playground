import React from 'react';
import FieldText from '@atlaskit/textfield';
import { PluginHeaderWrapper } from './styled';
import { injectIntl } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
export const PluginHeader = injectIntl(({ name, loading, error, totalImages, onQueryChange, query, intl: { formatMessage }, }) => {
    const isReady = !loading && !error;
    const hasImages = isReady && typeof totalImages === 'number';
    return (React.createElement(PluginHeaderWrapper, null,
        React.createElement("h3", null, name),
        !error && hasImages && (React.createElement(FieldText, { placeholder: formatMessage(messages.search), onChange: onQueryChange, value: query, width: 420 }))));
});
//# sourceMappingURL=header.js.map