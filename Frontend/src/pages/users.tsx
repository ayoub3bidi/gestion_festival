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

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [job, setJob] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const jobsList = [
    'Teacher',
    'Student',
    'Doctor',
    'Engineer',
    'Programmer',
    'Designer',
    'Other',
  ]

  const handleModalAction = () => {
    setIsCreateUserModalActive(!isCreateUserModalActive)
  }

  const handleCreateUser = async () => {
    const response = await axios.post(`${apiLink}/admin/user/register`,
      {
        username,
        email,
        job,
        password,
        isAdmin,
      },
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
          <div>
            <input
              className="input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br/> <br/>
            <input
              className="input"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br/> <br/>
            <select
              className="input"
              onChange={(e) => setJob(e.target.value)}
            >
              {jobsList.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
            <br/> <br/>
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br/> <br/>
            <h5>Is Admin</h5>
            <input
              className="input"
              type="checkbox"
              placeholder="isAdmin"
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
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
