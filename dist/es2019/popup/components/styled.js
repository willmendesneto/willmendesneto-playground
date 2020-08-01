import styled from 'styled-components';
import { fontFamily } from '@atlaskit/theme/constants';
import { N30 } from '@atlaskit/theme/colors';
const MIN_HEIGHT = '498px';
export const MediaPickerPopupWrapper = styled.div `
  display: flex;
  cursor: default;
  user-select: none;
  font-family: ${fontFamily()};
  border-radius: 3px;
  position: relative;

  /* Ensure that the modal has a static size */
  width: 968px;
`;
export const SidebarWrapper = styled.div `
  width: 235px;
  min-width: 235px;
  background-color: ${N30};
  min-height: ${MIN_HEIGHT};
`;
export const ViewWrapper = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;

  /* Height of the Popup should never change */
  height: calc(100vh - 200px);

  background-color: white;
  min-height: ${MIN_HEIGHT};
`;
//# sourceMappingURL=styled.js.map