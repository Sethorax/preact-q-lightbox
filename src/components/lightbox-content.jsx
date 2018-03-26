import Preact, { h } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../actions/index';

class LightboxContent extends Preact.Component {
    constructor() {
        super();

        this.state = {
            currentContent: null,
            nextContent: null,
            mediumMaxWidth: 0,
            mediumMaxHeight: 0,
            maxContentBoxWidth: 0,
            contentBoxHeightRatio: 0
        };
    }

    componentWillMount() {
        this.loadingWarmupTimer = null;
        this.contentInnerRef = null;
        this.maxPossibleContentHeight = 0;
    }

    componentDidMount() {
        this.renderItem();

        let timer;
        window.addEventListener('resize', () => requestAnimationFrame(() => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.setState(this.calculateContentBoxDimensions());
            }, 100);
        }));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item !== this.props.item) {
            this.renderItem();
        }
    }

    setContent(content, width, height) {
        clearTimeout(this.loadingWarmupTimer);
        this.props.setLoadingState(false);
        this.props.setTransitionState(true);

        this.setState(Object.assign({
            nextContent: content,
            mediumMaxWidth: width,
            mediumMaxHeight: height
        }, this.calculateContentBoxDimensions.bind(this)(width, height)));

        setTimeout(() => {
            this.setState({
                currentContent: content,
                isTransitioning: false
            });
            this.props.setTransitionState(false);
        }, this.props.transitionDuration);
    }

    calculateContentBoxDimensions(mediumMaxWidth = this.state.mediumMaxWidth, mediumMaxHeight = this.state.mediumMaxHeight) {
        const heightRatio = mediumMaxHeight * 100 / mediumMaxWidth;
        const maxPossibleContentWidth = mediumMaxWidth * this.contentInnerRef.clientHeight / mediumMaxHeight;

        return {
            contentBoxHeightRatio: heightRatio,
            maxContentBoxWidth: mediumMaxWidth > maxPossibleContentWidth ? maxPossibleContentWidth : mediumMaxWidth
        };
    }

    handleContentInnerRef(element) {
        if (element) {
            this.contentInnerRef = element;
        }
    }

    startLoadingWarmupTimer() {
        this.loadingWarmupTimer = setTimeout(() => {
            this.props.setLoadingState(true);
        }, 100);
    }

    renderItem() {
        this.startLoadingWarmupTimer();

        new Promise(resolve => {
            switch (this.props.item.type) {
                case 'image':
                    this.renderImage().then(resolve);
                    break;
            }
        }).then(data => this.setContent(data.content, data.width, data.height));
    }

    renderImage() {
        return new Promise(resolve => {
            const image = new Image();

            image.onload = () => {
                resolve({
                    content: <img className="q-lightbox-content__media q-lightbox-content__media_image" src={this.props.item.src} />,
                    width: image.width,
                    height: image.height
                });
            };

            image.src = this.props.item.src;
        });
    }

    render() {
        return (
            <div className="q-lightbox-content">
                <div ref={this.handleContentInnerRef.bind(this)} className="q-lightbox-content__inner">
                    <div className="q-lightbox-content__sizer" style={{ maxWidth: this.state.maxContentBoxWidth, transitionDuration: `${this.props.transitionDuration}ms` }}>
                        <div className="q-lightbox-content__holder" style={{ width: '100%', paddingBottom: `${this.state.contentBoxHeightRatio}%`, transitionDuration: `${this.props.transitionDuration}ms` }}>
                            <div className="q-lightbox-content__media-holder">{this.state.nextContent}</div>
                            <div className="q-lightbox-content__media-holder" style={{ transitionDuration: this.props.isTransitioning ? `${this.props.transitionDuration}ms` : '0ms', opacity: this.props.isTransitioning ? '0' : '1' }}>{this.state.currentContent}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

LightboxContent.defaultProps = {
    transitionDuration: 300
};

export default connect(['isVisible', 'isTransitioning'], actions)(LightboxContent);