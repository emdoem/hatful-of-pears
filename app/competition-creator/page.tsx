import Head from 'next/head';
import Layout, { siteTitle } from '../layout';
import CompetitionCreator from '../../components/CompetitionCreator';


export default function Page() {    
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <CompetitionCreator />
        </Layout>
    )
}