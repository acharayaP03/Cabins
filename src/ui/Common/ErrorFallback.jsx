import styled from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import { Button } from "../Buttons";
const StyledErrorFallback = styled.main`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4.8rem;
`;

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: 4.8rem;
    flex: 0 1 96rem;
    text-align: center;

    & h1 {
        margin-bottom: 1.6rem;
    }

    & p {
        font-family: "Sono";
        margin-bottom: 3.2rem;
        color: var(--color-grey-500);
    }
`;

/**
 * @props error and resetErrorBoundary
 * @description error is a any error that is thrown in the application with in component
 * @description resetErrorBoundary is a function that resets the error boundary,
 * it is a reset function that is called when the user clicks the "Try again" button on ErrorBoundry component on main.js
 *
 * @note this only catches error when the react is rendering the component.
 * @param {*} param0
 * @returns
 */
export default function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <>
            <GlobalStyles />
            <StyledErrorFallback>
                <Box>
                    <h1>Something went wrong</h1>
                    <p>{error.message}</p>
                    <Button size="large" onClick={resetErrorBoundary}>
                        Try again
                    </Button>
                </Box>
            </StyledErrorFallback>
        </>
    );
}
