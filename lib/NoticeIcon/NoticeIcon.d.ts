import NoticeList, { NoticeIconTabProps } from "./NoticeList";
import React from "react";
export interface NoticeIconData {
    avatar?: string | React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    datetime?: React.ReactNode;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    key?: string | number;
    read?: boolean;
}
export interface NoticeIconProps {
    count?: number;
    bell?: React.ReactNode;
    className?: string;
    loading?: boolean;
    onClear?: (tabName: string, tabKey: string) => void;
    onItemClick?: (item: NoticeIconData, tabProps: NoticeIconTabProps) => void;
    onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
    onTabChange?: (tabTile: string) => void;
    style?: React.CSSProperties;
    onPopupVisibleChange?: (visible: boolean) => void;
    popupVisible?: boolean;
    clearText?: string;
    viewMoreText?: string;
    clearClose?: boolean;
    emptyImage?: string;
    children: React.ReactElement<NoticeIconTabProps>[];
}
declare const NoticeIcon: React.FC<NoticeIconProps> & {
    Tab: typeof NoticeList;
};
export default NoticeIcon;
