import Head from 'next/head';
import Layout, { metadata } from './layout';
import { WelcomeCard } from '../components/WelcomeCard';
import dynamic from 'next/dynamic';

// const WCNoSSR = dynamic(() => import('../components/WelcomeCard'), { ssr: false }) - this throws a type error...
// const siteTitle = 'For a Hatful of Pears'; // this needs a different solution
const siteTitle = metadata.title as string;

export default function Home() {   
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <main className='flex justify-center'>
                <WelcomeCard siteTitle={siteTitle} />
            </main>
        </Layout>
    )
}