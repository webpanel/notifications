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
import gql from 'graphql-tag';
import * as moment from 'moment';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { AuthSession } from 'webpanel-auth';
var SEEN_NOTIFICATION = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation seenNotifications(\n    $principal: String!\n    $channel: String\n    $reference: String\n    $date: Time!\n  ) {\n    seenNotifications(\n      principal: $principal\n      channel: $channel\n      reference: $reference\n      date: $date\n    )\n  }\n"], ["\n  mutation seenNotifications(\n    $principal: String!\n    $channel: String\n    $reference: String\n    $date: Time!\n  ) {\n    seenNotifications(\n      principal: $principal\n      channel: $channel\n      reference: $reference\n      date: $date\n    )\n  }\n"])));
var NotificationsSeen = /** @class */ (function (_super) {
    __extends(NotificationsSeen, _super);
    function NotificationsSeen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mutationSent = false;
        _this.runMutationIfNeeded = function (mutation) {
            if (_this.mutationSent) {
                return;
            }
            _this.mutationSent = true;
            var _a = _this.props, channel = _a.channel, reference = _a.reference;
            var date = moment().toISOString();
            mutation({ variables: { channel: channel, reference: reference, date: date } });
        };
        return _this;
    }
    NotificationsSeen.prototype.render = function () {
        var _this = this;
        var payload = AuthSession.current().getTokenPayload();
        var principal = payload && payload.sub;
        if (!principal) {
            return null;
        }
        var _a = this.props, channel = _a.channel, reference = _a.reference, referenceID = _a.referenceID;
        return (React.createElement(Mutation, { mutation: SEEN_NOTIFICATION, variables: { channel: channel, reference: reference, referenceID: referenceID, principal: principal } }, function (mutation) {
            _this.runMutationIfNeeded(mutation);
            return _this.props.children;
        }));
    };
    return NotificationsSeen;
}(React.Component));
export { NotificationsSeen };
var templateObject_1;
//# sourceMappingURL=NotificationsSeen.js.map