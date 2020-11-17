import * as React from "react";
import { DataSource } from "webpanel-data";
import { NoticeIconData } from "./NoticeIcon";
export declare type INotificationData = NoticeIconData & {
    id: string;
    seen: boolean;
    channel: string;
    reference?: string;
    referenceID?: string;
    url?: string;
};
interface INotificationsMenuTab {
    channel?: string;
    title: string;
}
interface INotificationsMenuProps {
    api: DataSource;
    principal: string;
    tabs?: INotificationsMenuTab[];
    channels?: string[];
    onSelect: (item: INotificationData, tabProps: INotificationsMenuTab) => void;
    style?: React.CSSProperties;
}
export declare const NotificationsMenu: (props: INotificationsMenuProps) => JSX.Element;
export {};
