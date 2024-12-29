import React, { Component } from "react";
import { Heading } from "@/ui/Common";
import styled from "styled-components";

const ErrorContainer = styled.div`
    display: block;
    margin: 10rem auto;
    padding: 4rem;
    text-align: center;
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    max-width: 114rem;
`;

const P = styled.p`
    margin-top: 1.6rem;
`;

/**
 * @description ErrorBoundary component is a class component that catches error in the application
 * this is our custom error boundary component that catches error in the application
 * not is use at the moment but can be used in the future and remove react-error-boundary package
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <div>
                        <Heading as="h2">Apologies.</Heading>
                        <P>
                            Something went wrong while processing your request.
                            we are currently working on this issue and will get
                            back as soon as possible
                        </P>
                    </div>
                </ErrorContainer>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
