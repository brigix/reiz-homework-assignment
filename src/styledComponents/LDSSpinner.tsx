import React from "react";
import styled, { keyframes } from "styled-components";

interface LDSSpinnerChildProps {
	transform: number;
	animationDelay: number;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
	opacity: 1;
  }

  to {
    transform: rotate(360deg);
	opacity: 0
  }
`;


const LDSSpinnerContainer = styled.div`
	color: ${(props) => props.theme.colors.secondary};
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
`;

// transform: rotate(60deg);
// animation - delay: -0.9s;
  
const LDSSpinnerChild = styled.div<LDSSpinnerChildProps>`
	transform: ${(props) => props.transform};
	animation: ${spin}  ${(props) => props.animationDelay} linear infinite;
	animation-delay: ${(props) => props.animationDelay};
	&:after {
		content: " ";
		display: block;
		position: absolute;
		top: 3px;
		left: 37px;
		width: 6px;
		height: 18px;
		border-radius: 20%;
		background: ${(props) => props.theme.colors.secondary};
	}
`;

export const LDSSpinner = () => {
	return (
		<LDSSpinnerContainer>
			<LDSSpinnerChild transform={0} animationDelay={-1.1} />
			<LDSSpinnerChild transform={30} animationDelay={-1} />
			<LDSSpinnerChild transform={60} animationDelay={-0.9} />
			<LDSSpinnerChild transform={90} animationDelay={-0.8} />
			<LDSSpinnerChild transform={120} animationDelay={-0.7} />
			<LDSSpinnerChild transform={150} animationDelay={-0.6} />
			<LDSSpinnerChild transform={180} animationDelay={-0.5} />
			<LDSSpinnerChild transform={210} animationDelay={-0.4} />
			<LDSSpinnerChild transform={240} animationDelay={-0.3} />
			<LDSSpinnerChild transform={270} animationDelay={-0.2} />
			<LDSSpinnerChild transform={300} animationDelay={-0.1} />
			<LDSSpinnerChild transform={330} animationDelay={0} />
		</LDSSpinnerContainer>
	);
};
