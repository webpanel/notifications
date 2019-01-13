import NoticeIcon, { INoticeIconProps } from 'ant-design-pro/lib/NoticeIcon';
import { INoticeIconData } from 'ant-design-pro/lib/NoticeIcon/NoticeIconTab';
import { Tag } from 'antd';
import gql from 'graphql-tag';
import * as moment from 'moment';
import * as React from 'react';
import { Query } from 'react-apollo';

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

export type INotificationData = INoticeIconData & {
  id: string;
  seen: boolean;
  reference?: string;
  referenceID?: string;
};

interface INotificationsMenuProps {
  principal: string;
  onSelect: (item: INotificationData, tabProps: INoticeIconProps) => void;
}

export class NotificationsMenu extends React.Component<
  INotificationsMenuProps
> {
  public onClear = (tabName: string) => {
    global.console.log('clear', tabName);
  };

  public render() {
    return (
      <Query
        query={QUERY_NOTIFICATIONS}
        pollInterval={10000}
        variables={{ principal: this.props.principal }}
        children={({ loading, error, data, refetch }) => {
          if (error) {
            return `${error.message}`;
          }
          return (
            <NoticeIcon
              count={
                data.notifications &&
                data.notifications.filter((x: any) => !x.seen).length
              }
              loading={loading}
              onClear={this.onClear}
              onItemClick={this.onItemClick(history)}
            >
              <NoticeIcon.Tab
                list={
                  data.notifications &&
                  data.notifications.map((x: any) => ({
                    ...x,
                    datetime: moment(x.datetime).fromNow(),
                    extra: !x.seen ? <Tag color={'green'}>!</Tag> : undefined
                  }))
                }
                title="Komentáře"
                showClear={false}
              />
              {/* <NoticeIcon.Tab list={[]} title="Soubory" showClear={false} /> */}
              {/* <NoticeIcon.Tab list={[]} title="Soubory" showClear={false} /> */}
            </NoticeIcon>
          );
        }}
      />
    );
  }

  private onItemClick = (history: any) => (
    item: INotificationData,
    tabProps: INoticeIconProps
  ) => {
    if (this.props.onSelect) this.props.onSelect(item, tabProps);
  };
}
