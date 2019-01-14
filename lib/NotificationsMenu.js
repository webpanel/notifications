var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { Tag, Icon } from 'antd';
import gql from 'graphql-tag';
import * as moment from 'moment';
import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
var QUERY_NOTIFICATIONS = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query fetchNotifications($principal: String) {\n    notifications(principal: $principal, limit: 50) {\n      id\n      title: message\n      seen\n      principal\n      channel\n      reference\n      referenceID\n      datetime: date\n    }\n  }\n"], ["\n  query fetchNotifications($principal: String) {\n    notifications(principal: $principal, limit: 50) {\n      id\n      title: message\n      seen\n      principal\n      channel\n      reference\n      referenceID\n      datetime: date\n    }\n  }\n"])));
var SEEN_NOTIFICATION = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation seenNotification($id: ID!) {\n    seenNotification(id: $id) {\n      id\n    }\n  }\n"], ["\n  mutation seenNotification($id: ID!) {\n    seenNotification(id: $id) {\n      id\n    }\n  }\n"])));
var NotificationsMenu = /** @class */ (function (_super) {
    __extends(NotificationsMenu, _super);
    function NotificationsMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClear = function (tabName) {
            global.console.log('clear', tabName);
        };
        _this.notificationsForTab = function (notifications, tab) {
            return notifications
                .filter(function (n) { return !tab.channel || tab.channel === n.channel; })
                .map(function (x) { return (__assign({}, x, { datetime: moment(x.datetime).fromNow(), extra: !x.seen ? (React.createElement(Tag, { color: 'green' },
                    React.createElement(Icon, { type: "notification" }))) : (undefined) })); });
        };
        _this.onItemClick = function (history, mutation) { return function (item, tabProps) {
            mutation({ id: item.id });
            if (_this.props.onSelect)
                _this.props.onSelect(item, tabProps);
        }; };
        return _this;
    }
    NotificationsMenu.prototype.render = function () {
        var _this = this;
        var tabs = this.props.tabs || [{ title: 'Notifications' }];
        return (React.createElement(Mutation, { mutation: SEEN_NOTIFICATION, children: function (mutation) { return (React.createElement(Query, { query: QUERY_NOTIFICATIONS, pollInterval: 10000, variables: { principal: _this.props.principal }, children: function (_a) {
                    var loading = _a.loading, error = _a.error, data = _a.data, refetch = _a.refetch;
                    console.log("error fetching notifications " + (error && error.message));
                    return (React.createElement(NoticeIcon, { count: data.notifications &&
                            data.notifications.filter(function (x) { return !x.seen; }).length, loading: loading, onClear: _this.onClear, onItemClick: _this.onItemClick(history, mutation) }, tabs.map(function (tab, i) { return (React.createElement(NoticeIcon.Tab, { key: tab.channel + "_" + i, list: _this.notificationsForTab(data.notifications || [], tab), title: tab.title, showClear: false })); })));
                } })); } }));
    };
    return NotificationsMenu;
}(React.Component));
export { NotificationsMenu };
var templateObject_1, templateObject_2;
//# sourceMappingURL=NotificationsMenu.js.map