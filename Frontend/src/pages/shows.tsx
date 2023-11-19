import {
  mdiBookEdit,
  mdiMinus,
  mdiPlus,
  mdiTheater
} from '@mdi/js'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React, { useState } from 'react'
import SectionMain from '../components/Section/Main'
import LayoutAuthenticated from '../layouts/Authenticated'
import axios from 'axios'
import { apiLink, getPageTitle } from '../config'
import ShowCardBoxWidget from '../components/CardBox/ShowWidget'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import Button from '../components/Button'

const ShowsPage = () => {
  const [shows, setShows] = useState([])

  const token = localStorage.getItem('token')

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
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddModalAction = async () => {}
  const handleDeleteModalAction = async () => {}
  const handleEditModalAction = async () => {}


  React.useEffect(() => {
    if (token) {
      handleShows()
    }
  }, [])

  return (
    <>
      <Head>
        <title>{getPageTitle('Shows')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTheater} title="Shows" main>
          <Button
            onClick={handleAddModalAction}
            target="_blank"
            icon={mdiPlus}
            label="Add a new Show"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          {shows.map((show) => (
            <div key={show.id}>
              <ShowCardBoxWidget
                icon={mdiTheater}
                iconColor="danger"
                trendType="up"
                trendColor="danger"
                show_type={show.show_type}
                name={show.name}
                date={show.date}
                time={show.time}
                duration={show.duration}
                room_name={show.room_name}
                available_seats={show.available_seats}
                reserved_seats={show.reserved_seats}
                price_normal={show.price_normal}
                price_reduced={show.price_reduced}
                price_collective={show.price_collective}
                is_available={show.is_available}
                is_exceptional={show.is_exceptional}
              />
              <div className="mt-3 text-center">
                <Button
                  onClick={handleEditModalAction}
                  target="_blank"
                  icon={mdiBookEdit}
                  label="Edit Show"
                  color="info"
                  small
                />
                <span className="mr-5"></span>
                <Button
                  onClick={handleDeleteModalAction}
                  target="_blank"
                  icon={mdiMinus}
                  label="Delete Show"
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

ShowsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ShowsPage
