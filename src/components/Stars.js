
const Stars = ({stars_count = 0, no_text = false}) =>
{
	const renderStars = ()=>
	{
		const stars = [];

		for(let c = 0; c < Math.floor(stars_count); c++)
		{
			stars.push(<span key={c} className="material-icons align-middle">star</span>);
		}

		if (Number.isInteger(stars_count) === false) 
		{
	    		
	    		stars.push(<span  key={stars.length} className="material-icons align-middle">star_half</span>);
	 	}

	 	const left = 5 - stars.length;
	 	for(let c=0;c < left; c++)
	 	{
	 		stars.push(<span key={5-c} className="material-icons align-middle">star_outline</span>);
	 	}

		return stars;
	}

	return (<p> {no_text === false && <span>Average stars: <strong>{stars_count}</strong></span>}  {renderStars()} </p>);
}


export default Stars;