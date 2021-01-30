import MainLayout from "../components/MainLayout";
import '../styles/normalize.css'

function MyApp({ Component, pageProps }) {
  return <MainLayout><Component {...pageProps} /></MainLayout>
}

export default MyApp
