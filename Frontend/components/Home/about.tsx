import { Box, Flex, Text, Grid, Image,Rating } from "@mantine/core";
const About = () => {
    return (
        <Box p={50}>
            <Flex gap={15} align={'center'} direction={'column'}>
                <Text align='center' size={40} weight={'bold'}>
                    About Us
                </Text>
                <Text align="center" color="#737373">
                    Specialists in the sugar market, we have developed a safe environment for business. We have associated agents who will mediate business or supervise user negotiations.
                </Text>
            </Flex>
            <Grid mt={30}>
                <Grid.Col md={4} sm={12}>
                    <Flex justify={'center'} align={'center'} direction={'column'} gap={15}>
                        <Image src={'/people.jpg'} width={100}/>
                        <Text color="#737373" size={14}>
                            We are a group of independent agents with
                            experienc in the commodities market,
                            especially sugar, who came together 
                            in a synergy to  filter
                            leads and manage business in this market.
                        </Text>
                        <Rating value={3.5} fractions={2} readOnly />
                    </Flex>
                </Grid.Col>
                <Grid.Col md={4} sm={12}>
                    <Flex justify={'center'} align={'center'} direction={'column'} gap={15}>
                        <Image src={'/people.jpg'} width={100}/>
                        <Text color="#737373" size={14}>
                            We are a group of independent agents with
                            experienc in the commodities market,
                            especially sugar, who came together 
                            in a synergy to  filter
                            leads and manage business in this market.
                        </Text>
                        <Rating value={3.5} fractions={2} readOnly />
                    </Flex>
                </Grid.Col>
                <Grid.Col md={4} sm={12}>
                    <Flex justify={'center'} align={'center'} direction={'column'} gap={15}>
                        <Image src={'/people.jpg'} width={100}/>
                        <Text color="#737373" size={14}>
                            We are a group of independent agents with
                            experienc in the commodities market,
                            especially sugar, who came together 
                            in a synergy to  filter
                            leads and manage business in this market.
                        </Text>
                        <Rating value={3.5} fractions={2} readOnly />
                    </Flex>
                </Grid.Col>
            </Grid>
        </Box>
    )
}

export default About;