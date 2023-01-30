import styled from "styled-components";

interface ToggleProps {
	readonly isSelected: boolean;
}

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2rem;
`;

export const ErrorContainer = styled(PageContainer)`
	height: 85vh;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 95vw;
`;

export const NavBar = styled(Container)`
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
	margin: 0rem;
	width: 95vw;
`;
export const LeftSide = styled(NavBar)`
	margin-right: auto;
`;
export const RightSide = styled(NavBar)`
	margin-left: auto;
	justify-content: right;
`;

export const CountryCard = styled.div`
	display: flex;
	flex-direction: row;
	color: ${(props) => props.theme.colors.text};
	background-color: ${(props) => props.theme.colors.main};
	margin-bottom: 0.4rem;
	padding: 0.5rem 1rem;
	border-radius: 0.2rem;
	text-align: left;
`;

export const Header = styled.h2`
	text-size: 4rem;
	color: ${(props) => props.theme.colors.light};
	background-color: ${(props) => props.theme.colors.secondary};
	padding: 0.5rem;
	width: 100vw;
	margin: 0;
`;

export const StyledSpan = styled.span`
	display: flex;
	flex-direction: column;
	text-size: 1.5rem;
	margin: 0;
`;

export const Field = styled.span`
    margin-right:2rem;
`

export const CountryName = styled.h4`
	text-alignment: left;
	justify-items: flex-start;
	text-size: 2rem;
	margin: 0;
	//margin-left: auto;
`;

export const CountryDetails = styled.p`
	text-size: 1.5rem;
	margin: 0;
	//margin-left: auto;
`;

export const Button = styled.button`
	color: ${(props) => props.theme.colors.text};
    background-color ${(props) => props.theme.colors.secondary};
	font-size: 1em;
    font-weight: 500;
	padding: 0.25em 1em;
	border-radius: 0.2rem;
    border: 0.15rem solid ${(props) => props.theme.colors.secondary};

    &:hover {
		background-color: ${(props) => props.theme.colors.light};
        border: 0.15rem solid ${(props) => props.theme.colors.secondary};
        cursor: pointer;
	}
`;

export const ToggleButton = styled(Button)<ToggleProps>`
	background-color: ${(props) =>
		props.isSelected
			? props.theme.colors.selected
			: props.theme.colors.secondary};
	color: ${(props) =>
		props.isSelected ? props.theme.colors.light : props.theme.colors.text};
	border-color: ${(props) =>
		props.isSelected
			? props.theme.colors.selected
			: props.theme.colors.secondary};

	&:hover {
		background-color: ${(props) =>
			props.isSelected
				? props.theme.colors.selected
				: props.theme.colors.light};
		color: ${(props) =>
			props.isSelected ? props.theme.colors.light : props.theme.colors.text};
		border-color: ${(props) =>
			props.isSelected
				? props.theme.colors.selected
				: props.theme.colors.secondary};
	}
`;

export const LeftToggleButton = styled(ToggleButton)`
	margin-left: 1rem;
	border-radius: 0rem 0rem 0rem 1rem;
`;
export const RightToggleButton = styled(ToggleButton)`
	border-radius: 0rem 1rem 0rem 0rem;
`;

export const StyledSort = styled.div`
	background-color: ${(props) => props.theme.colors.light};
	font-size: 1em;
	font-weight: 500;
	padding-left: 1rem;
	border-radius: 0.2rem 1rem 0rem 0.2rem;
	outline: 0.15rem solid ${(props) => props.theme.colors.secondary};
`;

export const Arrow = styled.i`
	border: solid ${(props) => props.theme.colors.light};
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 3px;
`;

export const ArrowUp = styled(Arrow)`
	transform: rotate(-135deg);
	-webkit-transform: rotate(-135deg);
`;
export const ArrowDown = styled(Arrow)`
	transform: rotate(-45deg);
	-webkit-transform: rotate(45deg);
`;

export const PageNumber = styled(ToggleButton)<ToggleProps>`
	width: 1.8rem;
	height: 1.8rem;
	border-radius: 5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.1rem;
	padding: 0.4rem;
`;

export const Paginator = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
`;

export const SelectContainer = styled.div`
	display: inline-block;
	position: relative;
`;

export const StyledSelect = styled.select`
	background-color: ${(props) => props.theme.colors.light};
	font-size: 1em;
	font-weight: 500;
	margin: 1em;
	padding: 0.25em 1em;
	border-radius: 0.2rem;
	border: 0.15rem solid ${(props) => props.theme.colors.secondary};
	appearance: none;

	&:hover {
		border: 0.15rem solid ${(props) => props.theme.colors.secondary};
		cursor: pointer;
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 0.1.5rem ${(props) => props.theme.colors.secondary};
	}

	&::after {
		content: "";
		width: 0.8em;
		height: 0.5em;
		background-color: ${(props) => props.theme.colors.secondary};
		clip-path: polygon(100% 0%, 0 0%, 50% 100%); 
		justify-self: end;
	}
`;

export const Label = styled.label`
	display: block;
	font-size: 14px;
	margin-bottom: 8px;
	transform: translateY(-1.5em) scale(1) translateX(0);
	transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	pointer-events: none;
	color: rgba(0, 0, 0, 0.54);

	${StyledSelect}:focus + &,
    ${StyledSelect}:not([value="All countries"]) + & {
		transform: translateY(0) scale(0.75) translateX(0);
	}
`;

export const ErrorMessage = styled.div`
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.colors.error};
	font-size: 2rem;
	font-weight: 700;
	border: 0.2rem solid;
	height: fit-content;
	width: fit-content;
	padding: 1rem 4rem;
`;

export const Spinner = styled.div``;
