import { mdiMagicStaff, mdiPlus } from '@mdi/js'
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
import ShowTypesTable from '../components/Table/ShowTypesTable'

const ShowTypesPage = () => {
  const token = localStorage.getItem('token')
  const [isCreateModalActive, setIsCreateModalActive] = useState(false)
  const [name, setName] = useState('')

  const handleModalAction = () => {
    setIsCreateModalActive(!isCreateModalActive)
  }

  const handleCreate = async () => {
    const body = {
      name: name,
    }
    const response = await axios.post(`${apiLink}/admin/show-type/register`,
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
          </form>
        </CardBoxModal>
      <Head>
        <title>{getPageTitle('Show Types')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiMagicStaff} title="Show Types" main>
          <Button
            onClick={handleModalAction}
            target="_blank"
            icon={mdiPlus}
            label="Add a new Show Type"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <ShowTypesTable
            isAddIem={isCreateModalActive}
          />
        </CardBox>

      </SectionMain>
    </>
  )
}

ShowTypesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ShowTypesPage
