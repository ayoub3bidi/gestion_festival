import React from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import axios from 'axios'
import { apiLink } from '../config'

type LoginForm = {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()

  const handlePagesDirection = async (token) => {
    try {
      const response = await axios.get(`${apiLink}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.is_admin) {
        // router.push({
        //   pathname: '/dashboard',
        //   query: { token: token },
        // })
        localStorage.setItem('token', token)
        router.push('/dashboard')
      } else {
        // TODO: redirect to user page
        router.push('/home')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (formValues: LoginForm) => {
    try {
      const response = await axios.post(`${apiLink}/user/login`, {
        email: formValues.email,
        password: formValues.password,
      });
      await handlePagesDirection(response.data.token.access_token)
    } catch (error) {
      console.log(error);
    }
  }

  const sendedEmail = router.query.email
  const sendedPassword = router.query.password

  const initialValues: LoginForm = {
    email: sendedEmail ? sendedEmail.toString() : 'admin@festival.io',
    password: sendedPassword ? sendedPassword.toString(): 'GoodPassword123',
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <h1 className="text-3xl text-center font-bold mb-3">Login</h1>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <FormField label="Email" help="Please enter your email">
                <Field name="email" />
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField>
              <Divider />

              <Buttons>
                <Button type="submit" label="Login" color="info" />
                <Button type="button" label="Register" color="contrast" onClick={() => router.push('/register')} />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default LoginPage
