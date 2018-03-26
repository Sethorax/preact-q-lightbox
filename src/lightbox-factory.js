import Preact, { h } from 'preact';
import { Provider } from 'unistore/preact';
import { store } from './store/index';
import QLightbox from './components/q-lightbox';

let rootElement;
const getRootElement = () => {
    if (!rootElement) {
        rootElement = document.createElement('div');
        document.body.appendChild(rootElement);
    }

    return rootElement;
};

export const Lightbox = () => ({
    defaultProps: {},

    render(items, startIndex) {
        const props = Object.assign(this.defaultProps, { items });
        store.setState({ currentItem: startIndex });

        Preact.render(
            <Provider store={store}>
                <QLightbox {...props} />
            </Provider>
        , null, getRootElement());

        store.setState({ isVisible: true });
    },

    setDefaultProps(props) {
        this.defaultProps = Object.assign(this.defaultProps, props);
    }
});