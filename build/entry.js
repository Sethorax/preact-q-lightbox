import { displayLightbox } from '../src/index';

const items = [];
Array.from(document.querySelectorAll('img')).forEach((img, index) => {
    items.push({ type: 'image', src: img.dataset.src });

    img.addEventListener('click', () => {
        displayLightbox(items, index);
    });
});

//document.getElementById('open').addEventListener('click', () => displayLightbox(items));