import {
  mdiAccountMultiple,
  mdiCashMultiple,
  mdiChartPie,
  mdiDoor,
  mdiMagicStaff,
  mdiReload,
  mdiTheater,
  mdiTicket,
} from '@mdi/js'
import Head from 'next/head'
import React, { useState } from 'react'
import type { ReactElement } from 'react'
import Button from '../components/Button'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBoxWidget from '../components/CardBox/Widget'
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
import CardBoxTransaction from '../components/CardBox/Transaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/CardBox/Client'
import CardBox from '../components/CardBox'
import { sampleChartData } from '../components/ChartLineSample/config'
import ChartBarSample from '../components/ChartBarSample'
import TableSampleClients from '../components/Table/SampleClients'
import { apiLink, getPageTitle } from '../config'
import axios from 'axios'
import { showsChart } from '../components/ChartBarSample/config'

const DashboardPage = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()

  const clientsListed = clients.slice(0, 4)
  const [users, setUsers] = useState([])
  const [rooms, setRooms] = useState([])
  const [showTypes, setShowTypes] = useState([])
  const [shows, setShows] = useState([])
  const [tickets, setTickets] = useState([])
  const [profit, setProfit] = useState(0)


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chartData, setChartData] = useState(sampleChartData())
  const [showsChartData, setShowsChartData] = useState(null);

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  const token = localStorage.getItem('token')

  const handleClients = async () => {
    try {
      const response = await axios.get(`${apiLink}/admin/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      const filteredClients = response.data.filter((user) => !user.is_admin)
  
      setUsers(filteredClients)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRooms = async () => {
    try {
      const response = await axios.get(`${apiLink}/room`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setRooms(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowTypes = async () => {
    try {
      const response = await axios.get(`${apiLink}/show-type`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setShowTypes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleShows = async () => {
    try {
      const response = await axios.get(`${apiLink}/show`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setShows(response.data)
      const chartData = showsChart(9, response.data);
      setShowsChartData(chartData);
    } catch (error) {
      console.log(error)
    }
  }

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
      setProfit(response.data.total_profit)
    } catch (error) {
      console.log(error)
    }
  }


  React.useEffect(() => {
    if (token) {
      handleClients()
      handleRooms()
      handleShowTypes()
      handleShows()
      handleTickets()
    }
  }, [])

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendColor="success"
            icon={mdiDoor}
            iconColor="contrast"
            number={rooms.length}
            label="Rooms"
          />
          <CardBoxWidget
            trendColor="success"
            icon={mdiMagicStaff}
            iconColor="info"
            number={showTypes.length}
            label="Show Types"
          />
          <CardBoxWidget
            trendColor="success"
            icon={mdiTheater}
            iconColor="danger"
            number={shows.length}
            label="Shows"
          />
          <CardBoxWidget
            trendColor="success"
            icon={mdiTicket}
            iconColor="warning"
            number={tickets.length}
            label="Tickets"
          />
          <CardBoxWidget
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={users.length}
            label="Clients"
          />
          <CardBoxWidget
            trendColor="danger"
            icon={mdiCashMultiple}
            iconColor="success"
            number={profit}
            numberPrefix="TND "
            label="Sales"
          />
        </div>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

        <CardBox hasTable>
          <TableSampleClients 
            isClient={true}
            isAddUser={false}
           />
        </CardBox>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col justify-between">
            {transactions.map((transaction: Transaction) => (
              <CardBoxTransaction key={transaction.id} transaction={transaction} />
            ))}
          </div>
          <div className="flex flex-col justify-between">
            {clientsListed.map((client: Client) => (
              <CardBoxClient key={client.id} client={client} />
            ))}
          </div>
        </div>

        <SectionTitleLineWithButton icon={mdiChartPie} title="Shows overview">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>
        <CardBox className="mb-6">
          {showsChartData && <ChartBarSample data={showsChartData} />}
        </CardBox>

      </SectionMain>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
