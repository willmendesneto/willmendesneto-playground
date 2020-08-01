import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { searchGiphy } from '../../../actions/searchGiphy';
import { changeService } from '../../../actions/changeService';
import { StatelessSidebarItem } from './sidebarItem';
import { GiphyIcon } from '../icons';
export class StatelessGiphySidebarItem extends Component {
    render() {
        const { isActive, onChangeService } = this.props;
        return (React.createElement(StatelessSidebarItem, { serviceName: "giphy", serviceFullName: "GIPHY", isActive: isActive, onChangeService: onChangeService },
            React.createElement(GiphyIcon, { active: isActive })));
    }
}
const mapDispatchToProps = (dispatch) => ({
    onChangeService() {
        dispatch(changeService('giphy'));
        dispatch(searchGiphy('', false));
    },
});
export default connect(null, mapDispatchToProps)(StatelessGiphySidebarItem);
//# sourceMappingURL=giphySidebarItem.js.map