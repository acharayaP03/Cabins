import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 3.6rem;
    width: auto;
`;

const P = styled.p`
    font-size: 2.2rem;
    font-weight: 500;
    color: var(--color-grey-600);
`;

function Logo() {
    const { isDarkMode } = useDarkMode();

    const srcDependingOnModeToggle = isDarkMode ? "/cabin.png" : "/cabin.png";
    return (
        <StyledLogo>
            <Img src={srcDependingOnModeToggle} alt="Logo" />
            <P>The Cabin</P>
        </StyledLogo>
    );
}

export default Logo;
