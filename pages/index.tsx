import MainLayout from '@/layouts/MainLayout'
import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'
import PhotoImage from '../public/photo.jpg';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Roman Sadoyan</title>
      </Head>
      <main className="leading-loose p-4">
        <div className="mb-4">
          <div className='flex justify-center'>
            <Image src={PhotoImage} alt="Roman Sadoyan" className="rounded-full" />
          </div>

          <h3 className="font-semibold text-xl">About me</h3>
          <div className="ml-5">
            <p>
              Graduated from{' '}
              <Link href="http://en.ifmo.ru/en/">
                <a className="no-underline" target="_blank" rel="noopener noreferrer">
                  ITMO University
                </a>
              </Link>{' '}
              as master of Computer Science
            </p>
            <p>
              Frontend-developer at{' '}
              <Link href="https://www.oncoshot.com/">
                <a className="no-underline" target="_blank" rel="noopener noreferrer" >
                  Oncoshot.com
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Skills</h3>
          <ul className="ml-5">
            <li>HTML, CSS</li>
            <li>JavaScript, TypeScript</li>
            <li>React, Vue</li>
            <li>PHP, Node.js</li>
            <li>Git, Webpack, Docker</li>
          </ul>
        </div>
      </main>
    </MainLayout>
  )
}

export default Home
