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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import * as moment from "moment";
import { Alert, Tabs, Tag } from "antd";
import { SortInfoOrder, useResourceCollection, } from "webpanel-data";
import { NoticeIcon, NoticeIconTabList, } from "./NoticeIcon";
import { NotificationOutlined } from "@ant-design/icons";
export var NotificationsMenu = function (props) {
    var onClear = function (tabName) {
        // global.console.log('clear', tabName);
    };
    var notificationsForTab = function (notifications, tab) {
        return notifications
            .filter(function (n) { return !tab.channel || tab.channel === n.channel; })
            .map(function (x) { return (__assign(__assign({}, x), { datetime: moment(x.datetime).fromNow(), extra: !x.seen ? (React.createElement(Tag, { color: "green" },
                React.createElement(NotificationOutlined, null))) : undefined })); });
    };
    var api = props.api, tabs = props.tabs, principal = props.principal, channels = props.channels, style = props.style;
    var _tabs = tabs || [{ title: "Notifications" }];
    var filter = { principal: principal };
    if (channels) {
        filter.channel_in = channels;
    }
    var collection = useResourceCollection({
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
            "url",
        ],
        dataSource: api,
        pollInterval: 10000,
    });
    var onItemClick = function (item, tabProps) { return __awaiter(void 0, void 0, void 0, function () {
        var resource;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (props.onSelect)
                        props.onSelect(item, tabProps);
                    if (!!item.seen) return [3 /*break*/, 2];
                    resource = collection.getItem({ id: item.id });
                    return [4 /*yield*/, resource.patch({ seen: true })];
                case 1:
                    _a.sent();
                    reload();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var data = collection.data, loading = collection.loading, error = collection.error, reload = collection.reload;
    if (error) {
        return React.createElement(Alert, { message: error.message, type: "error" });
    }
    return (React.createElement(NoticeIcon, { count: (data && data.filter(function (x) { return !x.seen; }).length) || 0, loading: loading, onClear: onClear, style: style }, _tabs.map(function (tab, i) {
        var notifications = notificationsForTab(data || [], tab);
        var unseen = notifications.filter(function (x) { return !x.seen; }).length;
        return (React.createElement(Tabs.TabPane, { key: tab.channel + "_" + i, tab: "" + tab.title + (unseen > 0 ? " (" + unseen + ")" : "") },
            React.createElement(NoticeIconTabList, { data: notifications, onClick: function (item) { return onItemClick(item, tab); } })));
    })));
};
//# sourceMappingURL=NotificationsMenu.js.map