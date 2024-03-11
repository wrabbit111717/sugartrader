import { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
require('dayjs/locale/ja');
import updateLocale from 'dayjs/plugin/updateLocale';
import { useHotkeys } from 'react-hotkeys-hook';
import HomeContext from '@state/index.context';


// * import css
import '../styles/globals.css';
import 'react-responsive-modal/styles.css';
import {
  MantineProvider,
  ColorSchemeProvider,
  MantineThemeOverride,
  Flex,
} from "@mantine/core";
import MainLayout from '@component/layout/MainLayout';
import { initialState, HomeInitialState } from '@state/index.state';
import { useCreateReducer } from '@hooks/useCreateReducer';
import axiosConfig from '@util/axiosConfig';
import { Notifications } from '@mantine/notifications';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5000,
    },
  },
});


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  // * react-toastify css style
  useEffect(() => {
    injectStyle();
    dayjs.locale('ja');
    dayjs.extend(timezone);
    dayjs.extend(updateLocale);
  }, []);
  // * prevent default shortcut key behavior
  useHotkeys(['alt+f'], (event: any) => {
    event.preventDefault();
  });


  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('task3_token');
    const currentRoute = router.asPath;

    // if (
    //   (!savedToken || savedToken == '' || savedToken == 'null') &&
    //   !currentRoute.includes(SIGNIN_URL) &&
    //   !currentRoute.includes(RESET_PASSWORD_URL)
    // ) {
    //   router.push(SIGNIN_URL);
    // }

  }, [router]);


  const myTheme: MantineThemeOverride = {
    colorScheme: "light",
    spacing: {
    },
  };
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContext.Provider
        value={{
          ...contextValue,
        }}>
        <ColorSchemeProvider
          colorScheme={"light"}
          toggleColorScheme={() => { }}
        >
          <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            <Notifications />
          </MantineProvider>
        </ColorSchemeProvider>
        <ToastContainer
          style={{
            zIndex: 10001,
          }}
        />
      </HomeContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;