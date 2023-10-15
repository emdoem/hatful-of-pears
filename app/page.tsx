import Head from 'next/head'; // to be replaced with metadata object from layout.tsx
import Layout, { siteTitle } from './layout';
import { WelcomeCard } from '../components/WelcomeCard';

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