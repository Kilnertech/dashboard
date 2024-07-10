import MDSnackbar from "components/MDSnackbar";

const Notification = ({ open, onClose, type, title, message, onConfirm }) => {
  let color, icon;

  // Determina il colore e l'icona in base al tipo di notifica
  switch (type) {
    case "success":
      color = "success";
      icon = "check";
      break;
    case "error":
      color = "error";
      icon = "warning";
      break;
    case "warning":
      color = "warning";
      icon = "warning";
      break;
    default:
      color = "info";
      icon = "notifications";
      break;
  }

  return (
    <MDSnackbar
      color={color}
      icon={icon}
      title={title}
      content={message}
      open={open}
      onClose={onClose}
      close={onClose}
      action={
        type === "warning" ? (
          <button onClick={onConfirm} style={{ color: "white", backgroundColor: "#f50057", borderRadius: "4px", padding: "6px 16px", border: "none" }}>
            Confirm
          </button>
        ) : null
      }
      bgWhite={color === "success" || color === "error" || color === "warning"} // Scegli il background bianco per successo/errore/avviso
    />
  );
};

export default Notification;
