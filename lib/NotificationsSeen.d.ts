import * as React from 'react';
interface INotificationsSeenProps {
    channel: string;
    reference?: string;
    referenceID?: string;
}
export declare class NotificationsSeen extends React.Component<INotificationsSeenProps> {
    private mutationSent;
    render(): JSX.Element | null;
    private runMutationIfNeeded;
}
export {};
