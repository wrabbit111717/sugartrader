import {
    AppShell,
    Box,
    Header,
    Navbar,
    Text,
    NavLink,
    Loader,
    Flex
} from "@mantine/core"
import {
    FC,
    useContext,
    useEffect,
    useState
} from "react";
import { useRouter } from "next/router";
import HomeHeader from "./HomeHeader";
import AdminHeader from "./AdminHeader";
import { ADMIN_URLS, USER_URLS } from "@util/urls";
import Link from "next/link";
import axiosConfig from "@util/axiosConfig";
import HomeContext from "@state/index.context";
import LandingBanner from "./LandingBanner";
import { LANDING_URLS, MAIN_URLS, MOBILE_WIDTH, SCREEN_WIDTH } from "@util/consts";
import Footer from "./Footer";
import { useMediaQuery } from '@mantine/hooks';

interface Props {
    children: JSX.Element
}

const MainLayout: FC<Props> = ({
    children
}) => {
    const [user, setUser] = useState('');
    const [opened, setOpened] = useState(false);
    const [selPath, setSelPath] = useState<string>("");
    const router = useRouter();
    const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
    const isVerifyEmailPage = router.route.includes('/auth/verifyEmail');

    const {
        state: { user_data },
        dispatch: homeDispatch,
    } = useContext(HomeContext);
    interface DecodedToken {
        email: string;
        exp: number;
        iat: number;
        userId: string;
    }
    useEffect(() => {
        const userString = localStorage.getItem('user');
        let loggedUser: DecodedToken | null = null;
    
        if (userString) {
            loggedUser = JSON.parse(userString);
        }
        if(loggedUser)
            setUser(loggedUser.userId);
        console.log(user, 'userr')
    }, [])


    const initialHeader = () => {
        if (router.route.indexOf('/admin/') > -1) {
            return <AdminHeader
                setMenuOpened={() => {
                    setOpened((p: boolean) => !p)
                }}
                menuOpened={opened}
            />
        } else {
            return <HomeHeader
                setMenuOpened={() => {
                    setOpened((p: boolean) => !p)
                }}
                menuOpened={opened}
            />
        }
    }

    const initialSidebar = () => {

        if (user != "") {
            return MAIN_URLS.map((item, key: number) =>
                <NavLink
                    key={key}
                    label={item.name}
                    variant="filled"
                    active={item.url == router.route}
                    onClick={() => {
                        router.push(item.url)
                    }}
                >
                </NavLink>
            )
        } else {
            return LANDING_URLS.map((item, key: number) =>
                <NavLink
                    key={key}
                    label={item.name}
                    variant="filled"
                    active={item.url == router.pathname}
                    onClick={() => {
                        router.push(item.url)
                    }}
                >
                </NavLink>
            )
        }
    }

    return (
        router.route.indexOf('/auth/') > -1 ?
            <Box>
                {
                    children
                }
            </Box> :
            <AppShell
                styles={{
                    main: {
                        // background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                // navbar={
                //     <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                //         {
                //             initialSidebar()
                //         }
                //     </Navbar>
                // }

                header={
                    <Header height={{ base: 80 }} pr={'md'} pl={'md'} sx={(theme) => ({
                        padding: '0px'
                    })}>
                        {
                            initialHeader()
                        }
                    </Header>
                }
            >
                <Box>
                    {
                        isMobile ? <></> :
                            <LandingBanner />
                    }
                </Box>
                <Flex justify={'center'}>
                    <Box
                    >
                        {
                            children
                        }
                        <Box
                        >
                        </Box>
                    </Box>
                </Flex>
                <Footer />
            </AppShell>
    )
}

export default MainLayout