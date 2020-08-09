import * as React from "react";
import * as moment from "moment";

import { Alert, Icon, Tag } from "antd";
import {
  DataSource,
  ResourceCollection,
  SortInfoOrder,
  useResourceCollection,
} from "webpanel-data";
import NoticeIcon, { INoticeIconProps } from "ant-design-pro/lib/NoticeIcon";

import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import Ellipsis from "ant-design-pro/lib/Ellipsis";
import { INoticeIconData } from "ant-design-pro/lib/NoticeIcon/NoticeIconTab";

export type INotificationData = INoticeIconData & {
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
            <Icon type="notification" />
          </Tag>
        ) : undefined,
      }));
  };

  const onItemClick = (
    collection: ResourceCollection<any>,
    reload: any
  ) => async (item: INotificationData, tabProps: INoticeIconProps) => {
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
    ],
    dataSource: api,
    pollInterval: 10000,
  });

  const { data, loading, error, reload } = collection;
  if (error) {
    return (
      <Alert
        message={
          <Ellipsis length={50} tooltip={true}>
            {error.message}
          </Ellipsis>
        }
        type="error"
      />
    );
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
            list={notifications}
            count={notifications.filter((x: any) => !x.seen).length}
            skeletonProps={{}}
            title={tab.title}
            showClear={false}
          />
        );
      })}
    </NoticeIcon>
  );
};
