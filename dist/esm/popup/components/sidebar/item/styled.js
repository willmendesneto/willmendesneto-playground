import { __makeTemplateObject } from "tslib";
import styled from 'styled-components';
import { B400, N500 } from '@atlaskit/theme/colors';
export var Wrapper = styled.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: ", ";\n  padding: 6px 25px;\n  list-style-type: none;\n  opacity: 1;\n  display: flex;\n  align-items: center;\n\n  ", ";\n  &:hover {\n    ", ";\n  }\n"], ["\n  color: ", ";\n  padding: 6px 25px;\n  list-style-type: none;\n  opacity: 1;\n  display: flex;\n  align-items: center;\n\n  ", ";\n  &:hover {\n    ",
    ";\n  }\n"])), function (_a) {
    var isActive = _a.isActive;
    return (isActive ? B400 : N500);
}, function (_a) {
    var isActive = _a.isActive;
    return (isActive ? '' : 'cursor: pointer');
}, function (_a) {
    var isActive = _a.isActive;
    return isActive ? '' : 'background-color: #E5E8EC';
});
export var ServiceIcon = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
export var ServiceName = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 14px;\n  position: relative;\n  margin-left: 10px;\n  top: -1px;\n  display: inline-block;\n  text-transform: capitalize;\n  width: 160px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"], ["\n  font-size: 14px;\n  position: relative;\n  margin-left: 10px;\n  top: -1px;\n  display: inline-block;\n  text-transform: capitalize;\n  width: 160px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=styled.js.map