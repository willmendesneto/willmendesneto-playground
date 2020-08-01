import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
export const Wrapper = styled.div `
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;

  height: 80px;
  padding: 26px 15px 23px 18px;
`;
export const InsertButton = (props) => (React.createElement(Button, Object.assign({}, props, { theme: (currentTheme, themeProps) => {
        const { buttonStyles, ...rest } = currentTheme(themeProps);
        return {
            buttonStyles: {
                ...buttonStyles,
                marginRight: '5px',
            },
            ...rest,
        };
    } })));
export const CancelButton = (props) => React.createElement(Button, Object.assign({}, props));
//# sourceMappingURL=styled.js.map