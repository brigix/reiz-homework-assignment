import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		borderRadius: string;

		colors: {
			main: string;
			secondary: string;
			selected: string;
			text: string;
			light: string;
			error: string;
		};
	}
}
