import Preact, { h } from 'preact';
import { connect } from 'unistore/preact';
import LightboxContent from './lightbox-content';
import LightboxArrows from './lightbox-arrows';
import LightboxCloseButton from './lightbox-close-button';
import LightboxLoadingBar from './lightbox-loading-bar';
import actions from '../actions/index';

class QLightbox extends Preact.Component {
    canNavigate() {
        return this.props.canNavigate && this.props.isTransitioning === false;
    }
    
    gotoItem(index) {
        this.props.setCanNavigate(false);
        this.props.setCurrentItem(index);
    }

    gotoNext() {
        if (!this.canNavigate()) return;

        const nextSlideIndex = this.props.currentItem < this.props.items.length - 1 ? this.props.currentItem + 1 : 0;
        this.gotoItem(nextSlideIndex);
    }

    gotoPrev() {
        if (!this.canNavigate()) return;

        const prevSlideIndex = this.props.currentItem > 0 ? this.props.currentItem - 1 : this.props.items.length - 1;
        this.gotoItem(prevSlideIndex);
    }

    render() {
        return (
            <div class="q-lightbox" style={this.props.isVisible ? { opacity: 1, pointerEvents: 'all' } : { opacity: 0, pointerEvents: 'none' }}>
                <LightboxContent item={this.props.items[this.props.currentItem]} transitionDuration={this.props.transitionDuration} />
                <LightboxLoadingBar />

                {this.props.showArrows && (
                    <LightboxArrows onNextClick={this.gotoNext.bind(this)} onPrevClick={this.gotoPrev.bind(this)} />
                )}
                <LightboxCloseButton />
            </div>
        )
    }
};

QLightbox.defaultProps = {
    showArrows: true,
    transitionDuration: 500
};

export default connect(['currentItem', 'isVisible', 'isTransitioning', 'canNavigate'], actions)(QLightbox);