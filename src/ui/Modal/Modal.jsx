import styled, { css } from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const positions = {
	center: css`
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	`,
	top: css`
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	`,
	bottom: css`
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	`,
};

const getTransformByPosition = (position, isOpen) => {
	switch (position) {
		case 'top':
			return css`
				transform: translate(-50%, ${isOpen ? '0' : '-100%'});
			`;
		case 'bottom':
			return css`
				transform: translate(-50%, ${isOpen ? '0' : '100%'});
			`;
		default: // center
			return css`
				transform: translate(-50%, -50%) ${isOpen ? 'scale(1)' : 'scale(0.95)'};
			`;
	}
};

const StyledModal = styled.div`
	position: fixed;
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.3s;

	${(props) => positions[props.position || 'center']}

	opacity: ${(props) => (props.isOpen ? 1 : 0)};
	visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};

	${(props) => getTransformByPosition(props.position, props.isOpen)}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.3s;

	opacity: ${(props) => (props.isOpen ? 1 : 0)};
	visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState('');
	const close = () => setOpenName('');
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>
	);
}

function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);
	return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, position }) {
	const { openName, close } = useContext(ModalContext);
	const { ref } = useOutsideClick(close);
	const isOpen = name === openName;

	return createPortal(
		<Overlay isOpen={isOpen}>
			<StyledModal ref={ref} position={position} isOpen={isOpen}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body,
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
