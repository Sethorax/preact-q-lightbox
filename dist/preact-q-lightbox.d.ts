export const enum ItemType {
    Image = 'image',
}

interface LightboxItem {
    type: ItemType,
    src: string,
}

interface LightboxItems {
    [index: number]: LightboxItem
}

interface Props {
    showArrows?: boolean,
    transitionDuration?: number,
}

export function displayLightbox(items: LightboxItems, startIndex: number): void;
export function configureLightbox(props: Props): void;