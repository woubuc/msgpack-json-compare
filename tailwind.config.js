const colors = require('tailwindcss/colors');

module.exports = {
	theme: {
		colors: {
			...colors,
			gray: colors.warmGray,
		},
		fontFamily: {
			body: `'Open Sans', sans-serif`,
			mono: `'Cousine', monospace`,
		},
		extend: {},
	},
};
