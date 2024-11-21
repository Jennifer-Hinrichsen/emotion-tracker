import ToastMessage from "./ToastMessage";

const ToastMessageContainer = ({ messages }) => (
  <div>
    {messages.map((message) => (
      <ToastMessage
        key={message.id}
        message={message.text}
        visible={message.visible}
      />
    ))}
  </div>
);

export default ToastMessageContainer;
