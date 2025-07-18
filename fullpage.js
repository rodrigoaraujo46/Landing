document.addEventListener('DOMContentLoaded', () => {
    new fullpage('#fullpage', {
        menu: '#menu',
        anchors: ['intro', 'career', 'projects'],
        navigation: true,
        navigationTooltips: ['Intro', 'Career', 'Projects'],
        scrollingSpeed: '1000',
        fitToSectionDelay: '600',
        easingcss3: 'cubic-bezier(0.85, 0.09, 0.15, 0.91)',
    });
});
