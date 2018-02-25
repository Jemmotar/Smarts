/**
 * Represents possible wrapper around react hot reload
 */
export default process.env.NODE_ENV === 'development'
	? require('react-hot-loader').AppContainer
	: ({ children }) => (children);
