import { useState } from "react";
import styled from "styled-components";

export default function useModal(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  const Modal = ({ children }) =>
    isOpen && (
      <ModalWrapper>
        <Backdrop onClick={() => setIsOpen(false)} />
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    );

  return [Modal, setIsOpen];
}

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: #0007;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #ddd;
  color: #333;
`;

export function ExampleUsage() {
  const [Modal1, setModal1] = useModal();
  const [Modal2, setModal2] = useModal(true);

  return (
    <>
      <h1>some content</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut repudiandae
        possimus praesentium quaerat eaque maxime non illum. Dolor dicta sequi
        nihil, maiores labore illum tempora tempore, quas numquam enim earum.
      </p>
      <button onClick={() => setModal1(true)}>open modal 1</button>
      <button onClick={() => setModal2(true)}>open modal 2</button>
      <Modal1>
        <h2>First Modal</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
          beatae consequatur, sit id minus dolore, quasi possimus veritatis
          natus aperiam maiores incidunt deleniti cupiditate repellendus. Earum
          animi non perferendis quas!
        </p>
      </Modal1>
      <Modal2>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </Modal2>
    </>
  );
}
