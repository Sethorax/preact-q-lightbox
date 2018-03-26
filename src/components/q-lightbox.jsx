import Preact, { h } from 'preact';
import { connect } from 'unistore/preact';
import LightboxContent from './lightbox-content';
import LightboxArrows from './lightbox-arrows';
import LightboxCloseButton from './lightbox-close-button';
import LightboxControlBar from './lightbox-control-bar';
import actions from '../actions/index';

class QLightbox extends Preact.Component {
    canNavigate() {
        return this.props.isTransitioning === false;
    }
    
    gotoNext() {
        if (!this.canNavigate()) return;

        const nextSlideIndex = this.props.currentItem < this.props.items.length - 1 ? this.props.currentItem + 1 : 0;
        this.props.setCurrentItem(nextSlideIndex);
    }

    gotoPrev() {
        if (!this.canNavigate()) return;

        const prevSlideIndex = this.props.currentItem > 0 ? this.props.currentItem - 1 : this.props.items.length - 1;
        this.props.setCurrentItem(prevSlideIndex);
    }

    render() {
        return (
            <div class="q-lightbox" style={this.props.isVisible ? { opacity: 1, pointerEvents: 'all' } : { opacity: 0, pointerEvents: 'none' }}>
                <LightboxContent item={this.props.items[this.props.currentItem]} />
                <LightboxControlBar />

                <LightboxArrows onNextClick={this.gotoNext.bind(this)} onPrevClick={this.gotoPrev.bind(this)} />
                <LightboxCloseButton />
            </div>
        )
    }
};

export default connect(['currentItem', 'isVisible', 'isTransitioning'], actions)(QLightbox);