
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

interface ContractFormProps {
    backgroundColor: string;
    fontColor: string;
    type: string;
    stage: number;
}

const ContractForm: React.FC<ContractFormProps> = ({ backgroundColor, fontColor, type, stage }) => {
    console.log(stage, 'stage')
    const items = [
        { text: 'NCNDA Signed', color: stage < 1 ? 'yellow' : 'green' },
        { text: 'ICPO RWA accepted', color: stage < 2 ? 'yellow' : 'green' },
        { text: 'NCNDA Signed', color: stage < 3 ? 'yellow' : 'green' },
        { text: 'FCO sent', color: stage < 4 ? 'yellow' : 'green' },
        { text: 'SBLC under analysis', color: stage < 5 ? 'yellow' : 'green' }
    ];
    return (
        <Box>
            <Grid mt={30}>
                <Grid.Col md={12} sm={12}>
                    <Box sx={(theme) => ({
                        background: backgroundColor,
                        color: fontColor,
                        borderRadius: 5
                    })}
                        w={'100%'}
                        p={25}
                    >
                        <Flex justify={'center'}>
                            <Image src={'/people_icon.png'} style={{ width: 30 }} />
                        </Flex>
                        <Text mt={25} color={fontColor} size={24} align="center" weight={'bold'}>
                            {type}
                        </Text>
                        <Flex mt={25} direction={'column'} gap={20}>
                            <List spacing="15px" size="sm" center style={{ listStyle: 'none', paddingLeft: 0 }}>
                                {items.map((item, index) => (
                                    <List.Item key={index}>
                                        <Flex align="center">
                                            <ThemeIcon color={item.color} size={30} radius="xl">
                                                <FaCheck size="1rem" />
                                            </ThemeIcon>
                                            <Text color={fontColor} size={14} style={{ marginLeft: '10px' }}>{item.text}</Text>
                                        </Flex>
                                    </List.Item>
                                ))}
                            </List>
                            <Button fullWidth disabled={stage !== 5}>
                                Complete Process
                            </Button>
                        </Flex>
                    </Box>
                </Grid.Col>
            </Grid>
        </Box>
    )
}

export default ContractForm;