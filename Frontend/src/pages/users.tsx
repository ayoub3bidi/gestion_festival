import { mdiAccount, mdiPlus } from '@mdi/js'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/SampleClients'
import { apiLink, getPageTitle } from '../config'
import LayoutAuthenticated from '../layouts/Authenticated'
import CardBoxModal from '../components/CardBox/Modal'
import axios from 'axios'

const UsersPage = () => {
  const token = localStorage.getItem('token')
  const [isCreateUserModalActive, setIsCreateUserModalActive] = useState(false)

  const jobsList = [
    'Teacher',
    'Student',
    'Doctor',
    'Engineer',
    'Programmer',
    'Designer',
    'Other',
  ]

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [job, setJob] = useState(jobsList[0])
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const handleModalAction = () => {
    setIsCreateUserModalActive(!isCreateUserModalActive)
  }

  const handleCreateUser = async () => {
    const body = {
      username: username,
      email: email,
      job: job,
      password: password,
      isAdmin: isAdmin,
    }
    const response = await axios.post(`${apiLink}/admin/user/register`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.status === 201) {
      setIsCreateUserModalActive(false)
    }
  }

  return (
    <>
      <CardBoxModal
          title="Add a new User"
          buttonColor="info"
          buttonLabel="Confirm"
          isActive={isCreateUserModalActive}
          onConfirm={handleCreateUser}
          onCancel={handleModalAction}
        >
          <form>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job</label>
              <select 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setJob(e.target.value)}
                >
                  {
                    jobsList.map((job) => (
                      <option key={job} value={job}>
                        {job}
                      </option>
                    ))
                  }
              </select>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" onChange={(e) => setIsAdmin(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</span>
            </label>
          </form>
        </CardBoxModal>
      <Head>
        <title>{getPageTitle('Users')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="Users" main>
          <Button
            onClick={handleModalAction}
            target="_blank"
            icon={mdiPlus}
            label="Add a new user"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableSampleClients 
            isClient={false}
            isAddUser={isCreateUserModalActive}
          />
        </CardBox>

      </SectionMain>
    </>
  )
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default UsersPage
