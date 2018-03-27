import Preact, { h } from 'preact';
import { Provider } from 'unistore/preact';
import { renderComponent } from '../utils';
import { store } from '../../src/store/index';
import QLightbox from '../../src/components/q-lightbox';

let component = renderComponent();;
component.registerComponent(props => (
    <Provider store={store}>
        <QLightbox {...props} />
    </Provider>
));

export const createQLightbox = async (props = {}) => {
    return await component.render(props);
}

export const resetQLightbox = (props = {}) => {
    component.reset({
        items: undefined
    }, props);
};

export const setQLightboxProps = async (newProps) => {
    return await component.setProps(newProps);
};