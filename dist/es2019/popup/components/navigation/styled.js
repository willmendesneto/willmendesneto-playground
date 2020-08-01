import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import { N0, N500, N900 } from '@atlaskit/theme/colors';
export const FolderViewerNavigation = styled.div `
  display: flex;
  justify-content: space-between;

  /* Ensure header has height */
  min-height: 60px;
  padding: 15px 13px;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: ${N0};
`;
FolderViewerNavigation.displayName = 'FolderViewerNavigation';
export const ControlsWrapper = styled.div ``;
export const Controls = styled.div `
  height: 30px;
  display: flex;
`;
export const ControlButton = (props) => (React.createElement(Button, Object.assign({}, props, { theme: (currentTheme, themeProps) => {
        const { buttonStyles, ...rest } = currentTheme(themeProps);
        return {
            buttonStyles: {
                ...buttonStyles,
                marginRight: '5px',
            },
            ...rest,
        };
    } })));
export const BreadCrumbs = styled.div `
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const BreadCrumbLinkLabel = styled.span `
  &:hover {
    text-decoration: ${(props) => props.isLast ? 'none' : 'underline'};
  }
`;
export const BreadCrumbLinkSeparator = styled.span `
  color: ${N500};
  display: ${(props) => props.isLast ? 'none' : 'inline'};
  margin: 0 4px;
  text-decoration: none;
`;
export const BreadCrumbLink = styled.span `
  color: ${(props) => (props.isLast ? N900 : N500)};
  cursor: ${(props) => props.isLast ? 'default' : 'pointer'};
  font-size: ${(props) => props.isLast ? '20px' : '14px'};
`;
export const AccountItemButton = (props) => React.createElement(Button, Object.assign({}, props));
// Dropdown is NOT intentionally extended by this component to allow HACK style below to work
export const AccountDropdownWrapper = styled.div `
  /* TODO: remove this when the ak-dropdown-menu package supports custom item types */
  span[role='presentation'] > span > span:first-child {
    display: none;
  }
`;
//# sourceMappingURL=styled.js.map