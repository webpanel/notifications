var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Badge, Spin, Tabs } from "antd";
import NoticeList from "./NoticeList";
import { BellOutlined } from "@ant-design/icons";
import HeaderDropdown from "../HeaderDropdown";
import React from "react";
import classNames from "classnames";
import styles from "./index.less";
import useMergeValue from "use-merge-value";
var TabPane = Tabs.TabPane;
var NoticeIcon = function (props) {
    var getNotificationBox = function () {
        var children = props.children, loading = props.loading, onClear = props.onClear, onTabChange = props.onTabChange, onItemClick = props.onItemClick, onViewMore = props.onViewMore, clearText = props.clearText, viewMoreText = props.viewMoreText;
        if (!children) {
            return null;
        }
        var panes = [];
        React.Children.forEach(children, function (child) {
            if (!child) {
                return;
            }
            var _a = child.props, list = _a.list, title = _a.title, count = _a.count, tabKey = _a.tabKey, showClear = _a.showClear, showViewMore = _a.showViewMore;
            var len = list && list.length ? list.length : 0;
            var msgCount = count || count === 0 ? count : len;
            var tabTitle = msgCount > 0 ? title + " (" + msgCount + ")" : title;
            panes.push(React.createElement(TabPane, { tab: tabTitle, key: tabKey },
                React.createElement(NoticeList, __assign({ clearText: clearText, viewMoreText: viewMoreText, data: list, onClear: function () { return onClear && onClear(title, tabKey); }, onClick: function (item) {
                        return onItemClick && onItemClick(item, child.props);
                    }, onViewMore: function (event) {
                        return onViewMore && onViewMore(child.props, event);
                    }, showClear: showClear, showViewMore: showViewMore, title: title }, child.props))));
        });
        return (React.createElement(Spin, { spinning: loading, delay: 300 },
            React.createElement(Tabs, { className: styles.tabs, onChange: onTabChange }, panes)));
    };
    var className = props.className, count = props.count, bell = props.bell;
    var _a = useMergeValue(false, {
        value: props.popupVisible,
        onChange: props.onPopupVisibleChange,
    }), visible = _a[0], setVisible = _a[1];
    var noticeButtonClass = classNames(className, styles.noticeButton);
    var notificationBox = getNotificationBox();
    var NoticeBellIcon = bell || React.createElement(BellOutlined, { className: styles.icon });
    var trigger = (React.createElement("span", { className: classNames(noticeButtonClass, { opened: visible }) },
        React.createElement(Badge, { count: count, style: { boxShadow: "none" }, className: styles.badge }, NoticeBellIcon)));
    if (!notificationBox) {
        return trigger;
    }
    return (React.createElement(HeaderDropdown, { placement: "bottomRight", overlay: notificationBox, overlayClassName: styles.popover, trigger: ["click"], visible: visible, onVisibleChange: setVisible }, trigger));
};
NoticeIcon.defaultProps = {
    emptyImage: "https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg",
};
NoticeIcon.Tab = NoticeList;
export default NoticeIcon;
//# sourceMappingURL=NoticeIcon.js.map