import * as React from "react";
import * as moment from "moment";

import { Alert, Tabs, Tag } from "antd";
import {
  DataSource,
  ResourceCollection,
  SortInfoOrder,
  useResourceCollection,
} from "webpanel-data";
import {
  NoticeIcon,
  NoticeIconData,
  NoticeIconTabList,
  NoticeIconTabListProps,
} from "./NoticeIcon";

import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { NotificationOutlined } from "@ant-design/icons";

export type INotificationData = NoticeIconData & {
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

export const NotificationsMenu = (props: INotificationsMenuProps) => {
  const onClear = (tabName: string) => {
    // global.console.log('clear', tabName);
  };

  const notificationsForTab = (
    notifications: INotificationData[],
    tab: INotificationsMenuTab
  ): INotificationData[] => {
    return notifications
      .filter((n) => !tab.channel || tab.channel === n.channel)
      .map((x: any) => ({
        ...x,
        datetime: moment(x.datetime).fromNow(),
        extra: !x.seen ? (
          <Tag color={"green"}>
            <NotificationOutlined />
          </Tag>
        ) : undefined,
      }));
  };

  const { api, tabs, principal, channels, style } = props;
  const _tabs = tabs || [{ title: "Notifications" }];

  const filter: DataSourceArgumentMap = { principal };
  if (channels) {
    filter.channel_in = channels;
  }

  const collection = useResourceCollection({
    name: "Notification",
    initialFilters: filter,
    initialSorting: [{ columnKey: "date", order: SortInfoOrder.descend }],
    fields: [
      "id",
      "title: message",
      "datetime: date",
      "channel",
      "date",
      "principal",
      "reference",
      "referenceID",
      "seen",
      "url",
    ],
    dataSource: api,
    pollInterval: 10000,
  });

  const onItemClick = async (
    item: INotificationData,
    tabProps: INotificationsMenuTab
  ) => {
    if (props.onSelect) props.onSelect(item, tabProps);
    if (!item.seen) {
      const resource = collection.getItem({ id: item.id });
      await resource.patch({ seen: true });
      reload();
    }
  };

  const { data, loading, error, reload } = collection;
  if (error) {
    return <Alert message={error.message} type="error" />;
  }
  return (
    <NoticeIcon
      count={(data && data.filter((x: any) => !x.seen).length) || 0}
      loading={loading}
      onClear={onClear}
      style={style}
    >
      {_tabs.map((tab, i) => {
        const notifications = notificationsForTab(data || [], tab);
        const unseen = notifications.filter((x) => !x.seen).length;
        return (
          <Tabs.TabPane
            key={`${tab.channel}_${i}`}
            tab={`${tab.title}${unseen > 0 ? ` (${unseen})` : ""}`}
          >
            <NoticeIconTabList
              data={notifications}
              onClick={(item) => onItemClick(item as INotificationData, tab)}
            />
          </Tabs.TabPane>
        );
      })}
    </NoticeIcon>
  );
};
