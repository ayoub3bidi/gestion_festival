import {
  mdiBookEdit,
  mdiMinus,
  mdiPlus,
  mdiTicket
} from '@mdi/js'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React, { useState } from 'react'
import SectionMain from '../components/Section/Main'
import LayoutAuthenticated from '../layouts/Authenticated'
import axios from 'axios'
import { apiLink, getPageTitle } from '../config'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import Button from '../components/Button'
import CardBoxWidget from '../components/CardBox/Widget'

const TicketsPage = () => {
  const [tickets, setTickets] = useState([])

  const token = localStorage.getItem('token')

  const handleTickets = async () => {
    try {
      const response = await axios.get(`${apiLink}/admin/ticket`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setTickets(response.data.tickets)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddModalAction = async () => {}
  const handleDeleteModalAction = async () => {}
  const handleEditModalAction = async () => {}


  React.useEffect(() => {
    if (token) {
      handleTickets()
    }
  }, [])

  return (
    <>
      <Head>
        <title>{getPageTitle('Tickets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTicket} title="Tickets" main>
          <Button
            onClick={handleAddModalAction}
            target="_blank"
            icon={mdiPlus}
            label="Add a new ticket"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <CardBoxWidget
                trendColor='success'
                icon={mdiTicket}
                iconColor='success'
                number={ticket.price}
                label={ticket.id}
              />
              <div className="mt-3 text-center">
                <Button
                  onClick={handleEditModalAction}
                  target="_blank"
                  icon={mdiBookEdit}
                  label="Edit Ticket"
                  color="info"
                  small
                />
                <span className="mr-5"></span>
                <Button
                  onClick={handleDeleteModalAction}
                  target="_blank"
                  icon={mdiMinus}
                  label="Delete Ticket"
                  color="danger"
                  small
                />
              </div>
            </div>
          ))}
        </div>
      </SectionMain>
    </>
  )
}

TicketsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TicketsPage
