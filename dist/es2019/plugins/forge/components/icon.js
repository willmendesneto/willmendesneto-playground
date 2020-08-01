import React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/image';
import { PluginIcon } from './styled';
export const ForgeIcon = (props) => {
    if (props.iconUrl) {
        return React.createElement(PluginIcon, { src: props.iconUrl });
    }
    else {
        return React.createElement(ImageIcon, { label: "image-icon" });
    }
};
//# sourceMappingURL=icon.js.map