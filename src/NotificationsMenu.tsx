import * as React from "react";
import * as moment from "moment";

import { Alert, Button, Tabs, Tag, Tooltip, message } from "antd";
import {
  DataSource,
  Resource,
  SortInfoOrder,
  useResourceCollection,
} from "webpanel-data";
import { EyeInvisibleOutlined, NotificationOutlined } from "@ant-design/icons";
import { NoticeIcon, NoticeIconData, NoticeIconTabList } from "./NoticeIcon";

import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { useTranslation } from "react-i18next";

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

const Tab = (props: {
  tab: INotificationsMenuTab;
  unseen: number;
  clearItems: (channel: string) => Promise<void>;
}) => {
  const { tab, unseen, clearItems } = props;
  const [clearing, setClearing] = React.useState(false);
  const { t } = useTranslation("webpanel-notifications");
  return (
    <>
      {tab.title}{" "}
      {unseen > 0 ? (
        <>
          ({unseen}){" "}
          <Tooltip title={t("markAsRead")}>
            <Button
              icon={<EyeInvisibleOutlined />}
              danger={true}
              size="small"
              type="link"
              loading={clearing}
              onClick={async () => {
                if (tab.channel) {
                  try {
                    setClearing(true);
                    await clearItems(tab.channel);
                  } catch (err) {
                    message.error(err.message);
                  } finally {
                    setClearing(false);
                  }
                }
              }}
            />
          </Tooltip>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export const NotificationsMenu = (props: INotificationsMenuProps) => {
  const [version, setVersion] = React.useState(0);
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
    initialLimit: 150,
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
      await reload();
      setVersion(version + 1);
    }
  };

  const clearItems = async (channel: string) => {
    const batch = new Resource({
      name: "NotificationBatchUpdate",
      dataSource: api,
    });
    await batch.save({ principal, channel, seen: true });
    await reload();
    setVersion(version + 1);
  };

  const { data, loading, error, reload } = collection;
  if (error) {
    return <Alert message={error.message} type="error" />;
  }
  return (
    <NoticeIcon
      count={(data && data.filter((x: any) => !x.seen).length) || 0}
      loading={loading}
      style={style}
    >
      {_tabs.map((tab, i) => {
        const notifications = notificationsForTab(data || [], tab);
        const unseen = notifications.filter((x) => !x.seen).length;
        return (
          <Tabs.TabPane
            key={`${tab.channel}_${i}`}
            tab={<Tab tab={tab} unseen={unseen} clearItems={clearItems} />}
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
