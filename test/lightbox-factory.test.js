import Preact from 'preact';
import { Lightbox } from '../src/lightbox-factory';
import { store } from '../src/store/index';

jest.mock('preact');

describe('Lightbox Factory', () => {
    it('should create instance', () => {
        expect(typeof Lightbox()).toBe('object');
    });

    it('should validate items', () => {
        console.warn = jest.fn();
        const instance = Lightbox();

        expect(console.warn).not.toBeCalled();

        instance.render([{ type: 'image', src: '' }]);
        expect(console.warn).not.toBeCalled();

        instance.render();
        expect(console.warn).toBeCalled();
        console.warn.mockClear();

        instance.render([]);
        expect(console.warn).toBeCalled();
        console.warn.mockClear();

        instance.render([{ type: 'invaildType' }]);
        expect(console.warn).toBeCalled();
        console.warn.mockClear();

        instance.render([{ type: 'image' }]);
        expect(console.warn).toBeCalled();
    });

    it('should create only one root element', done => {
        const elements = [];

        Preact.render = jest.fn((jsx, _, element) => {
            elements.push(element);

            if (elements.length >= 2) {
                expect(elements[0] === elements[1]).toBeTruthy();
                done();
            }
        });

        Lightbox().render([{ type: 'image', src: '' }]);
        Lightbox().render([{ type: 'image', src: '' }]);
    });

    it('should set default props', () => {
        const instance = Lightbox();
        instance.setDefaultProps({ test: true });

        expect(instance.defaultProps.test).toBeTruthy();
    });

    it('should show itself after rendering', () => {
        const instance = Lightbox();
        instance.render([{ type: 'image', src: '' }]);

        expect(store.getState().isVisible).toBeTruthy();
    });

    it('should set start index as current item in store', () => {
        const instance = Lightbox();
        instance.render([{ type: 'image', src: '' }], 3);

        expect(store.getState().currentItem).toBe(3);
    });
});