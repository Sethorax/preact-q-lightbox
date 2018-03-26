import createStore from 'unistore';

const initialState = {
    items: [],
    currentItem:0,
    isVisible: false,
    isLoading: false,
    isTransitioning: false
};

export const store = createStore(initialState);