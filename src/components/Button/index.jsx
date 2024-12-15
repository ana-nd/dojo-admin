import PropTypes from "prop-types";
import "./styles.css"; // Import the CSS for styling

const Button = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon = null,
  children,
  onClick,
  type = "button",
  fullWidth = false,
}) => {
  const classNames = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    disabled ? "btn-disabled" : "",
    loading ? "btn-loading" : "",
    fullWidth ? "btn-full" : "",
  ].join(" ");

  return (
    <button
      type={type}
      className={classNames}
      onClick={!disabled && !loading ? onClick : null}
      disabled={disabled || loading}
    >
      {loading && <span className="btn-loader"></span>}
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "link",
    "outline",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  variant: "primary",
  size: "medium",
  disabled: false,
  loading: false,
  icon: null,
  onClick: () => {},
  type: "button",
};

export default Button;
