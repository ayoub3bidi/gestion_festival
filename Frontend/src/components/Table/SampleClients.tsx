import { mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import axios from 'axios'
import { apiLink } from '../../config'

const TableSampleClients = ({isClient, isAddUser}) => {

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)
  const [client, setClient] = useState(null)
  const [clients, setClients] = useState([])

  const handleClients = async () => {
    try {
      const response = await axios.get(`${apiLink}/admin/user/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      for (let i = 0; i < response.data.length; i++) {
        const user = response.data[i]
        if (!user.is_admin) {
          setClients((prev) => [...prev, user])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleUsers = async () => {
    try {
      const response = await axios.get(`${apiLink}/admin/user/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      for (let i = 0; i < response.data.length; i++) {
        const user = response.data[i]
        setClients((prev) => [...prev, user])
      }
    } catch (error) {
      console.log(error)
    }
  }



  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = clients.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalTrashActive(false)
  }

  const token = localStorage.getItem('token')

  const handleDeleteClient = async () => {
    try {
      const response = await axios.delete(`${apiLink}/admin/user/${client.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.status === 204) {
        handleModalAction()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      if (isClient) {
        handleClients()
      } else {
        handleUsers()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddUser, isModalTrashActive])

  return (
    <>
      <CardBoxModal
        title="Delete a client"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleDeleteClient}
        onCancel={handleModalAction}
      >
        <p>
          Are you sure you want to delete this client?
        </p>
        <p>This action cannot be undone.</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Email</th>
            <th>Occupation</th>
            <th>Actions</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clientsPaginated.map((client) => (
            <tr key={client.id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar username={client.username} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td>
              <td data-label="Name">{client.username}</td>
              <td data-label="Email">{client.email}</td>
              <td data-label="job">{client.job}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => { setIsModalTrashActive(true); setClient(client) }}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSampleClients
