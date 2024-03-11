import { Box, Flex, Text, Image } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { MOBILE_WIDTH } from "@util/consts";

const Market = () => {
    const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
    return (
        <Box p={50}>
            <Flex direction={'column'} gap={15}>
                <Text align="center" size={40} weight={'bold'}>
                    Market
                </Text>
                <Text align="center" size={16} color="#737373">
                    How the market works, costs involved, commissions, guarantees and standard logistics.
                </Text>
            </Flex>
            <Flex mt={30} justify={'space-between'} gap={'30px'} align={'center'}>
                {
                    isMobile?<></>:<Image src='/market.png' width={"80%"}/>
                }
                <Box>
                    <Text size={24} weight={'bold'}>
                        A summary of the export sugar market
                    </Text>
                    <Flex direction={'column'} mt={30} gap={20}>
                        <Flex gap={15} align={'center'}>
                            <Image src={'/actor_icon.png'} style={{width: '30px'}}/>
                            <Box>
                                <Text size={16} weight={'bold'}>
                                    Mains actors
                                </Text>
                                <Text color="#737373">
                                    Who acts; how they communicate
                                </Text>
                            </Box>
                        </Flex>
                        <Flex gap={15} align={'center'}>
                            <Image src={'/message_icon.png'} style={{width: '30px'}} />
                            <Box>
                                <Text size={16} weight={'bold'}>
                                    Leads and danger
                                </Text>
                                <Text color="#737373">
                                    How to obtain leads and what are the main precautions for them
                                </Text>
                            </Box>
                        </Flex>
                        <Flex gap={15} align={'center'}>
                            <Image src={'/actor_icon.png'} style={{width: '30px'}}/>
                            <Box>
                                <Text size={16} weight={'bold'}>
                                    Protocol
                                </Text>
                                <Text color="#737373">
                                    Who acts; how they communicate
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>

            </Flex>
            <a href='#market'></a>
        </Box>
    )
}

export default Market;