import {
    Box,
    Grid,
    Text,
    Flex
} from '@mantine/core'
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';

const Footer = () => {
    return (
        <Box p={30}>
            <Grid>
                <Grid.Col lg={3} md={6} sm={12}>
                    <Flex direction={'column'} gap={15}>
                        <Text size={24} weight={'bold'}>
                            Get In Touch
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            the quick fox jumps over the lazy dog
                        </Text>
                        <Flex gap={10}>
                            <IconBrandFacebook  color='#0099ff'/>
                            <IconBrandInstagram color='#0099ff'/>
                            <IconBrandTwitter color='#0099ff'/>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col lg={3} md={6} sm={12}>
                    <Flex direction={'column'} gap={15}>
                        <Text size={24} weight={'bold'}>
                            Company info
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            About Us
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            Carrier
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            Blog
                        </Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col lg={3} md={6} sm={12}>
                    <Flex direction={'column'} gap={15}>
                        <Text size={24} weight={'bold'}>
                            Features
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            Business Marketing
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            User Analytic
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            Unlimited Support
                        </Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col lg={3} md={6} sm={12}>
                    <Flex direction={'column'} gap={15}>
                        <Text size={24} weight={'bold'}>
                            Resources
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            IOS & Android
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            Watch a Demo
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            Customers
                        </Text>
                        <Text size={14} weight={600} color='#737373'>
                            API
                        </Text>
                    </Flex>
                </Grid.Col>
            </Grid>
            <Text mt={30} align='center' size={14} weight={600} color='#737373'>
                Made With Love By Figmaland All Right Reserved 
            </Text>
        </Box>
    )
}

export default Footer;