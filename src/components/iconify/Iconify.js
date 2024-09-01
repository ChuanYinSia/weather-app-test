import PropTypes from "prop-types";
import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon, width = 25, ...other }, ref) => <Icon ref={ref} icon={icon} width={width} height={width} {...other} />);

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Iconify;
