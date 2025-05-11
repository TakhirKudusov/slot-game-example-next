'use client';

import React, { FC, PropsWithChildren, memo } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

/**
 * Провайдер уведомлений Toastify
 * @param children
 * @constructor
 */
const ToastifyProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2_500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default memo(ToastifyProvider);
