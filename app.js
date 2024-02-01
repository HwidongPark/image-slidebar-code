
document.addEventListener('DOMContentLoaded', function() {

    const imageList = document.querySelector('.slider-wrapper .image-list')
    const slideButtons = document.querySelectorAll('.slider-wrapper .slide-button');
    const sliderScrollbar = document.querySelector('.container .slider-scrollbar')
    const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb')
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener('mousedown', (e) => {

        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // 마우스 떼면 멈추도록 함
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });

    slideButtons.forEach(button => {
        
        // 슬라이드 버튼 누르면 이미지 슬라이드 시킴
        button.addEventListener('click', () => {
            const direction = button.id === 'prev-slide' ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount, behavior: "smooth"});
        })

    });

    const handleSlideButtons = () => {

        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";   // 우측 스크롤 시 display: block으로 변경
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";   // 우측 스크롤 시 display: block으로 변경

    }

    // 스크롤에 따른 scrollbar thumb위치 업데이트
    const updateScrollPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener('scroll', () => {
        handleSlideButtons();
        updateScrollPosition();
    })


});