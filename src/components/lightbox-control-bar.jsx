import Preact, { h } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../actions/index';
import LightboxLoadingBar from './lightbox-loading-bar';

class LightboxControlBar extends Preact.Component {
    render() {
        return (
            <div class="q-lightbox-control-bar">
                <LightboxLoadingBar />
            </div>
        );
    }
};

export default connect([], actions)(LightboxControlBar);