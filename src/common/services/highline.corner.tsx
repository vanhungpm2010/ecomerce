import React from 'react';
import { message, Icon } from 'antd';

export const saveMsg = ({ msg, duration }: any) => {
  const showingMessage = msg || 'Saving successfully.';
  message.info(showingMessage, duration || undefined);
};

export const successMsg = ({ msg, actionUndo }: any) => {
  const timeout = 7;

  const showingMessage = msg || 'Processing successfully.';
  message.success(
    <span>
      {showingMessage}{' '}
      {actionUndo ? (
        <span onClick={() => actionUndo()}>
          Undo
          <Icon type="undo" style={{ color: 'blue' }} />
        </span>
      ) : (
        ''
      )}
    </span>,
    timeout,
  );
};

export const errorMsg = ({ msg }: any) => {
  message.error(msg || 'Something went wrong');
};

export const warningMsg = ({ msg }: { msg: string }) => {
  message.warning(msg || 'warning!!! something can be went wrong!');
};
