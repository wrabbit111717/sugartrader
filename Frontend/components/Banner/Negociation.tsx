import { Box, Flex, Button, Text, Modal, Grid, Card, Group, TextInput, Checkbox, Paper, Avatar, Anchor } from "@mantine/core";
import { MOBILE_WIDTH, SCREEN_WIDTH } from "@util/consts";
import { useState, useEffect, useRef } from 'react';
import Chat from '@component/Chat'
import { useMediaQuery } from '@mantine/hooks';
import { FaUpload, FaUsers,FaPaperPlane } from "react-icons/fa6";
import ContractFrom from '../../pages/modules/contractForm'
import apiService from "@service/apiService";
import { URL_OFFER_GET_NEGOTIATION, URL_OFFER_GET_NEGOTIATIONS, URL_OFFER_UPDATE_NEGOTIATION } from "@util/urls";
import socket from "@service/socketService";

const Negociation = () => {
    const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH}px)`);
    const [modalOpen, setModalOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [user, setUser] = useState<string>('');
    const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
    const [negotiation, setNegotiation] = useState<Negotiation>();
    const [pendingNegotiations, setPendingNegotiations] = useState<Negotiation[]>([]);
    const [progressNegotiations, setProgressNegotiations] = useState<Negotiation[]>([]);
    const [completeNegotiations, setCompleteNegotiations] = useState<Negotiation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [fileUploadStatus, setFileUploadStatus] = useState<string | null>(null);
    const inputFile = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const [negotiationId, setNegotiationId] = useState('');
    const [stage, setStage] = useState(0);
    const [lastFile, setLastFile] = useState(0);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    // const pendingNegotiations: Negotiation[] = [];
    // const progressNegotiations: Negotiation[] = [];
    // const completeNegotiations: Negotiation[] = [];

    interface Response {
        status: number;
        error?: any;
    }
    interface Offer {
        _id: string,
        type: Number, //0: seller, 1: buyer
        currency: Number, //0: USD, 1: Euro
        spot: Number, 
        amount: Number, 
        contract_date: Date, 
        dest_port: String, //destination port
        warrrenty: String,
        offertype: String, //0: seller, 1: buyer
        bond: String,
        commission: String,
        product: String,
        language : String,
        title : String,
        category : String,
        email : String,
        content : String
    }

    interface Negotiation {
        _id: string,
        buyer_id: string,
        seller_id: string,
        offer_id: Offer,
        user_id: string,
        dueDate: string,
        stage: number,
        doc: string,
        status: boolean
    }
    interface DecodedToken {
        email: string;
        exp: number;
        iat: number;
        userId: string;
    }

    interface Message {
        avatar: string;
        sender: any;
        text?: string;
        type: number;
        file?: File | null;
        file_name?: string;
        downloadLink?: string;
    }

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  
    const acceptTerms = () => {
      setTermsAccepted(true);
      closeModal(); // Close modal after accepting terms
    };

    const openchat = () => {
        if(termsAccepted)
            setChatOpen(true);
    };

    const handleJoinRoom = async (id: string) => {
        setNegotiationId(id);
        try {
            const response = await apiService.post<any>(URL_OFFER_GET_NEGOTIATION, { negotiationId: id });
            setNegotiation(response.negotiation);
            console.log(response.negotiation, 'response.negociation')
            setStage(response.negotiation.stage);
        } catch (error) {
            console.error('Error fetching negociations:', error);
        }
        socket.emit('join room', id);
    };
  
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFile = e.target.files?.[0];
      if (uploadedFile) {
        setFile(uploadedFile);
        setFileUploadStatus(uploadedFile.name);
      }
    };
  
    const handleSendMessage = () => {
        if (!message && !file) {
            return;
        }
    
        let newMessage: Message = {
            avatar: '',
            sender: [],
            type: 0
        };
    
        if (message) {
            newMessage = {
                ...newMessage,
                text: message,
            };
        }
    
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = reader.result as ArrayBuffer; // Set fileData after the file is read
                socket.emit('chat message', { room: negotiationId, fileData: fileData, fileName: file?.name, message: message, senderId: user });
            };
            reader.readAsArrayBuffer(file);
            setFile(null);
            setFileUploadStatus('');
        } else {
            // If no file, emit the message without fileData
            socket.emit('chat message', { room: negotiationId, message: message, senderId: user });
        }
    
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    };
    

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };
  

    const handleAcceptStage = async (stage: number, negotiationId: string) => {
        console.log(stage, 'handleAcceptStage')
        try {
            const response = await apiService.post<any>(URL_OFFER_UPDATE_NEGOTIATION, { stage: stage, negotiationId: negotiationId, status: true });
            setNegotiation(response.negotiation);
            setStage(response.negotiation.stage);
            socket.emit('chat message', { room: negotiationId, message: 'Your request accepted', senderId: user });
        } catch (error) {
            console.error('Error fetching offers:', error);
            // Handle error
        }
    }

    const handleDeclineStage = async (stage: number, negotiationId: string) => {
        try {
            const response = await apiService.post<any>(URL_OFFER_UPDATE_NEGOTIATION, { stage: stage, negotiationId: negotiationId, status: false });
            setNegotiation(response.negotiation);
            socket.emit('chat message', { room: negotiationId, message: 'Your request declined', senderId: user });
        } catch (error) {
            console.error('Error fetching offers:', error);
            // Handle error
        }
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

            try {
                const response = await apiService.post<any>(URL_OFFER_GET_NEGOTIATIONS, { user_id: loggedUser?.userId });
                
                response.negotiations?.forEach((negotiation: Negotiation) => {
                    if (negotiation.stage === 0) {
                        setPendingNegotiations((prevNegotiations) => [...prevNegotiations, negotiation]);
                    } else if (negotiation.stage > 0 && negotiation.stage < 5) {
                        setProgressNegotiations((prevNegotiations) => [...prevNegotiations, negotiation]);
                    } else if (negotiation.stage === 5) {
                        setCompleteNegotiations((prevNegotiations) => [...prevNegotiations, negotiation]);
                    }
                });
                console.log(pendingNegotiations, progressNegotiations, completeNegotiations, 'responses');
                setNegotiations(response.negotiations);
            } catch (error) {
                console.error('Error fetching offers:', error);
                // Handle error
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);
  
    useEffect(() => {
        socket.on('all messages', newMessages => {
            setMessages(newMessages);
            for (let i = newMessages.length - 1; i >= 0; i--) {
                const msg = newMessages[i];
                if (msg.file_name && msg.file_name !== '') {
                    setLastFile(i);
                    break; // Stop iteration once a message with a file name is found
                }
            }
            console.log(lastFile, newMessages, 'newMessages');
        });

        socket.on('chat message', (newMessage: Message) => {
            // setMessages((prevMessages) => {
            //     const updatedMessages = [...prevMessages, newMessage];
                
            //     for (let i = updatedMessages.length - 1; i >= 0; i--) {
            //         const msg = updatedMessages[i];
            //         if (msg.file_name && msg.file_name !== '') {
            //             setLastFile(i);
            //             break; // Stop iteration once a message with a file name is found
            //         }
            //     }
            //     return updatedMessages;
            // });
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, newMessage];
                if(newMessage.file_name) {
                    let lastFileIndex = 0;
            
                    for (let i = updatedMessages.length - 1; i >= 0; i--) {
                        const msg = updatedMessages[i];
                        if (msg.file_name && msg.file_name !== '') {
                            lastFileIndex = i;
                            break; // Stop iteration once a message with a file name is found
                        }
                    }
                
                    // Set the lastFile state after the loop
                    setLastFile(lastFileIndex);
                }
            
                return updatedMessages;
            });
            console.log(lastFile, 'lastFile')
            setNegotiation(prevState => {
                if (!prevState) return prevState; // Return prevState if it's undefined
    
                // Return a new object with the updated stage value and other properties retained
                return {
                    ...prevState,
                    status: false
                };
            });

            if(newMessage.text === 'Your request accepted') {
                setStage(prevStage => prevStage + 1);

                setNegotiation(prevState => {
                    if (!prevState) return prevState; // Return prevState if it's undefined
        
                    // Return a new object with the updated stage value and other properties retained
                    return {
                        ...prevState,
                        stage: prevState.stage + 1
                    };
                });
            }
        
            console.log(newMessage, messages, lastFile,  'lastFilechat')
        });
        
        return () => {
            socket.off('all messages');
            socket.off('chat message');
        };
    }, []);
    return (
        <Flex
            direction={'column'}
            justify={'center'}
            align={'center'}
            h={'100%'}
        >
            <Flex
                gap={50}
                align={'center'}
                justify={'space-between'}
                w={SCREEN_WIDTH}
                sx={(theme) =>({
                    width: isMobile?'100%':SCREEN_WIDTH
                })}
                p={50}
            >
                <Flex gap={20} direction={'column'}>
                    <Text color="white" size={57} weight={'bold'}>
                        Open Negociation  
                    </Text>
                    <Flex gap={20}>
                        <Button radius={30} size="lg" color="yellow" onClick={openModal}>
                            Terms of Use
                        </Button>
                        <Modal opened={modalOpen} onClose={closeModal} title="Terms of Use">
                            <div>
                            <p> By accepting these terms, you agree to ...</p>
                            {/* <label>
                                <input
                                
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={() => setTermsAccepted(!termsAccepted)}
                                />
                                 I accept the terms and conditions
                            </label> */}
                            <Checkbox
                        label="I agree to sell my privacy"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                        />
                            </div>
                            
                            <Flex
                                mt={20}
                                justify={'flex-end'}
                                gap={15}
                            >
                                <Button
                                    radius={30}
                                    size="sm"
                                    color="blue"
                                    disabled={!termsAccepted}
                                    onClick={acceptTerms}
                                >
                                    Okay
                                </Button>
                                <Button radius={30} size="sm" variant="light" onClick={closeModal}>
                                    Cancel
                                </Button>
                                
                            </Flex>
                        </Modal>
                        <Button variant="outline" color="lime" size="lg" radius={30} onClick={openchat}>
                            Open Chat
                        </Button>
                    </Flex>
                </Flex>
                <Box
                    sx={(theme) => ({
                        borderRadius: '5px',
                    })}
                    w={350}
                    h={500}
                >
                    {/* { chatOpen && termsAccepted && <Chat />} */}
                    {/* <Chat /> */}

                </Box>
            </Flex>
            <Box p={150} w={'100%'} h={'100%'} bg={'white'}>
                <Flex gap={15} direction={'column'} mt={40}>
                    <Text size={40} weight={'bold'} align="center">
                        Your Negotiation
                    </Text>
                    <Text color="#737373" size={14} align="center">
                        Here you manage your Negotiations
                    </Text>
                </Flex>
                <Grid mt={30}>
                    {pendingNegotiations && pendingNegotiations.length > 0 && (
                        <Text w={'100%'} size="lg">Pending</Text>
                    )}
                    {pendingNegotiations?.map((negotiation, index) => (
                        <Grid.Col key={index} lg={4} md={6} sm={12}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section bg={'#2DC071'}>
                                    <Flex p={20} gap={20} align={'center'} justify={'center'}>
                                        <Flex
                                            sx={(theme) => ({
                                                width: 50,
                                                height: 50,
                                                borderRadius: '100%',
                                                background: 'white'
                                            })}
                                            align={'center'}
                                            justify={'center'}
                                        >
                                            <FaUsers size={20} color="#8EC2F2" />
                                        </Flex>
                                        <Text color="white" size={16} weight={'bold'}>
                                            {negotiation.offer_id.offertype}
                                        </Text>
                                    </Flex>
                                </Card.Section>
                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>{negotiation.offer_id.product}</Text> {/* Adjust this to match your offer object structure */}
                                </Group>
                                <Text size="sm" color="dimmed">
                                    {negotiation.offer_id.content} {/* Adjust this to match your offer object structure */}
                                </Text>
                                <Button
                                    color="green"
                                    mt={30}
                                    fullWidth
                                    onClick={() => handleJoinRoom(negotiation._id)}
                                >
                                    Access to Negotiation
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))
                    }
                </Grid>
                <Grid mt={30}>
                    {progressNegotiations && progressNegotiations.length > 0 && (
                        <Text w={'100%'} size="lg">Progress</Text>
                    )}
                    {progressNegotiations?.map((negotiation, index) => (
                        <Grid.Col key={index} lg={4} md={6} sm={12}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section bg={'#2DC071'}>
                                    <Flex p={20} gap={20} align={'center'} justify={'center'}>
                                        <Flex
                                            sx={(theme) => ({
                                                width: 50,
                                                height: 50,
                                                borderRadius: '100%',
                                                background: 'white'
                                            })}
                                            align={'center'}
                                            justify={'center'}
                                        >
                                            <FaUsers size={20} color="#8EC2F2" />
                                        </Flex>
                                        <Text color="white" size={16} weight={'bold'}>
                                            {negotiation.offer_id.offertype}
                                        </Text>
                                    </Flex>
                                </Card.Section>
                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>{negotiation.offer_id.product}</Text> {/* Adjust this to match your offer object structure */}
                                </Group>
                                <Text size="sm" color="dimmed">
                                    {negotiation.offer_id.content} {/* Adjust this to match your offer object structure */}
                                </Text>
                                <Button
                                    color="green"
                                    mt={30}
                                    fullWidth
                                    onClick={() => handleJoinRoom(negotiation._id)}
                                >
                                    Access to Negotiation
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))
                    }
                </Grid>
                <Grid mt={30}>
                    {completeNegotiations && completeNegotiations.length > 0 && (
                        <Text w={'100%'} size="lg">Complete</Text>
                    )}
                    {completeNegotiations?.map((negotiation, index) => (
                        <Grid.Col key={index} lg={4} md={6} sm={12}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section bg={'#2DC071'}>
                                    <Flex p={20} gap={20} align={'center'} justify={'center'}>
                                        <Flex
                                            sx={(theme) => ({
                                                width: 50,
                                                height: 50,
                                                borderRadius: '100%',
                                                background: 'white'
                                            })}
                                            align={'center'}
                                            justify={'center'}
                                        >
                                            <FaUsers size={20} color="#8EC2F2" />
                                        </Flex>
                                        <Text color="white" size={16} weight={'bold'}>
                                            {negotiation.offer_id.offertype}
                                        </Text>
                                    </Flex>
                                </Card.Section>
                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>{negotiation.offer_id.product}</Text> {/* Adjust this to match your offer object structure */}
                                </Group>
                                <Text size="sm" color="dimmed">
                                    {negotiation.offer_id.content} {/* Adjust this to match your offer object structure */}
                                </Text>
                                <Button
                                    color="green"
                                    mt={30}
                                    fullWidth
                                    onClick={() => handleJoinRoom(negotiation._id)}
                                >
                                    Access to Negotiation
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))
                    }
                </Grid>
                <Grid mt={30}>
                    <Grid.Col md={4} sm={12}>
                        <ContractFrom backgroundColor='#252B42' fontColor='white' type="Buyer" stage={stage}/>
                    </Grid.Col>

                    <Grid.Col md={4} sm={12}>
                            
                        <Box ref={messageContainerRef} style={{ height: '300px', overflowY: 'scroll' }}>
                            {messages.map((msg, index) => (
                                <Box key={index}>
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar src={msg.avatar} />
                                    <span>{msg.sender?.name}</span>
                                </Box>
                                {msg.text && <Box>{msg.text}</Box>}
                                {msg.file_name && (
                                    <Box>
                                        <Anchor href={'http://localhost:8080/message/' + msg.file_name} target="_blank" underline={true} download={msg.file_name}>
                                            {msg.file_name}
                                        </Anchor>
                                    </Box>
                                )}
                                 {/* Check if the message has a file and render the accept and decline buttons for the receiver */}
                                {msg.type === 1 && msg.sender?._id && user && user !== msg.sender?._id && msg.file_name && lastFile === index && !negotiation?.status && (
                                 <Box>
                                    <Button onClick={() => handleAcceptStage(stage, negotiationId)}>Accept</Button>
                                    <Button color="orange" onClick={() => handleDeclineStage(stage, negotiationId)}>Decline</Button>
                                 </Box>
                                )}
                             </Box>
                            ))}
                        </Box>
                        {fileUploadStatus && (
                            <span style={{ marginLeft: '10px' }}>{fileUploadStatus}</span>
                        )}
                        <Paper shadow="xs" style={{ padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                            <TextInput value={message} style={{ flex: 1 }} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..."  onKeyPress={handleKeyPress} />
                            <Button variant="light" style={{ marginLeft: '10px' }} onClick={() => inputFile.current?.click()} disabled={!negotiationId || !user}>
                                <FaUpload />
                            </Button>
                            <input ref={inputFile} type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                            <Button onClick={handleSendMessage} disabled={!negotiationId || !user} style={{ marginLeft: '10px' }}>
                                <FaPaperPlane />
                            </Button>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col md={4} sm={12}>
                        <ContractFrom backgroundColor='white' fontColor='black' type="Seller" stage={stage}/>
                    </Grid.Col>
                </Grid>
            </Box>
        </Flex>
    )
}

export default Negociation;