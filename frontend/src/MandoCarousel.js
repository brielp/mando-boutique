import React, { useState, useEffect } from 'react';
import { makeStyles, ImageList, ImageListItem } from '@material-ui/core';

const useStyles = makeStyles(() => {
	return {
		image: {
			maxWidth: 300
		},
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
			overflow: 'hidden',
			backgroundColor: 'white',
			maxWidth: '60%',
			minWidth: 600
		},
		imageList: {
			flexWrap: 'nowrap',
			// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
			transform: 'translateZ(0)'
		}
	};
});

const MandoCarousel = ({ imgs }) => {
	const [ imageState, setImageState ] = useState([]);
	const classes = useStyles();

	useEffect(
		() => {
			setImageState(img => imgs);
		},
		[ imgs ]
	);
	let items;
	imageState
		? (items = imageState.map((img, idx) => {
				return {
					img: img,
					title: 'mandolin' + idx
				};
			}))
		: (items = []);

	return (
		<div className={classes.root}>
			{items.length !== 1 ? (
				<ImageList className={classes.imageList} cols={2.5} rowHeight={500}>
					{items.map(item => (
						<ImageListItem key={item.img}>
							<img src={item.img} alt={item.title} />
						</ImageListItem>
					))}
				</ImageList>
			) : (
				<img className={classes.image} src={items[0].img} alt={items[0].title} />
			)}
		</div>
	);
};

export default MandoCarousel;
