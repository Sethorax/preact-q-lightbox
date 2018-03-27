import { Lightbox } from './lightbox-factory';

let lightbox = null;
export const displayLightbox = (items, startIndex) => {
    if (!lightbox) lightbox = Lightbox();

    lightbox.render(items, startIndex);
};

export const configureLightbox = props => {
    if (!lightbox) lightbox = Lightbox();

    lightbox.setDefaultProps(props);
};