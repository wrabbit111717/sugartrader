import { Box, Card, Flex, Grid, Group, Text } from "@mantine/core";
import { FaUsers } from "react-icons/fa6";
const Service = () => {
    return (
        <Box p={50}>
            <Flex direction={'column'} gap={10} justify={'center'}>
                <Text align="center" size={40} weight={'bold'}>
                    Structure built to minimize frivolous speculation and fraud
                </Text>
                <Text size={'14px'} color="#737373" align="center">
                    The application to join is verified, users receive a mark for their level of security and trading experience
                </Text>
                <Text size={'14px'} color="#737373" align="center">
                    By agreeing to join the platform, the user signs NCNDA, which extends to all contacts made within it.
                </Text>
                <Text size={14} align="center">
                    All negotiations are individual between agents, the data is encrypted, from supporting documents as well as the  messages exchanged  and the progress of the documentation inherent to the standard protocol.
                </Text>
            </Flex>
            <Grid mt={50}>
                <Grid.Col md={4} sm={12}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section bg={'#8EC2F2'}>
                            <Flex p={20}
                                gap={20}
                                align={'center'}
                                justify={'center'}
                            >
                                <Flex
                                    sx={(theme)=>({
                                        width: 50,
                                        height: 50,
                                        borderRadius: '100%',
                                        background: 'white'
                                    })}
                                    align={'center'}
                                    justify={'center'}
                                >
                                    <FaUsers size={20} color="#8EC2F2"/>    
                                </Flex>
                                <Text color="white" size={16} weight={'bold'}>
                                        Offer Registration 
                                </Text>
                            </Flex>
                        </Card.Section>
                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Norway Fjord Adventures</Text>
                        </Group>
                        <Text size="sm" color="dimmed">
                            we offer the perfect en++vironment for high-level negotiation
                            Our certification, encryption and complete forms tools
                            Our certification, encryption and complete forms tools
                        </Text>
                        <Text color="#8EC2F2" style={{cursor: 'pointer'}} mt={20} weight={'bold'}>
                            Learn more
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col md={4} sm={12}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section bg={'#8EC2F2'}>
                            <Flex p={20}
                                gap={20}
                                align={'center'}
                                justify={'center'}
                            >
                                <Flex
                                    sx={(theme)=>({
                                        width: 50,
                                        height: 50,
                                        borderRadius: '100%',
                                        background: 'white'
                                    })}
                                    align={'center'}
                                    justify={'center'}
                                >
                                    <FaUsers size={20} color="#8EC2F2"/>    
                                </Flex>
                                <Text color="white" size={16} weight={'bold'}>
                                        Offer Registration 
                                </Text>
                            </Flex>
                        </Card.Section>
                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Norway Fjord Adventures</Text>
                        </Group>
                        <Text size="sm" color="dimmed">
                            we offer the perfect en++vironment for high-level negotiation
                            Our certification, encryption and complete forms tools
                            Our certification, encryption and complete forms tools
                        </Text>
                        <Text color="#8EC2F2" style={{cursor: 'pointer'}} mt={20} weight={'bold'}>
                            Learn more
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col md={4} sm={12}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section bg={'#8EC2F2'}>
                            <Flex p={20}
                                gap={20}
                                align={'center'}
                                justify={'center'}
                            >
                                <Flex
                                    sx={(theme)=>({
                                        width: 50,
                                        height: 50,
                                        borderRadius: '100%',
                                        background: 'white'
                                    })}
                                    align={'center'}
                                    justify={'center'}
                                >
                                    <FaUsers size={20} color="#8EC2F2"/>    
                                </Flex>
                                <Text color="white" size={16} weight={'bold'}>
                                        Offer Registration 
                                </Text>
                            </Flex>
                        </Card.Section>
                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Norway Fjord Adventures</Text>
                        </Group>
                        <Text size="sm" color="dimmed">
                            we offer the perfect en++vironment for high-level negotiation
                            Our certification, encryption and complete forms tools
                            Our certification, encryption and complete forms tools
                        </Text>
                        <Text color="#8EC2F2" style={{cursor: 'pointer'}} mt={20} weight={'bold'}>
                            Learn more
                        </Text>
                    </Card>
                </Grid.Col>
            </Grid>
        </Box>
    )
}

export default Service;