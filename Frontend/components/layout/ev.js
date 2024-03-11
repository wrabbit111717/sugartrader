import { Box, Image, Flex, Text, TextInput, Select, Button } from "@mantine/core";
import { TimeInput } from '@mantine/dates';

const Offers = () => {
    return (
        <Flex
            p={20}
            direction={'column'}
            justify={'center'}
            h={'100%'}
        >
            <Flex
                gap={50}
                align={'center'}
                justify={'center'}
            >
                <Flex gap={20} direction={'column'}>
                    <Text color="white" size={57} weight={'bold'}>
                        Safe Trading Environnment
                    </Text>
                    <Text size={20} color="white">
                        Restricted to buyers, sellers and certified agents
                    </Text>
                    <Flex gap={20}>
                        <Button radius={30} size="lg">
                            Get Code invitation
                        </Button>
                        <Button variant="outline" color="lime" size="lg" radius={30}>
                            Learn More
                        </Button>
                    </Flex>
                </Flex>
                <Box
                    sx={(theme) => ({
                        borderRadius: '5px',
                        background: 'white'
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
            </Flex>
        </Flex>
    )
}

export default Offers;