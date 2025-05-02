import Navbar from "../components/Navbar";
import { WalletProvider } from "../lib/walletcontext";


function MyApp({ Component, pageProps }) {
    return (
        <>
            <WalletProvider>
                <Navbar />
                <Component {...pageProps} />
            </WalletProvider>
        </>
    );
}

export default MyApp;
