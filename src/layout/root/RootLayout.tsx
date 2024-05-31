import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}

export default RootLayout;
