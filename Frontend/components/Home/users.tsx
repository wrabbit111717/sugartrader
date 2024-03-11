
import {
    Box,
    Text,
    Flex,
    Grid,
    Button,
    Image,
    List,
    ThemeIcon
} from "@mantine/core";
import { FaCheck } from "react-icons/fa6";
import ContractFrom from '../../pages/modules/contractForm'

const Users = () => {
    return (
    <Grid mt={30}>
        <Grid.Col md={1.5}></Grid.Col>
        <Grid.Col md={3} sm={12}>
            <Box>
                <Grid mt={30}>
                    <Grid.Col md={12} sm={12}>
                        <Box sx={(theme) => ({
                            background: 'white',
                            border: `2px solid #23A6F0`,
                            borderRadius: 5
                        })}
                            w={'100%'}
                            p={25}
                        >
                            <Text mt={25} color="black" size={24} align="center" weight={'bold'}>
                                FREE
                            </Text>
                            <Text  mt={25} color="black" size={20} align="center" weight={'normal'}>
                                Organize across all apps by hand
                            </Text>
                            <Flex direction="row" align="center" justify="center">
                                {/* First text */}
                                <Text mt={5} color="#23A6F0" size={40} align="center" weight={'bold'}>
                                    0
                                </Text>

                                {/* Group of second and third texts */}
                                <Flex direction="column" align="left" ml={3}>
                                    {/* Second text */}
                                    <Text mt={5} color="#23A6F0" size={16} align="left" weight={'bold'}>
                                    $
                                    </Text>

                                    {/* Third text */}
                                    <Text color="#23A6F0" size={16} align="left" weight={'normal'}>
                                    per month
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex mt={25} direction={'column'} gap={20}>
                                <List
                                    spacing="15px"
                                    size="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="teal" size={30} radius="xl">
                                            <FaCheck size="1rem" />
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item><Text color="black" size={14}>Unlimited product updates</Text></List.Item>
                                    <List.Item><Text color="black">Unlimited product updates</Text></List.Item>
                                    <List.Item><Text color="black">Unlimited product updates</Text></List.Item>
                                </List>

                                <List
                                    spacing="15px"
                                    size="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="#BDBDBD" size={30} radius="xl">
                                            <FaCheck size="1rem" />
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item><Text color="black" size={14}>1GB  Cloud storage</Text></List.Item>
                                    <List.Item><Text color="black">Email and community support</Text></List.Item>
                                </List>
                                <Button fullWidth>
                                    Try for free
                                </Button>
                            </Flex>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Box>
        </Grid.Col>

        <Grid.Col md={3} sm={12}>
            <Box>
                <Grid mt={0}>
                    <Grid.Col md={12} sm={12}>
                        <Box sx={(theme) => ({
                            background: '#252B42',
                            border: `2px solid #23A6F0`,
                            borderRadius: 5
                        })}
                            w={'100%'}
                            p={25}
                        >
                            <Text mt={25} color="white" size={24} align="center" weight={'bold'}>
                                STANDARD
                            </Text>
                            <Text  mt={25} color="white" size={20} align="center" weight={'normal'}>
                                Organize across all apps by hand
                            </Text>
                            <Flex direction="row" align="center" justify="center">
                                {/* First text */}
                                <Text mt={5} color="#23A6F0" size={40} align="center" weight={'bold'}>
                                    9.99
                                </Text>

                                {/* Group of second and third texts */}
                                <Flex direction="column" align="left" ml={3}>
                                    {/* Second text */}
                                    <Text mt={5} color="#23A6F0" size={16} align="left" weight={'bold'}>
                                    $
                                    </Text>

                                    {/* Third text */}
                                    <Text color="#23A6F0" size={16} align="left" weight={'normal'}>
                                    per month
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex mt={25} direction={'column'} gap={20}>
                                <List
                                    spacing="15px"
                                    size="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="teal" size={30} radius="xl">
                                            <FaCheck size="1rem" />
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item><Text color="white" size={14}>Unlimited product updates</Text></List.Item>
                                    <List.Item><Text color="white">Unlimited product updates</Text></List.Item>
                                    <List.Item><Text color="white">Unlimited product updates</Text></List.Item>
                                </List>

                                <List
                                    spacing="15px"
                                    size="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="#BDBDBD" size={30} radius="xl">
                                            <FaCheck size="1rem" />
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item><Text color="white" size={14}>1GB  Cloud storage</Text></List.Item>
                                    <List.Item><Text color="white">Email and community support</Text></List.Item>
                                </List>
                                <Button fullWidth mb={30}>
                                    Try for free
                                </Button>
                            </Flex>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Box>
        </Grid.Col>
        <Grid.Col md={3} sm={12}>
            <Box>
                <Grid mt={30}>
                    <Grid.Col md={12} sm={12}>
                        <Box sx={(theme) => ({
                            background: 'white',
                            border: `2px solid #23A6F0`,
                            borderRadius: 5
                        })}
                            w={'100%'}
                            p={25}
                        >
                            <Text mt={25} color="black" size={24} align="center" weight={'bold'}>
                                PREMIUM
                            </Text>
                            <Text  mt={25} color="black" size={20} align="center" weight={'normal'}>
                                Organize across all apps by hand
                            </Text>
                            <Flex direction="row" align="center" justify="center">
                                {/* First text */}
                                <Text mt={5} color="#23A6F0" size={40} align="center" weight={'bold'}>
                                    19.99
                                </Text>

                                {/* Group of second and third texts */}
                                <Flex direction="column" align="left" ml={3}>
                                    {/* Second text */}
                                    <Text mt={5} color="#23A6F0" size={16} align="left" weight={'bold'}>
                                    $
                                    </Text>

                                    {/* Third text */}
                                    <Text color="#23A6F0" size={16} align="left" weight={'normal'}>
                                    per month
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex mt={25} direction={'column'} gap={20}>
                                <List
                                    spacing="15px"
                                    size="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="teal" size={30} radius="xl">
                                            <FaCheck size="1rem" />
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item><Text color="black" size={14}>Unlimited product updates</Text></List.Item>
                                    <List.Item><Text color="black">Unlimited product updates</Text></List.Item>
                                    <List.Item><Text color="black">Unlimited product updates</Text></List.Item>
                                </List>

                                <List
                                    spacing="15px"
                                    size="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="#BDBDBD" size={30} radius="xl">
                                            <FaCheck size="1rem" />
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item><Text color="black" size={14}>1GB  Cloud storage</Text></List.Item>
                                    <List.Item><Text color="black">Email and community support</Text></List.Item>
                                </List>
                                <Button fullWidth>
                                    Try for free
                                </Button>
                            </Flex>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Box>
        </Grid.Col>
        <Grid.Col md={1.5}></Grid.Col>
    </Grid>
    )
}

export default Users;