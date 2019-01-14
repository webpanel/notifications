import NoticeIcon, { INoticeIconProps } from 'ant-design-pro/lib/NoticeIcon';
import { INoticeIconData } from 'ant-design-pro/lib/NoticeIcon/NoticeIconTab';
import { Tag, Icon } from 'antd';
import gql from 'graphql-tag';
import * as moment from 'moment';
import * as React from 'react';
import { Query, Mutation } from 'react-apollo';

const QUERY_NOTIFICATIONS = gql`
  query fetchNotifications($principal: String) {
    notifications(principal: $principal, limit: 50) {
      id
      title: message
      seen
      principal
      channel
      reference
      referenceID
      datetime: date
    }
  }
`;

const SEEN_NOTIFICATION = gql`
  mutation seenNotification($id: ID!) {
    seenNotification(id: $id) {
      id
    }
  }
`;

export type INotificationData = INoticeIconData & {
  id: string;
  seen: boolean;
  channel?: string;
  reference?: string;
  referenceID?: string;
};

interface INotificationsMenuTab {
  channel?: string;
  title: string;
}
interface INotificationsMenuProps {
  principal: string;
  tabs?: INotificationsMenuTab[];
  onSelect: (item: INotificationData, tabProps: INoticeIconProps) => void;
}

export class NotificationsMenu extends React.Component<
  INotificationsMenuProps
> {
  public onClear = (tabName: string) => {
    global.console.log('clear', tabName);
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
    const tabs = this.props.tabs || [{ title: 'Notifications' }];

    return (
      <Mutation
        mutation={SEEN_NOTIFICATION}
        children={mutation => (
          <Query
            query={QUERY_NOTIFICATIONS}
            pollInterval={10000}
            variables={{ principal: this.props.principal }}
            children={({ loading, error, data, refetch }) => {
              console.log(
                `error fetching notifications ${error && error.message}`
              );
              return (
                <NoticeIcon
                  count={
                    data.notifications &&
                    data.notifications.filter((x: any) => !x.seen).length
                  }
                  loading={loading}
                  onClear={this.onClear}
                  onItemClick={this.onItemClick(history, mutation)}
                >
                  {tabs.map((tab, i) => (
                    <NoticeIcon.Tab
                      key={`${tab.channel}_${i}`}
                      list={this.notificationsForTab(
                        data.notifications || [],
                        tab
                      )}
                      title={tab.title}
                      showClear={false}
                    />
                  ))}
                </NoticeIcon>
              );
            }}
          />
        )}
      />
    );
  }

  private onItemClick = (history: any, mutation: any) => (
    item: INotificationData,
    tabProps: INoticeIconProps
  ) => {
    mutation({ id: item.id });
    if (this.props.onSelect) this.props.onSelect(item, tabProps);
  };
}
