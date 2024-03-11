import {
    Burger,
    Flex,
    MediaQuery,
    Text,
    useMantineTheme,
} from "@mantine/core"
import {
    FC,
    useState,
} from "react"
import Link from "next/link"
import { ADMIN_CLIENT_URL, ADMIN_EMPLOYEE_URL } from "@util/urls";

interface Props {
    menuOpened: boolean,
    setMenuOpened: () => void
}

const AdminHeader: FC<Props> = ({
    menuOpened,
    setMenuOpened
}) => {

    const theme = useMantineTheme();
    return (
        <Flex
            h='100%'
            justify={'space-between'}
            align={'center'}
        >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                    opened={menuOpened}
                    onClick={() => setMenuOpened()}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                />
            </MediaQuery>
            <Flex>
                <Text size={20} weight={600}>
                    マスタ
                </Text>
            </Flex>
        </Flex>
    )
}

export default AdminHeader;