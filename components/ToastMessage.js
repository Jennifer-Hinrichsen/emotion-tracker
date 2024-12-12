import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%); 
    opacity: 0;
  }
`;

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 60px;
  right: 0px;
  padding: 10px 20px;
  background: linear-gradient(
    to left,
    rgba(92, 184, 92, 0.8),
    rgba(246, 244, 243, 0.8)
  );
  color: #2b532b;
  border-radius: 10px 0 0 10px;
  animation: ${({ visible }) => (visible === "enter" ? slideIn : slideOut)} 0.3s
    ease forwards;
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

export default function ToastMessage({ message, visible }) {
  if (!visible) return null;
  return <ToastWrapper visible={visible}>{message}</ToastWrapper>;
}
