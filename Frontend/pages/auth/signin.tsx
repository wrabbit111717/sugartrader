import {
    Box,
    Button,
    Flex,
    LoadingOverlay,
    TextInput,
    Image,
    Text
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import HomeContext from "@state/index.context";
// import jwt from 'jsonwebtoken';
import { URL_AUTH_SIGNIN, URL_AUTH_SIGNUP } from "@util/urls";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import apiService from "@service/apiService";
import jwt from 'jsonwebtoken';

const Signin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [type, setType] = useState<"signin" | "signup">("signin");
    const router = useRouter();

    const {
        state: { user_data },
        dispatch: homeDispatch,
    } = useContext(HomeContext);

    const signinForm = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            password: hasLength({ min: 8 }, 'Password must be at least 8 characters long'),
            email: isEmail('Invalid email'),
        },
    });

    const signupForm = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        },
        validate: {
            password: hasLength({ min: 8 }, 'Password must be at least 8 characters long'),
            confirmPassword: (value) => {
                if (value !== signupForm.values.password) {
                  return 'Passwords do not match';
                }
                return undefined; // Return undefined for valid case
            },
            email: isEmail('Invalid email'),
        },
    });

    const signin = async () => {
        try {
            setIsLoading(true);
            // Make API request for user authentication
            const response = await apiService.post<{ token: string }>(URL_AUTH_SIGNIN, {
                email: signinForm.values.email,
                password: signinForm.values.password,
            });

            // Assuming the API returns a token upon successful authentication
            const token = response.token;
            const decodedToken = jwt.decode(token);
            console.log(decodedToken, 'decodedToken')

            if(token) {
                homeDispatch({
                    field: 'user_data',
                    value: { token },
                });
                localStorage.setItem('user', JSON.stringify(decodedToken));
                router.push("/offers");
            } else {
                alert('Sign in is failed');
            }
        } catch (error) {
            console.error('Signin error:', error);
            // Handle authentication error, show error notification, etc.
        } finally {
            setIsLoading(false);
        }
    }

    const signup = async () => {
        try {
            setIsLoading(true);

            if (signupForm.values.password !== signupForm.values.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            // Make API request for user registration
            const response = await apiService.post<{ token: string }>(URL_AUTH_SIGNUP, {
                name: signupForm.values.name,
                email: signupForm.values.email,
                password: signupForm.values.password,
                confirmPassword: signupForm.values.confirmPassword
            });

            // Assuming the API returns a token upon successful registration
            const token = response.token;

            // Store the token in your application state or wherever you manage authentication
            if(token) {
                homeDispatch({
                    field: 'user_data',
                    value: { token },
                });
                localStorage.setItem('user', JSON.stringify(token));
                router.push("/offers");
            } else {
                alert('Sign up is failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Flex
            sx={(theme) => ({
                width: '100vw',
                height: '100vh',
            })}
            direction={'column'}
            justify={'center'}
            align={'center'}
        >

            <Flex
                direction={'column'}
                align={'center'}
            >
                <Image src='/logo.svg' style={{ width: '100px' }} />
                {
                    type == "signin" ?
                        <Box component="form" maw={400} mx="auto" onSubmit={signinForm.onSubmit(() => {
                            signin()
                        })}>
                            <Flex
                                direction={'column'}
                                gap={'20px'}
                            >
                                <TextInput label="Email" placeholder="Email" withAsterisk {...signinForm.getInputProps('email')} mt={30} w={350} />
                                <TextInput
                                    label="Password"
                                    type="password"
                                    placeholder="Password"
                                    withAsterisk
                                    {...signinForm.getInputProps('password')}
                                    w={350}
                                />
                                <Button
                                    type="submit"
                                >
                                    Sign In
                                </Button>
                                <Flex gap={10} justify={'center'}>
                                    <Text>
                                        Not a member
                                    </Text>
                                    <Text color="#0099ff" weight={600} style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setType('signup')
                                        }}
                                    >
                                        Sign Up
                                    </Text>
                                </Flex>
                            </Flex>
                        </Box>
                        :
                        <Box component="form" maw={400} mx="auto" onSubmit={signupForm.onSubmit(() => {
                            signup()
                        })}>
                            <Flex
                                direction={'column'}
                                gap={'20px'}
                            >
                                <TextInput label="Name" placeholder="Name" withAsterisk {...signupForm.getInputProps('name')} mt={30} w={350} />
                                <TextInput label="Email" placeholder="Email" withAsterisk {...signupForm.getInputProps('email')} w={350} />
                                <TextInput
                                    label="Password"
                                    type="password"
                                    placeholder="Password"
                                    withAsterisk
                                    {...signupForm.getInputProps('password')}
                                    w={350}
                                />
                                <TextInput label="Confirm Password" type="password" placeholder="Confirm Password" withAsterisk {...signupForm.getInputProps('confirmPassword')} w={350} /> {/* Add this line */}
                                <Button type="submit">
                                    Sign Up
                                </Button>
                                <Flex gap={10} justify={'center'}>
                                    <Text>
                                        Are you member
                                    </Text>
                                    <Text color="#0099ff" weight={600} style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setType('signin')
                                        }}
                                    >
                                        Sign In
                                    </Text>
                                </Flex>
                            </Flex>
                        </Box>

                }

            </Flex>
            <LoadingOverlay visible={isLoading} />
        </Flex>

    )
}

export default Signin;
