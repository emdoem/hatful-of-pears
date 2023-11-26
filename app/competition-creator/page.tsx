import Head from 'next/head';
import Layout, { metadata } from '../layout';
// import CompetitionCreator from '../../components/CompetitionCreator'; - disabling SSR
import dynamic from 'next/dynamic';

const siteTitle = metadata.title as string;

export default function Page() {  
    const CCNoSSR = dynamic(() => import('../../components/CompetitionCreator'), { ssr: false })  // this didn't help yet...
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <CCNoSSR />
        </Layout>
    )
}