import styled from 'styled-components';
// TODO: ECEEF1 is not an atlaskit colour
// https://product-fabric.atlassian.net/browse/MSW-156
export const Wrapper = styled.div `
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-color: #eceef1;
  z-index: 60;
`;
export const ServiceList = styled.ul `
  padding: 0;
  float: left;
  width: 100%;
  margin: 17px 0 0 0 !important; /* We need important here due to default "ul" style overrides */
`;
export const Separator = styled.li `
  width: 100%;
  list-style-type: none;
  margin: 9px 0 10px 0;
  box-sizing: border-box;
  padding: 0 25px 0 25px;
  position: relative;
  cursor: default;
`;
// TODO: rgba(9, 30, 66, 0.06) is not an atlaskit colour
// https://product-fabric.atlassian.net/browse/MSW-156
export const SeparatorLine = styled.div `
  width: 100%;
  border-top: 1px solid rgba(9, 30, 66, 0.06);
  height: 0;
`;
export const StyledIcon = styled.svg `
  width: 22px;
  height: 22px;
`;
export const StyledSvgGroup = styled.g `
  fill: ${({ active }) => (active ? '#0061C5' : '#42526E')};
`;
//# sourceMappingURL=styled.js.map