import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideClick } from "@/hooks/useOutsideClick";

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: absolute; /* Changed to absolute */
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);
    min-width: 200px;
`;

// const StyledList = styled.ul`
// 	position: fixed;

// 	background-color: var(--color-grey-0);
// 	box-shadow: var(--shadow-md);
// 	border-radius: var(--border-radius-md);

// 	right: ${(props) => props.position.x}px;
// 	top: ${(props) => props.position.y}px;
// `;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

const MenusContext = createContext();
function Menus({ children }) {
    const [openId, setOpenId] = useState("");
    const [position, setPosition] = useState({ x: 0, y: 0 }); // this will help set the position of menu container
    const [parentRef, setParentRef] = useState(null); // this will parent element.

    const close = () => setOpenId("");
    const open = (openId) => setOpenId(openId);
    return (
        <MenusContext.Provider
            value={{
                openId,
                close,
                open,
                position,
                parentRef,
                setPosition,
                setParentRef,
            }}
        >
            {children}
        </MenusContext.Provider>
    );
}

function Toggle({ id }) {
    const { openId, open, close, setPosition, setParentRef } =
        useContext(MenusContext);

    const handleClick = (e) => {
        e.stopPropagation();
        const boundingRect = e.currentTarget.getBoundingClientRect(); // get the position of the toggle button
        setPosition({
            x: window.innerWidth - boundingRect.width - boundingRect.x,
            y: boundingRect.height + boundingRect.y + 8,
        });

        setParentRef(e.currentTarget.parentEelement);
        openId === id ? close() : open(id);
    };
    return (
        <StyledToggle onClick={handleClick}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

function List({ id, children }) {
    const { openId, position, parentRef, close } = useContext(MenusContext);
    const { ref } = useOutsideClick(() => close(), false);

    useEffect(() => {
        if (!parentRef) return;

        const handleScroll = () => {
            const boundingRect = parentRef.getBoundingClientRect();
            ref.current.style.bottom = `${boundingRect.bottom}px`;
            ref.current.style.right = `${boundingRect.x}px`;
        };

        parentRef.addEventListener("scroll", handleScroll);
        window.addEventListener("scroll", handleScroll);

        return () => {
            parentRef.removeEventListener("scroll", handleScroll);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [ref, parentRef]);

    if (openId !== id) return null; // Only render if the menu is open for this specific ID
    return createPortal(
        <StyledList
            ref={ref}
            style={{ top: position.y, right: position.x + 10 }}
        >
            {children}
        </StyledList>,
        document.body,
    );
}

function Button({ children, icon, onClick }) {
    const { close } = useContext(MenusContext);

    function handleClick() {
        onClick?.();
        close();
    }
    return (
        <li>
            <StyledButton onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
