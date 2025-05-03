export const isDarkMode = () => {
	if (window !== undefined) {
		return (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
	}

	return false;
};

export const defaultColor = isDarkMode() ? "#6a7282" : "#3f3f3f";
export const defaultFaceColor = isDarkMode() ? "#99a1af" : "#6b7280";
export const defaultHairColor = isDarkMode() ? "#525252" : "#2a2627";
export const defaultBorder = isDarkMode() ? "#99a1af" : "#dfdfdf";
