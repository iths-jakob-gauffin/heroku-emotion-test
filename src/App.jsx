import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const myGreen = 'tomato';

const App = () => {
	return (
		<div>
			<article
				css={css`
					background: ${myGreen};
					width: 10rem;
					height: 10rem;
					color: blue;
				`}>
				naskjd
			</article>
		</div>
	);
};

export default App;
