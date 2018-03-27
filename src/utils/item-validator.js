import { TYPE_IMAGE } from '../constants/item-types';
import { IMAGE_KEYS } from '../constants/item-structure';

const objectHasKeys = (obj, keys) => {
    const objKeys = Object.keys(obj);

    return keys.every(key => objKeys.indexOf(key) > -1);
};

export const validateItem = item => {
    if (typeof item !== 'object') return false;

    switch (item.type) {
        case TYPE_IMAGE:
            return objectHasKeys(item, IMAGE_KEYS);
    }

    return false;
};

export const validateItems = items => {
    if (!items || items.length === 0) return false;

    return items.every(item => validateItem(item));
};