import Navbar from "../components/Navbar";
import { WalletProvider } from "../lib/walletcontext";


function MyApp({ Component, pageProps }) {
    return (
        <>
            {/* wrap the entire app with the walletprovider to share wallet state across pages */}
            <WalletProvider>
                <Navbar />
                <Component {...pageProps} />
            </WalletProvider>
        </>
    );
}

export default MyApp;
