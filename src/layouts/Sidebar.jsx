import styled from "styled-components";

import { Logo } from "@/ui/Common";
import { MainNav } from "@/ui/ActionControls";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 2.4rem;
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);

    grid-row: 1 / -1;

    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

export default function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
            {/* <Uploader /> */}
        </StyledSidebar>
    );
}
