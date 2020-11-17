import { Badge, List, Popover, Tabs } from "antd";

import { BellOutlined } from "@ant-design/icons";
import React from "react";

export interface NoticeIconData {
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  key?: string | number;
  read?: boolean;
}

export interface NoticeIconProps {
  children?: React.ReactNode;
  count?: number;
  loading?: boolean;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (
    item: NoticeIconData,
    tabProps: NoticeIconTabListProps
  ) => void;
  // onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  // onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  // onPopupVisibleChange?: (visible: boolean) => void;
  // popupVisible?: boolean;
  // clearText?: string;
  // viewMoreText?: string;
  // clearClose?: boolean;
  // emptyImage?: string;
  // children: React.ReactElement<NoticeIconTabProps>[];
}
export interface NoticeIconTabListProps {
  // count?: number;
  // name?: string;
  // showClear?: boolean;
  // showViewMore?: boolean;
  // style?: React.CSSProperties;
  // tab: string;
  // tabKey: string;
  data?: NoticeIconData[];
  onClick?: (item: NoticeIconData) => void;
  // onClear?: () => void;
  // emptyText?: string;
  // clearText?: string;
  // viewMoreText?: string;
  // onViewMore?: (e: any) => void;
}

export const NoticeIconTabList = (props: NoticeIconTabListProps) => {
  const { data, onClick } = props;
  return (
    <List
      style={{ height: 400, overflowY: "scroll" }}
      size="small"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[item.extra]}
          onClick={() => onClick && onClick(item)}
          style={{ cursor: "pointer" }}
        >
          <List.Item.Meta title={item.title} description={item.datetime} />
        </List.Item>
      )}
    />
  );
};

export const NoticeIcon = (props: NoticeIconProps) => {
  const { count, children, style } = props;
  return (
    <span style={{ ...style, cursor: "pointer" }}>
      <Popover
        content={
          <Tabs
            centered={true}
            style={{ margin: -16 }}
            tabBarStyle={{ margin: 0 }}
          >
            {children}
          </Tabs>
        }
        overlayStyle={{ width: 350 }}
        placement="bottomRight"
        trigger="click"
      >
        <Badge count={count} size="small">
          <BellOutlined />
        </Badge>
      </Popover>
    </span>
  );
};
