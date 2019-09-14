import * as React from 'react';
import * as moment from 'moment';

import { Alert, Icon, Tag } from 'antd';
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer
} from 'webpanel-data';
import NoticeIcon, { INoticeIconProps } from 'ant-design-pro/lib/NoticeIcon';

import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { INoticeIconData } from 'ant-design-pro/lib/NoticeIcon/NoticeIconTab';

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
  onSelect: (item: INotificationData, tabProps: INoticeIconProps) => void;
}

export class NotificationsMenu extends React.Component<
  INotificationsMenuProps
> {
  public onClear = (tabName: string) => {
    // global.console.log('clear', tabName);
  };

  private notificationsForTab = (
    notifications: INotificationData[],
    tab: INotificationsMenuTab
  ): INotificationData[] => {
    return notifications
      .filter(n => !tab.channel || tab.channel === n.channel)
      .map((x: any) => ({
        ...x,
        datetime: moment(x.datetime).fromNow(),
        extra: !x.seen ? (
          <Tag color={'green'}>
            <Icon type="notification" />
          </Tag>
        ) : (
          undefined
        )
      }));
  };

  public render() {
    const { api, tabs, principal } = this.props;
    const _tabs = tabs || [{ title: 'Notifications' }];

    return (
      <ResourceCollectionLayer
        name="Notification"
        initialFilters={{ principal }}
        fields={[
          'id',
          'title: message',
          'datetime: date',
          'channel',
          'date',
          'principal',
          'reference',
          'referenceID',
          'seen'
        ]}
        dataSource={api}
        pollInterval={10000}
        render={collection => {
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
              onClear={this.onClear}
              onItemClick={this.onItemClick(collection, reload)}
            >
              {_tabs.map((tab, i) => {
                const notifications = this.notificationsForTab(data || [], tab);
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
        }}
      />
    );
  }

  private onItemClick = (collection: ResourceCollection, reload: any) => async (
    item: INotificationData,
    tabProps: INoticeIconProps
  ) => {
    if (this.props.onSelect) this.props.onSelect(item, tabProps);
    if (!item.seen) {
      const resource = collection.getItem({ id: item.id });
      await resource.patch({ seen: true });
      reload();
    }
  };
}
