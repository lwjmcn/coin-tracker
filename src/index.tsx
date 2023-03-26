//설치
//typescript styled-components react-router-dom react-query
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <link type='text/css' media='screen' rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap'/>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);