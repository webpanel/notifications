import { INoticeIconProps } from 'ant-design-pro/lib/NoticeIcon';
import { INoticeIconData } from 'ant-design-pro/lib/NoticeIcon/NoticeIconTab';
import * as React from 'react';
declare type INotificationData = INoticeIconData & {
    id: string;
    seen: boolean;
    reference?: string;
    referenceID?: string;
};
interface INotificationsMenuProps {
    principal: string;
    onSelect: (item: INotificationData, tabProps: INoticeIconProps) => void;
}
export declare class NotificationsMenu extends React.Component<INotificationsMenuProps> {
    onClear: (tabName: string) => void;
    render(): JSX.Element;
    private onItemClick;
}
export {};
