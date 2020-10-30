import { NoticeIconData } from "./NoticeIcon";
import React from "react";
export interface NoticeIconTabProps {
    count?: number;
    name?: string;
    showClear?: boolean;
    showViewMore?: boolean;
    style?: React.CSSProperties;
    title: string;
    tabKey: string;
    data?: NoticeIconData[];
    onClick?: (item: NoticeIconData) => void;
    onClear?: () => void;
    emptyText?: string;
    clearText?: string;
    viewMoreText?: string;
    list: NoticeIconData[];
    onViewMore?: (e: any) => void;
}
declare const NoticeList: React.SFC<NoticeIconTabProps>;
export default NoticeList;
