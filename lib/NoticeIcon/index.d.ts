import React from "react";
export interface NoticeIconData {
    title?: React.ReactNode;
    description?: React.ReactNode;
    datetime?: React.ReactNode;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    key?: string | number;
    read?: boolean;
}
export interface NoticeIconProps {
    children?: React.ReactNode;
    count?: number;
    loading?: boolean;
    onClear?: (tabName: string, tabKey: string) => void;
    onItemClick?: (item: NoticeIconData, tabProps: NoticeIconTabListProps) => void;
    style?: React.CSSProperties;
}
export interface NoticeIconTabListProps {
    data?: NoticeIconData[];
    onClick?: (item: NoticeIconData) => void;
}
export declare const NoticeIconTabList: (props: NoticeIconTabListProps) => JSX.Element;
export declare const NoticeIcon: (props: NoticeIconProps) => JSX.Element;
