// Rounds 1 - 3 (0 - 2) * 1
export const getRoundMultiplier = (roundIndex: number) => {
	if (roundIndex < 3) return 1;
	return roundIndex - 2;
};
