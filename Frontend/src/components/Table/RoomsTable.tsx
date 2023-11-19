import { mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import axios from 'axios'
import { apiLink } from '../../config'

const RoomsTable = ({isAddIem}) => {
  const token = localStorage.getItem('token')
  const perPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const [item, setItem] = useState(null)
  const [items, setItems] = useState([])
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [isModalEditActive, setIsModalEditActive] = useState(false)

  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState(0) 

  const handleItems = async () => {
    try {
      const response = await axios.get(`${apiLink}/room`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }  

  const itemsPaginated = items.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = items.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const handleModalAction = () => {
    setIsModalTrashActive(false)
  }

  const handleDeleteItem = async () => {
    try {
      const response = await axios.delete(`${apiLink}/admin/room/${item.id}`,
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

  const handleUpdateItem = async () => {
    try {
      const body = {
        name: name,
        capacity: capacity,
      }
      const response = await axios.patch(`${apiLink}/admin/room/${item.id}`,
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

  // const setItemData = (item) => {
  //   setName(item.name)
  //   setCapacity(item.capacity)
  // }

  useEffect(() => {
    if (token) {
      handleItems()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddIem, isModalTrashActive, isModalEditActive])

  return (
    <>
    <CardBoxModal
      title="Update User"
      buttonColor="success"
      buttonLabel="Confirm"
      isActive={isModalEditActive}
      onConfirm={handleUpdateItem}
      onCancel={() => setIsModalEditActive(false)}
    >
      <form>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
          <input type="number" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            required 
          />
        </div>
      </form>
    </CardBoxModal>
      <CardBoxModal
        title="Delete a client"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleDeleteItem}
        onCancel={handleModalAction}
      >
        <p>
          Are you sure you want to delete this item?
        </p>
        <p>This action cannot be undone.</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Actions</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {itemsPaginated.map((item) => (
            <tr key={item.id}>
              <td data-label="Name">{item.name}</td>
              <td data-label="Capcity">{item.capacity}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  {/* <Button
                    color='info'
                    icon={mdiPencil}
                    onClick={() => { setIsModalEditActive(true); setItem(item); setItemData(item)}}
                    small
                  /> */}
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => { setIsModalTrashActive(true); setItem(item) }}
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

export default RoomsTable
