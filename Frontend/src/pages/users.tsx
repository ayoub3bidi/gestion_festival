import { mdiAccount, mdiPlus } from '@mdi/js'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'
import LayoutAuthenticated from '../layouts/Authenticated'

const UsersPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Users')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="Users" main>
          <Button
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
