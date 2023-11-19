import { mdiDoor, mdiPlus } from '@mdi/js'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import { apiLink, getPageTitle } from '../config'
import LayoutAuthenticated from '../layouts/Authenticated'
import CardBoxModal from '../components/CardBox/Modal'
import axios from 'axios'
import RoomsTable from '../components/Table/RoomsTable'

const RoomsPage = () => {
  const token = localStorage.getItem('token')
  const [isCreateModalActive, setIsCreateModalActive] = useState(false)
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState(0)

  const handleModalAction = () => {
    setIsCreateModalActive(!isCreateModalActive)
  }

  const handleCreate = async () => {
    const body = {
      name: name,
      capacity: capacity,
    }
    const response = await axios.post(`${apiLink}/admin/room/register`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.status === 201) {
      setIsCreateModalActive(false)
    }
  }

  return (
    <>
      <CardBoxModal
          title="Add a new Room"
          buttonColor="info"
          buttonLabel="Confirm"
          isActive={isCreateModalActive}
          onConfirm={handleCreate}
          onCancel={handleModalAction}
        >
          <form>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
              <input type="number" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder='Capacity'
                onChange={(e) => setCapacity(Number(e.target.value))}
                required 
              />
            </div>
          </form>
        </CardBoxModal>
      <Head>
        <title>{getPageTitle('Rooms')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiDoor} title="Rooms" main>
          <Button
            onClick={handleModalAction}
            target="_blank"
            icon={mdiPlus}
            label="Add a new Room"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <RoomsTable 
            isAddIem={isCreateModalActive}
          />
        </CardBox>

      </SectionMain>
    </>
  )
}

RoomsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default RoomsPage
