import {
    AppShell,
    Box,
    Burger,
    Flex,
    Header,
    MediaQuery,
    Navbar,
    Text,
    useMantineTheme,
    Popover,
    UnstyledButton,
    Indicator,
    Footer,
    Image,
    Button
} from "@mantine/core"
import { Calendar } from '@mantine/dates';
import {
    FC,
    useState,
    useContext,
    useEffect
} from "react"
import { FaPlus } from "react-icons/fa6";
import { BsCalendar3 } from "react-icons/bs";
import HomeContext from '@state/index.context';
import { LANDING_URLS, MAIN_URLS, MOBILE_WIDTH, SCREEN_WIDTH } from "@util/consts";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from '@mantine/hooks';

interface Props {
    menuOpened: boolean,
    setMenuOpened: () => void
}

const HomeHeader: FC<Props> = ({
    menuOpened,
    setMenuOpened
}) => {
    
    const theme = useMantineTheme();
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const router = useRouter();
    const isWrapped = useMediaQuery(`(max-width: ${SCREEN_WIDTH}px)`);
    const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
    const [user, setUser] = useState<string>('');
    
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
        const fetchData = async () => {
            const userString = localStorage.getItem('user');
            let loggedUser: DecodedToken | null = null;
        
            if (userString) {
                loggedUser = JSON.parse(userString);
            }
            if(loggedUser)
                setUser(loggedUser?.userId);
        };

        fetchData();
    }, []);

    const menuList = () => {
        const menu_components: any = [];
        if (user != "") {
            MAIN_URLS.map((item, index) => {
                menu_components.push(
                    <Link key={index} href={item.url}><Text color="white" style={{ cursor: 'pointer' }}>{item.name}</Text></Link>
                )
            })

        } else {
            LANDING_URLS.map((item, index) => {
                menu_components.push(
                    <a key={index} href={item.url}><Text color="white">{item.name}</Text></a>
                )
            })
        }

        return menu_components;
    }
    return (
        <Flex
            h='100%'
            justify={'space-between'}
            align={'center'}
            sx={(theme) => ({
                background: 'gray'
            })}
        >
            {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                    opened={menuOpened}
                    onClick={() => setMenuOpened()}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                />
            </MediaQuery> */}
            <Flex
                sx={(theme) => ({

                })}
                w={'100%'}
                justify={'center'}
                align={'center'}
            >
                <Flex
                    justify={'space-between'}
                    sx={(theme) => ({
                        width: isWrapped?'100%':SCREEN_WIDTH
                    })}
                >
                    <Flex
                        gap={30}
                        align={'center'}
                    >
                        {
                            isMobile?<></>:<Image src={'/logo.svg'} style={{ width: '60px' }} />
                        }
                        <Flex
                            align={'center'}
                            gap={15}
                        >
                            {
                                menuList()
                            }
                        </Flex>
                    </Flex>
                    
                    <Flex
                        gap={20}
                        align={'center'}
                    >
                        <Text color="white" style={{ cursor: 'pointer' }}
                            onClick={() => {
                                if (user == "") {
                                    router.push('/auth/signin')
                                } else {
                                    homeDispatch({
                                        "field":'user_data',
                                        "value": {
                                            name: '',
                                            email: ''
                                        }
                                    });
                                    localStorage.removeItem('user');
                                    router.push('/auth/signin');
                                }
                            }}
                        >
                            {
                                user != "" ? 'Logout' : 'Login'
                            }
                        </Text>
                        {
                            user == '' && !isMobile? <Button>
                                Become a member
                            </Button> : <></>
                        }
                        {
                            user == '' && !isMobile ?
                                <Flex gap={3}>
                                    <Image src={'/flags/china.svg'} alt="" style={{ cursor: 'pointer' }} />
                                    <Image src={'/flags/brazil.svg'} alt="" style={{ cursor: 'pointer' }} />
                                    <Image src={'/flags/england.svg'} alt="" style={{ cursor: 'pointer' }} />
                                </Flex> : <></>
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default HomeHeader;