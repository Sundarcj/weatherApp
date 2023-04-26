const If = ({ truth, children }) => {
	if (truth) return children;
	return null;
};

export default If;
