export default store => ({
    setItems: (state, items) => ({ items }),
    setCurrentItem: (state, currentItem) => ({ currentItem }),
    showLightbox: () => ({ isVisible: true }),
    hideLightbox: () => ({ isVisible: false }),
    setTransitionState: (state, isTransitioning) => ({ isTransitioning }),
    setCanNavigate: (state, canNavigate) => ({ canNavigate }),
    setLoadingState: (state, isLoading) => ({ isLoading })
});