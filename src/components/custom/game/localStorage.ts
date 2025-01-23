export const saveState = (state: any) => {
	localStorage.setItem('gameState', JSON.stringify(state));
};

export const loadState = () => {
	const savedState = localStorage.getItem('gameState');
	return savedState ? JSON.parse(savedState) : null;
};
