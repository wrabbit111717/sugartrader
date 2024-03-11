import { Box, Flex, Text, Image, Grid, TextInput, Select, Button } from "@mantine/core";
import { TimeInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { MOBILE_WIDTH } from "@util/consts";

const Book = () => {
    const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
    return (
        <Box >
            <Flex gap={15} align={'center'}  sx={() => ({
                        background: '#252B42',
                        color: 'white',
                        borderRadius: 5
            })} justify={'center'} pb={200}>
                <Grid p={100}>
                    <Grid.Col md={6} sm={12}>
                        <Box>
                            <Text size={40} weight={700} color="white">
                                We Have Branches All Over The World
                            </Text>
                            <Text size={14} weight={500}>
                                The gradual accumulation of information about atomic and small-scale behaviour during the first quarter of the 20th century, which gave some indications about how small things do behave, produced an increasing confusion which was Heisenberg, and Born.
                            </Text>
                        </Box>
                    </Grid.Col>

                    <Grid.Col md={6} sm={12}>
                        <Image src={'/world.png'} />
                    </Grid.Col>
                </Grid>
            </Flex>

            <Flex gap={15} align={'center'} mt={-300} sx={() => ({
                        color: 'white',
                        borderRadius: 5
            })} justify={'center'}>
                <Grid p={100}  gutter={0} w={'100%'}> 
                    <Grid.Col md={6} sm={12} style={{ display: 'flex', alignItems:"center" }} >
                        <Image src={'/book.jpg'} height={593} width='400px' style={{ marginLeft: 'auto', objectFit:"contain" }} />
                    </Grid.Col>
                    <Grid.Col md={6} sm={12} >
                        <Box
                            sx={(theme) => ({
                                borderRadius: '5px',
                                background: 'white',
                                width: "100%"
                            })}
                            p={30}
                        >
                            <Flex
                                direction={'column'}
                                gap={20}
                            >
                                <Text align="center" weight={'bold'} size={25}>
                                    Book Appointment
                                </Text>
                                <TextInput label="Name*" placeholder="Full Name" size="lg" />
                                <TextInput mt="md" label="Email Address*" placeholder="Email" size="lg" />
                                <Select
                                    data={[]}
                                    placeholder="Please Select"
                                    label="Department*"
                                    size="lg"
                                />
                                <TimeInput mt="md" label="Time*" placeholder="Time" size="lg" />
                                <Button size="lg">
                                    Book Appointment
                                </Button>
                            </Flex>
                        </Box>
                    </Grid.Col>

                </Grid>
            </Flex>

            <a href='#market'></a>
        </Box>
    )
}

export default Book;