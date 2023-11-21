import Head from 'next/head';
import Layout, { siteTitle } from './layout';
import { WelcomeCard } from '../components/WelcomeCard';
import dynamic from 'next/dynamic';

// const WCNoSSR = dynamic(() => import('../components/WelcomeCard'), { ssr: false }) - this throws a type error...

export default function Home() {   
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <main className='flex justify-center p-20'>
                <WelcomeCard siteTitle={siteTitle} />
            </main>
        </Layout>
    )
}