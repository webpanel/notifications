import { DropDownProps } from "antd/es/dropdown";
import React from "react";
declare type OverlayFunc = () => React.ReactNode;
export interface HeaderDropdownProps extends Omit<DropDownProps, "overlay"> {
    overlayClassName?: string;
    overlay: React.ReactNode | OverlayFunc | any;
    placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topCenter" | "topRight" | "bottomCenter";
}
declare const HeaderDropdown: React.FC<HeaderDropdownProps>;
export default HeaderDropdown;
