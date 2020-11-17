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
import { Badge, List, Popover, Tabs } from "antd";
import { BellOutlined } from "@ant-design/icons";
import React from "react";
export var NoticeIconTabList = function (props) {
    var data = props.data, onClick = props.onClick;
    return (React.createElement(List, { style: { height: 400, overflowY: "scroll" }, size: "small", dataSource: data, renderItem: function (item) { return (React.createElement(List.Item, { actions: [item.extra], onClick: function () { return onClick && onClick(item); }, style: { cursor: "pointer" } },
            React.createElement(List.Item.Meta, { title: item.title, description: item.datetime }))); } }));
};
export var NoticeIcon = function (props) {
    var count = props.count, children = props.children, style = props.style;
    return (React.createElement("span", { style: __assign(__assign({}, style), { cursor: "pointer" }) },
        React.createElement(Popover, { content: React.createElement(Tabs, { centered: true, style: { margin: -16 }, tabBarStyle: { margin: 0 } }, children), overlayStyle: { width: 350 }, placement: "bottomRight", trigger: "click" },
            React.createElement(Badge, { count: count, size: "small" },
                React.createElement(BellOutlined, null)))));
};
//# sourceMappingURL=index.js.map