// import { siteTitle } from '../app/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';


export function WelcomeCard({ siteTitle }: { [prop: string]: any }) {
    return (
        <Card className='m-5 max-w-lg'>
            <CardHeader className='flex lg:flex-row justify-between'>
                <div>
                    <img src="/img/hatful_logo.png" className='max-w-md' alt='hatful logo' width={250} height={100} />
                    <CardTitle className='sr-only'>{siteTitle}</CardTitle>
                    <CardDescription className='mx-2'>a swing <span className='font-semibold text-gray-700'>dance competition</span> app</CardDescription>
                </div>
                <Link 
                    href="/competition-creator/" 
                    className={cn(buttonVariants(), 'opacity-70')}>
                    Create Competition
                </Link>

            </CardHeader>
            <CardContent className='text-gray-700'>
                <p className='text-justify italic leading-6'>
                    While awarding a winner on the basis of the arithmetic mean of the ranking recommendations may make intuitive sense,
                    it does not make sense for&nbsp;the&nbsp;fair placement of competitors.
                </p>
                <p className='not-italic my-3'>That&apos;s why we have
                    <a
                        className='hover:text-green-700'
                        href='https://en.wikipedia.org/wiki/Skating_system'
                        target='_blank'
                    >
                        &nbsp;Skating System.
                    </a>
                </p>

            </CardContent>

        </Card>
    );
}
