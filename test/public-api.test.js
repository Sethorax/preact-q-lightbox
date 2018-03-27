import * as publicAPI from '../src/index';
import * as lightboxFactory from '../src/lightbox-factory';

jest.mock('../src/lightbox-factory');

const renderMock = jest.fn();

lightboxFactory.Lightbox = jest.fn(() => ({
    render: renderMock
}));


describe('Public API', () => {

    beforeEach(() => {
        lightboxFactory.Lightbox.mockClear();
        renderMock.mockClear();
    });

    it('should export public api functions', () => {
        expect(publicAPI).toBeDefined();
        expect(publicAPI).toHaveProperty('displayLightbox');
        expect(publicAPI).toHaveProperty('configureLightbox');
    });

    it('should only create one Lightbox instance ever', () => {
        const iterations = 5;

        for (let i = 0; i < iterations; i++) {
            publicAPI.displayLightbox();
        }

        expect(renderMock.mock.calls.length).toBe(iterations);
        expect(lightboxFactory.Lightbox.mock.calls.length).toBe(1);
    });
});