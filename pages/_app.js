import Layout from '../components/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
  <Layout home> <Component {...pageProps} /></Layout>
  )
}

export default MyApp
