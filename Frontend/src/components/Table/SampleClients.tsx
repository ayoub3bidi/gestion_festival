import { mdiPencil, mdiTrashCan } from '@mdi/js'
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
      const response = await axios.get(`${apiLink}/admin/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      const filteredClients = response.data.filter((user) => !user.is_admin)
  
      setClients(filteredClients)
    } catch (error) {
      console.log(error)
    }
  }  

  const handleUsers = async () => {
    try {
      const response = await axios.get(`${apiLink}/admin/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      const users = response.data.map((user) => user)
      setClients(users)
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
  const [isModalEditActive, setIsModalEditActive] = useState(false)

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
  const [isAdmin, setIsAdmin] = useState(false)

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

  const handleUpdateUser = async () => {
    console.log(client.id)
    try {
      const body = {
        username: username,
        email: email,
        job: job,
        isAdmin: isAdmin,
      }
      console.log(body)
      const response = await axios.patch(`${apiLink}/admin/user/${client.id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.status === 200) {
        setIsModalEditActive(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setClientData = (client) => {
    setUsername(client.username)
    setEmail(client.email)
    client.job == null ? setJob(jobsList[6]) : setJob(client.job)
    setIsAdmin(client.is_admin)
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
  }, [isAddUser, isModalTrashActive, isModalEditActive])

  return (
    <>
    <CardBoxModal
      title="Update User"
      buttonColor="success"
      buttonLabel="Confirm"
      isActive={isModalEditActive}
      onConfirm={handleUpdateUser}
      onCancel={() => setIsModalEditActive(false)}
    >
      <form>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job</label>
          <select 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setJob(e.target.value)}
            value={job}
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
        <label className="relative inline-flex items-center mb-5 cursor-pointer">
          <input type="checkbox" checked={isAdmin} className="sr-only peer" onChange={(e) => setIsAdmin(e.target.checked)} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</span>
        </label>
      </form>
    </CardBoxModal>
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
                    color='info'
                    icon={mdiPencil}
                    onClick={() => { setIsModalEditActive(true); setClient(client); setClientData(client)}}
                    small
                  />
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
