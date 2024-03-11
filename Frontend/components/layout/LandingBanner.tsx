
import Home from "@component/Banner/Home";
import Negociation from "@component/Banner/Negociation";
import Offers from "@component/Banner/Offsers";
import { Box} from "@mantine/core";
import HomeContext from "@state/index.context";
import { useRouter } from "next/router";

import { useContext } from "react";
const LandingBanner = () => {
    
    const router = useRouter();
    const {
        state: { user_data },
        dispatch: homeDispatch,
    } = useContext(HomeContext);

    const renderBanner = () => {
        const path = router.pathname;
        if(path.indexOf("/home") > -1) {
            return <Home /> 
        } else if(path.indexOf("/offers") > -1) {
            return <Offers />
        } else if(path.indexOf("/negociation") > -1) {
            return <Negociation />
        }
    }
    
    return (
        <Box
            style={{
                backgroundImage: 'url(/banner.png)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                padding: 0
            }}
            w={'100%'}
        >
            {
                renderBanner()
            }
        </Box>
    )
}

export default LandingBanner;