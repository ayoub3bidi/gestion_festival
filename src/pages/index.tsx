import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import CardBox from '../components/CardBox'
import LayoutGuest from '../layouts/Guest'
import SectionMain from '../components/Section/Main'
import { gradientBgPurplePink } from '../colors'
import { appTitle } from '../config'
import { useAppDispatch } from '../stores/hooks'
import { setDarkMode } from '../stores/darkModeSlice'

const StyleSelectPage = () => {
  const dispatch = useAppDispatch()

  dispatch(setDarkMode(false))

  const router = useRouter()

  const handleGoLogin = (e: React.MouseEvent) => {
    e.preventDefault()

    document.documentElement.classList.forEach((token) => {
      if (token.indexOf('style') === 0) {
        document.documentElement.classList.replace(token, `style-basic`)
      }
    })

    router.push('/login')
  }

  return (
    <>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <div className={`flex min-h-screen items-center justify-center ${gradientBgPurplePink}`}>
        <SectionMain>
          <h1 className="text-4xl md:text-5xl text-center text-white font-bold mt-12 mb-3 lg:mt-0">
            Welcome to Festival platfom app
          </h1>
          <div className="">
            <CardBox
                className="cursor-pointer bg-gray-50"
                isHoverable
                onClick={handleGoLogin}
              >
                <h1 className="text-center text-xl md:text-3xl font-black capitalize">Go to Login</h1>
              </CardBox>
          </div>
        </SectionMain>
      </div>
    </>
  )
}

StyleSelectPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default StyleSelectPage
