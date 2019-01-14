import gql from 'graphql-tag';
import * as moment from 'moment';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { AuthSession } from 'webpanel-auth';

const SEEN_NOTIFICATION = gql`
  mutation seenNotifications(
    $principal: String!
    $channel: String
    $reference: String
    $date: Time!
  ) {
    seenNotifications(
      principal: $principal
      channel: $channel
      reference: $reference
      date: $date
    )
  }
`;

interface INotificationsSeenProps {
  channel: string;
  reference?: string;
  referenceID?: string;
}

export class NotificationsSeen extends React.Component<
  INotificationsSeenProps
> {
  private mutationSent = false;

  public render() {
    const payload = AuthSession.current().getTokenPayload();
    const principal = payload && payload.sub;
    if (!principal) {
      return null;
    }

    const { channel, reference, referenceID } = this.props;
    return (
      <Mutation
        mutation={SEEN_NOTIFICATION}
        variables={{ channel, reference, referenceID, principal }}
      >
        {mutation => {
          this.runMutationIfNeeded(mutation);
          return this.props.children;
        }}
      </Mutation>
    );
  }

  private runMutationIfNeeded = (mutation: any) => {
    if (this.mutationSent) {
      return;
    }
    this.mutationSent = true;

    const { channel, reference } = this.props;
    const date = moment().toISOString();
    mutation({ channel, reference, date });
  };
}
