import Preact, { h } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../actions/index';

class LightboxCloseButton extends Preact.Component {
    handleClick() {
        this.props.hideLightbox();
    }

    render() {
        return <div onClick={this.handleClick.bind(this)} class="q-lightbox-close-button" />
    }
};

export default connect([], actions)(LightboxCloseButton);