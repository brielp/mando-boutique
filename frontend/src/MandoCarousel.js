import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';

const MandoCarousel = ({ imgs }) => {
	const [ activeIndex, setActiveIndex ] = useState(0);
	const [ animating, setAnimating ] = useState(false);

	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === imgs.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? imgs.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};

	const goToIndex = newIndex => {
		if (animating) return;
		setActiveIndex(newIndex);
	};

	let slides = [];
	if (imgs) {
		slides = imgs.map(item => {
			return (
				<CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
					<img src={item} />
				</CarouselItem>
			);
		});
	} else {
		return <h1>Hey</h1>;
	}

	return (
		<Carousel activeIndex={activeIndex} next={next} previous={previous}>
			<CarouselIndicators items={imgs} activeIndex={activeIndex} onClickHandler={goToIndex} />
			{slides}
			<CarouselControl key={1} direction="prev" directionText="Previous" onClickHandler={previous} />
			<CarouselControl key={2} direction="next" directionText="Next" onClickHandler={next} />
		</Carousel>
	);
};

export default MandoCarousel;
