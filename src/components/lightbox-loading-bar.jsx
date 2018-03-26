import Preact, { h } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../actions/index';

class LightboxLoadingBar extends Preact.Component {
    render() {
        const classNames = ['q-lightbox-loading-bar'];

        if (this.props.isLoading) {
            classNames.push('q-lightbox-loading-bar_is-active');
        }

        return (
            <div class={classNames.join(' ')}>
                <div className="q-lightbox-loading-bar__indeterminate"></div>
            </div>
        );
    }
};

export default connect(['isLoading'], actions)(LightboxLoadingBar);