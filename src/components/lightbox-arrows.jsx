import Preact, { h } from 'preact';
import { connect } from 'unistore/preact';

class LightboxArrows extends Preact.Component {
    render() {
        return (
            <div class="q-lightbox-arrows">
                <div onClick={this.props.onPrevClick} className="q-lightbox-arrows__arrow q-lightbox-arrows__arrow_prev"></div>
                <div onClick={this.props.onNextClick} className="q-lightbox-arrows__arrow q-lightbox-arrows__arrow_next"></div>
            </div>
        )
    }
};

export default connect([])(LightboxArrows);