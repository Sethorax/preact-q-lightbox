import { Lightbox } from './lightbox-factory';

let lightbox = null;
export const displayLightbox = (items, startIndex = 0) => {
    if (!lightbox) lightbox = Lightbox();

    lightbox.render(items, startIndex);
};

export const configure = props => {
    if (!lightbox) lightbox = Lightbox();

    lightbox.configure(props);
};