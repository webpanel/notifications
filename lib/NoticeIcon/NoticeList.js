import { Avatar, List } from "antd";
import React from "react";
var NoticeList = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, onClick = _a.onClick, onClear = _a.onClear, title = _a.title, onViewMore = _a.onViewMore, emptyText = _a.emptyText, _c = _a.showClear, showClear = _c === void 0 ? true : _c, clearText = _a.clearText, viewMoreText = _a.viewMoreText, _d = _a.showViewMore, showViewMore = _d === void 0 ? false : _d;
    if (!data || data.length === 0) {
        return (React.createElement("div", null,
            React.createElement("img", { src: "https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg", alt: "not found" }),
            React.createElement("div", null, emptyText)));
    }
    return (React.createElement("div", null,
        React.createElement(List, { 
            // className={styles.list}
            dataSource: data, renderItem: function (item, i) {
                // const itemCls = classNames(styles.item, {
                //   [styles.read]: item.read,
                // });
                // eslint-disable-next-line no-nested-ternary
                var leftIcon = item.avatar ? (typeof item.avatar === "string" ? (React.createElement(Avatar /*className={styles.avatar}*/, { src: item.avatar })) : (React.createElement("span", null, item.avatar))) : null;
                return (React.createElement(List.Item
                // className={itemCls}
                , { 
                    // className={itemCls}
                    key: item.key || i, onClick: function () { return onClick && onClick(item); } },
                    React.createElement(List.Item.Meta
                    // className={styles.meta}
                    , { 
                        // className={styles.meta}
                        avatar: leftIcon, title: React.createElement("div", null,
                            item.title,
                            React.createElement("div", null, item.extra)), description: React.createElement("div", null,
                            React.createElement("div", null, item.description),
                            React.createElement("div", null, item.datetime)) })));
            } }),
        React.createElement("div", null,
            showClear ? (React.createElement("div", { onClick: onClear },
                clearText,
                " ",
                title)) : null,
            showViewMore ? (React.createElement("div", { onClick: function (e) {
                    if (onViewMore) {
                        onViewMore(e);
                    }
                } }, viewMoreText)) : null)));
};
export default NoticeList;
//# sourceMappingURL=NoticeList.js.map