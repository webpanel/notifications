import * as React from "react";
import * as moment from "moment";

import { Alert, Tag } from "antd";
import {
  DataSource,
  ResourceCollection,
  SortInfoOrder,
  useResourceCollection,
} from "webpanel-data";
import NoticeIcon, { NoticeIconData } from "./NoticeIcon";

import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { NoticeIconTabProps } from "./NoticeIcon/NoticeList";
// import Ellipsis from "ant-design-pro/lib/Ellipsis";
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
  onSelect: (item: INotificationData, tabProps: NoticeIconTabProps) => void;
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

  const onItemClick = (
    collection: ResourceCollection<any>,
    reload: any
  ) => async (item: INotificationData, tabProps: NoticeIconTabProps) => {
    if (props.onSelect) props.onSelect(item, tabProps);
    if (!item.seen) {
      const resource = collection.getItem({ id: item.id });
      await resource.patch({ seen: true });
      reload();
    }
  };

  const { api, tabs, principal, channels } = props;
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

  const { data, loading, error, reload } = collection;
  if (error) {
    return <Alert message={error.message} type="error" />;
  }
  return (
    <NoticeIcon
      count={(data && data.filter((x: any) => !x.seen).length) || 0}
      loading={loading}
      onClear={onClear}
      onItemClick={onItemClick(collection, reload)}
    >
      {_tabs.map((tab, i) => {
        const notifications = notificationsForTab(data || [], tab);
        return (
          <NoticeIcon.Tab
            key={`${tab.channel}_${i}`}
            tabKey={`${i}`}
            list={notifications}
            count={notifications.filter((x: any) => !x.seen).length}
            // skeletonProps={{}}
            title={tab.title}
            showClear={false}
          />
        );
      })}
    </NoticeIcon>
  );
};
