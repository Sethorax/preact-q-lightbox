import Preact, { h } from 'preact';
import { store } from '../src/store/index';
import { createQLightbox, resetQLightbox, setQLightboxProps } from './components/qlightbox';
import { resetStore, setInitialStoreState } from './utils';
import QLightbox from '../src/components/q-lightbox';
import LightboxContent from '../src/components/lightbox-content';
import LightboxArrows from '../src/components/lightbox-arrows';
import LightboxCloseButton from '../src/components/lightbox-close-button';
import LightboxLoadingBar from '../src/components/lightbox-loading-bar';

describe('QLightbox', () => {
    beforeAll(() => setInitialStoreState(store));

    beforeEach(() => {
        resetQLightbox({
            items: [
                {type: 'image', src: ''},
                {type: 'image', src: ''},
                {type: 'image', src: ''}
            ],
            transitionDuration: 100
        });

        resetStore(store);
    });

    it('should always render the lightbox content component', async () => {
        const qLightbox = await createQLightbox();
        expect(qLightbox.find(LightboxContent).length).toBe(1);
    });

    it('should always render the lightbox loading bar component', async () => {
        const qLightbox = await createQLightbox();
        expect(qLightbox.find(LightboxLoadingBar).length).toBe(1);
    });

    it('should always render the lightbox close button component', async () => {
        const qLightbox = await createQLightbox();
        expect(qLightbox.find(LightboxCloseButton).length).toBe(1);
    });

    it('should render arrows by default', async () => {
        const qLightbox = await createQLightbox();
        expect(qLightbox.find(LightboxArrows).length).toBe(1);
    });

    it('should not render arrows if disabled by props', async () => {
        const qLightbox = await createQLightbox({ showArrows: false });
        expect(qLightbox.find(LightboxArrows).length).toBe(0);
    });

    it('should transition to the next item', async () => {
        const qLightbox = await createQLightbox();

        expect(store.getState().currentItem).toBe(0);
        qLightbox.find('.q-lightbox-arrows__arrow_next').simulate('click');
        expect(store.getState().currentItem).toBe(1);
    });

    it('should transition to the previous item', async () => {
        const qLightbox = await createQLightbox();

        expect(store.getState().currentItem).toBe(0);
        qLightbox.find('.q-lightbox-arrows__arrow_prev').simulate('click');
        expect(store.getState().currentItem).toBe(2);
    });

    it('should transition to the first item if transitioning from the last item to the next', async (done) => {
        const qLightbox = await createQLightbox();
        
        expect(store.getState().currentItem).toBe(0);
        store.setState({ currentItem: 2 });
        expect(store.getState().currentItem).toBe(2);

        setTimeout(() => {
            qLightbox.find('.q-lightbox-arrows__arrow_next').simulate('click');    
            expect(store.getState().currentItem).toBe(0);
            done();
        }, 100);
    });

    it('should not transition again whilst a transition is already active', async () => {
        const qLightbox = await createQLightbox();

        expect(store.getState().currentItem).toBe(0);
        qLightbox.find('.q-lightbox-arrows__arrow_next').simulate('click');
        qLightbox.find('.q-lightbox-arrows__arrow_next').simulate('click');
        qLightbox.find('.q-lightbox-arrows__arrow_next').simulate('click');
        expect(store.getState().currentItem).toBe(1);
    });

    it('should close the lightbox if the close button is clicked', async () => {
        const qLightbox = await createQLightbox();

        store.setState({ isVisible: true });
        expect(store.getState().isVisible).toBeTruthy();

        qLightbox.find('.q-lightbox-close-button').simulate('click');
        expect(store.getState().isVisible).toBeFalsy();
    });

    it('should close the lightbox if the background part of the content area is clicked', async () => {
        const qLightbox = await createQLightbox();

        store.setState({ isVisible: true });
        expect(store.getState().isVisible).toBeTruthy();

        qLightbox.find('.q-lightbox-content').simulate('click');
        expect(store.getState().isVisible).toBeFalsy();
    });
});