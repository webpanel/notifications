/// <reference types="react" />
import { DataSource } from "webpanel-data";
import { INoticeIconProps } from "ant-design-pro/lib/NoticeIcon";
import { INoticeIconData } from "ant-design-pro/lib/NoticeIcon/NoticeIconTab";
export declare type INotificationData = INoticeIconData & {
    id: string;
    seen: boolean;
    channel: string;
    reference?: string;
    referenceID?: string;
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
    onSelect: (item: INotificationData, tabProps: INoticeIconProps) => void;
}
export declare const NotificationsMenu: (props: INotificationsMenuProps) => JSX.Element;
export {};
