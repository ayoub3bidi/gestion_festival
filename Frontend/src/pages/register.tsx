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

type RegisterForm = {
  username: string
  email: string
  job: string
  password: string
}

const jobsList = [
  'Teacher',
  'Student',
  'Doctor',
  'Engineer',
  'Programmer',
  'Designer',
  'Other',
]

const RegisterPage = () => {
  const router = useRouter()

  const handleSubmit = async (formValues: RegisterForm) => {
    try {
      await axios.post(`${apiLink}/user/register`, {
        username: formValues.username,
        email: formValues.email,
        job: formValues.job,
        password: formValues.password,
      });
      router.push({
        pathname: '/login',
        query: { email: formValues.email, password: formValues.password},
      })
    } catch (error) {
      console.log(error);
    }
  }

  const initialValues: RegisterForm = {
    username: 'hello',
    email: 'hello@gmail.com',
    job: jobsList[0],
    password: 'GoodPassword123',
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Register')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
        <h1 className="text-3xl text-center font-bold mb-3">Register</h1>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <FormField label="Username" help="Please enter your username">
                <Field name="username" />
              </FormField>

              <FormField label="Email" help="Please enter your email">
                <Field name="email" />
              </FormField>

              <FormField label="Job" help="Please enter your job">
                <Field name="job" as="select">
                  {jobsList.map((job) => (
                    <option key={job} value={job}>
                      {job}
                    </option>
                  ))}
                </Field>
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField>
              <Divider />

              <Buttons>
                <Button type="submit" label="register" color="info" />
                <Button type="button" label="go back login" color="contrast" onClick={() => router.push('/login')} />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default RegisterPage
