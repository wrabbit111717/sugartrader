import About from "@component/Home/about";
import Market from "@component/Home/market";
import Service from "@component/Home/service";
import Users from "@component/Home/users";
import Book from "@component/Home/book";
import { Box, Flex } from "@mantine/core";

const Home = () => {
    return (
        <Flex
            w={'100%'}
            direction={'column'}
            gap={50}
            pt={50}
        >
            <Service />
            <About />
            <Users/>
            <Book/>
            <Market />
        </Flex>
    )
}

export default Home;