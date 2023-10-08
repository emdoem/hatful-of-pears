import Head from 'next/head';
import Layout, { siteTitle } from './layout';
import Image from 'next/image';
import { WelcomeCard } from '../components/WelcomeCard';
import { Button } from '@/components/ui/button';

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