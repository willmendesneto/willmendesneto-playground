import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { changeService } from '../../../actions/changeService';
import { Wrapper, ServiceIcon, ServiceName } from './styled';
export class StatelessSidebarItem extends Component {
    constructor() {
        super(...arguments);
        this.onClick = () => this.props.onChangeService(this.props.serviceName);
    }
    render() {
        const { serviceFullName, serviceName, isActive, children } = this.props;
        return (React.createElement(Wrapper, { "data-testid": `media-picker-${serviceName}-menu-item`, isActive: isActive, onClick: this.onClick },
            React.createElement(ServiceIcon, null, children),
            React.createElement(ServiceName, null, serviceFullName)));
    }
}
const mapDispatchToProps = (dispatch) => ({
    onChangeService: (serviceName) => dispatch(changeService(serviceName)),
});
export default connect(null, mapDispatchToProps)(StatelessSidebarItem);
//# sourceMappingURL=sidebarItem.js.map