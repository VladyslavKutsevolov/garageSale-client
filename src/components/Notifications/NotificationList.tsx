import React, { FC } from 'react';
import { Typography } from '@material-ui/core/';
import { DateTime } from 'luxon';
import { useStateData } from '../../context/appContext';

interface ILatestcomments {
  username: string;
  title: string;
  created_at: string;
  comment: string;
}

const NotificationList: FC = () => {
  const { state } = useStateData();
  const latestComments: ILatestcomments[] = state.latestComments;

  return (
    <>
      {state.latestComments && state.latestComments.length ? (
        <Typography variant="h4">Latest activity on your sales:</Typography>
      ) : null}
      {state.latestComments && state.latestComments.length ? (
        latestComments.map(comment => (
          <Typography variant="h6">
            {`${comment.username} commented on ${
              comment.title
            } on ${DateTime.fromISO(comment.created_at).toFormat('ff')}: `}
            <Typography variant="h6">{`${comment.comment}`}</Typography>
          </Typography>
        ))
      ) : (
        <Typography variant="h6">No new notifications</Typography>
      )}
    </>
  );
};

export default NotificationList;
