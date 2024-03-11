import { Box, Image, Modal, Card, Grid, Group, Flex, Text, TextInput, Select, Button } from "@mantine/core";
import { useForm, isEmail, isNotEmpty, hasLength } from '@mantine/form';
import { SCREEN_WIDTH, OFFER_TYPE_OPTIONS, DEST_PORT_OPTIONS, BOOL_OPTIONS } from "@util/consts";
import { useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from "react";
import { notifications } from '@mantine/notifications';
import apiService from "@service/apiService";
import { URL_OFFER_NEW, URL_OFFER_GET_ALL, URL_OFFER_REQUEST } from "@util/urls";
import { FaUsers } from "react-icons/fa6";

const Offers = () => {
    const [user, setUser] = useState<string>('');
    const [type, setType] = useState(0);
    const [offers, setOffer] = useState<Offer[]>([]);
    const [filtered, setFiltered] = useState<Offer[]>([]);
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [offertype, setOfferType] = useState<string>('');
    const [destinationPort, setDestinationPort] = useState('');
    const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH}px)`);
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
    interface DecodedToken {
        email: string;
        exp: number;
        iat: number;
        userId: string;
    }
    const offerForm = useForm({
        initialValues: {
            type: type,
            amount: '',
            email: '',
            offer_type:'',
            contract_date: '',
            spot: '',
            dest_port: ''
        },
        validate: {
            amount: isNotEmpty(),
            offer_type: isNotEmpty(),
            contract_date: isNotEmpty(),
            spot: isNotEmpty(),
            dest_port: isNotEmpty(),
            email: isEmail('Invalid email'),            
        },
    });

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
                const response = await apiService.post<any>(URL_OFFER_GET_ALL, { type: type, user_id: loggedUser?.userId });
                setOffer(response.offers);
                console.log(response, 'response');
            } catch (error) {
                console.error('Error fetching offers:', error);
                // Handle error
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createOffer = async() => {
        const userString = localStorage.getItem('user');
        let loggedUser: DecodedToken | null = null;
    
        if (userString) {
            loggedUser = JSON.parse(userString);
        }
    
        try{
            const response = await apiService.post<Response>(URL_OFFER_NEW, {
                type: offerForm.values.type,
                amount: offerForm.values.amount,
                email: offerForm.values.email,
                offer_type:offerForm.values.offer_type,
                contract_date: offerForm.values.contract_date,
                spot: offerForm.values.spot,
                dest_port: offerForm.values.dest_port,
                user_id: loggedUser?.userId
            });
            if(response.status === 200)
            {
                notifications.show({
                    title: 'Offer Submitted',
                    message: 'Your offer has been submitted successfully.',
                })                
                offerForm.setValues({
                    type: type,
                    amount: '',
                    email: '',
                    offer_type: '',
                    contract_date: '',
                    spot: '',
                    dest_port: ''
                });
            } else {
                notifications.show({
                    title: 'Offer Submit failed',
                    message: response.error?.message,
                })            
    
            }
            console.log(response, 'offer_response');
        } catch (error) {
            console.error('Signin error:', error);
            notifications.show({
                title: 'Offer Submit failed',
                message: 'Your offer submit failed.',
              })            

            // Handle authentication error, show error notification, etc.
        } finally {
        }
    }

    const getOffers = async(type: number) => {
        console.log(user, 'use')

        setType(type);
        try{
            const response = await apiService.post<any>(URL_OFFER_GET_ALL, {type: type, user_id: user});
            setOffer(response.offers);
            console.log(response, 'response')
        } catch (error) {
            console.error('Signin error:', error);
            // Handle authentication error, show error notification, etc.
        } finally {
        }
    }

    const handleRequestInfoClick = async (offerId: string) => {
        // Get the logged-in user's email (assuming you have a way to access it)

        try{
            const response = await apiService.post<Response>(URL_OFFER_REQUEST, {
                offer_id: offerId,
                user_id: user
            });

            if(response.status === 200)
            {
                notifications.show({
                    title: 'Offer Request Submitted',
                    message: 'Your offer Request has been submitted successfully.',
                })                
            } else {
                notifications.show({
                    title: 'Offer Request Submit failed',
                    message: response.error?.message,
                })            
    
            }
        } catch (error) {
            notifications.show({
                title: 'Offer Submit failed',
                message: 'Your offer submit failed.',
            })            
            // Handle authentication error, show error notification, etc.
        } finally {
        }
    };

    const handleFilterOffers = () => {
        // Filter offers based on user input values
        let filtered = offers;
        filtered = offers.filter((offer) => {
          // Replace the conditions with your actual filtering logic based on user input values
          return (
            (offer.amount === parseInt(amount) || !amount) &&
            (offer.email === email || !email) &&
            (offer.offertype === offertype || !offertype) &&
            (offer.dest_port === destinationPort || !destinationPort)
          );
        });
    
        // Update the state with filtered offers
        setFiltered(filtered);
        if(filtered.length === 0) {
            notifications.show({
                title: 'Filter Result',
                message: 'There is no matching result.',
            })                
        }
        console.log(filtered, offers, 'filtered');
      };
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
          sx={(theme) => ({
            width: isMobile ? '100%' : SCREEN_WIDTH
          })}
          p={70}
        >
          <Flex gap={20} direction={'column'}>
            <Text color="white" size={57} weight={'bold'}>
              Offer
            </Text>
            <Flex gap={20}>
              <Button
                variant={type === 0 ? 'filled' : 'outline'}
                radius={30}
                size="lg"
                onClick={() => getOffers(0)}
              >
                Seller
              </Button>
              <Button
                variant={type === 1 ? 'filled' : 'outline'}
                color="lime"
                size="lg"
                radius={30}
                onClick={() => getOffers(1)}
              >
                Buyer
              </Button>
            </Flex>
          </Flex>
          <Box
            component="form"
            sx={(theme) => ({
              borderRadius: '5px',
              background: 'white'
            })}
            p={30}
            onSubmit={offerForm.onSubmit(() => { createOffer() })}
          >
            <Flex direction={'column'} gap={20}>
              <Text align="center" weight={'bold'} size={25}>
                Product Specification*
              </Text>
              <TextInput
                label="Amount*"
                placeholder="amount"
                size="lg"
                {...offerForm.getInputProps('amount')}
              />
              <TextInput
                mt="md"
                label="Email Address*"
                placeholder="Email"
                size="lg"
                {...offerForm.getInputProps('email')}
              />
              <TextInput
                mt="md"
                label="Contract Date"
                placeholder="Contract Time Line"
                size="lg"
                {...offerForm.getInputProps('contract_date')}
                type="date"
              />
              <Select
                data={BOOL_OPTIONS}
                placeholder="Yes/No"
                label="Spot"
                size="lg"
                {...offerForm.getInputProps('spot')}
              />
              <Select
                data={OFFER_TYPE_OPTIONS}
                placeholder="CIF/FOB"
                label="Type"
                size="lg"
                {...offerForm.getInputProps('offer_type')}
              />
              <Select
                data={DEST_PORT_OPTIONS}
                placeholder="choose here"
                label="Destination Port *"
                size="lg"
                {...offerForm.getInputProps('dest_port')}
              />
              <Button size="lg" type="submit">
                Next
              </Button>
            </Flex>
          </Box>
        </Flex>
  
        <Box p={50} w={'100%'} h={'100%'} bg={'white'}>
          <Grid gutter={20}>
            <Grid.Col md={3} sm={12}>
                <Box>
                <Text weight={'bold'} size={24}>
                    Search Offer
                </Text>
                <Flex direction={'column'} gap={20} mt={30}>
                    {/* Inputs for user to filter offers */}
                    <TextInput
                    label="Amount*"
                    placeholder="Full Name"
                    size="md"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    />
                    <TextInput
                    mt="md"
                    label="Email Address*"
                    placeholder="Email"
                    size="md"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    <Select
                    data={OFFER_TYPE_OPTIONS}
                    {...offerForm.getInputProps('offer_type')}
                    placeholder="Spot/Contract - CIF/FOB"
                    label="Type*"
                    size="md"
                    value={offertype}
                    onChange={(value: string) => setOfferType(value)}
                    />
                    <Select
                    data={DEST_PORT_OPTIONS}
                    placeholder="choose here"
                    label="Destination Port *"
                    size="md"
                    {...offerForm.getInputProps('dest_port')}
                    value={destinationPort}
                    onChange={(value: string) => setDestinationPort(value)}
                    />
                    {/* Button to trigger filtering */}
                    <Button size="md" onClick={handleFilterOffers}>
                    Done
                    </Button>
                </Flex>
                </Box>
            </Grid.Col>
            <Grid.Col md={9} sm={12}>
            <Grid>
                {filtered.length > 0 ? (
                    filtered.map((offer, index) => (
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
                                            {offer.offertype}
                                        </Text>
                                    </Flex>
                                </Card.Section>
                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>{offer.product}</Text> {/* Adjust this to match your offer object structure */}
                                </Group>
                                <Text size="sm" color="dimmed">
                                    {offer.content} {/* Adjust this to match your offer object structure */}
                                </Text>
                                <Button
                                    color="green"
                                    mt={30}
                                    fullWidth
                                    onClick={() => handleRequestInfoClick(offer._id)} // Pass offer ID to the click handler
                                >
                                    Request more information
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))
                ) : (
                    offers.map((offer, index) => (
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
                                            {offer.offertype}
                                        </Text>
                                    </Flex>
                                </Card.Section>
                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>{offer.product}</Text> {/* Adjust this to match your offer object structure */}
                                </Group>
                                <Text size="sm" color="dimmed">
                                    {offer.content} {/* Adjust this to match your offer object structure */}
                                </Text>
                                <Button
                                    color="green"
                                    mt={30}
                                    fullWidth
                                    onClick={() => handleRequestInfoClick(offer._id)} // Pass offer ID to the click handler
                                >
                                    Request more information
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))
                )}
            </Grid>
            </Grid.Col>
          </Grid>
        </Box>
      </Flex>
    )
}

export default Offers;