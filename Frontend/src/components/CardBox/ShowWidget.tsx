import React from 'react'
import { ColorKey, TrendType } from '../../interfaces'
import CardBox from '.'
import PillTag from '../PillTag'
import Divider from '../Divider'

type Props = {
  icon: string
  iconColor: ColorKey
  trendType?: TrendType
  show_type: string
  trendColor?: ColorKey
  name: string
  date: string
  time: string
  duration: number
  room_name: string
  available_seats: number
  reserved_seats: number
  price_normal: number
  price_reduced: number
  price_collective: number
  is_available: boolean
  is_exceptional: boolean
}

const ShowCardBoxWidget = (props: Props) => {
  return (
    <CardBox>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl text-bold text-center mb-3">{props.name}</h3>
          <Divider/>
          <h3 className="text-lg leading-tight mb-3">At <span className='font-semibold'>{props.date} {props.time}</span> For <span className='font-semibold'>{props.duration}</span> min</h3>
          <Divider/>
          <h3 className="text-xl leading-tight mb-3">{props.room_name}</h3>
          <Divider/>
          <h3 className="text-lg leading-tight mb-3 "><span className="text-3xl font-semibold">{props.available_seats}</span> <span className="text-gray-500 dark:text-slate-400"></span> seats available</h3>
          <h3 className="text-lg leading-tight mb-3 "><span className="text-3xl font-semibold">{props.reserved_seats}</span> seats reserved</h3>
          <Divider/>
          <h3 className="text-lg leading-tight mb-3">Normal price: {props.price_normal} TND</h3>
          <h3 className="text-lg leading-tight mb-3">Reduced price: {props.price_reduced} TND</h3>
          <h3 className="text-lg leading-tight mb-3">Collective price: {props.price_collective} TND</h3>
          <Divider/>
          <div className="mb-3">
            <PillTag
              label={props.show_type}
              color="info"
              small
            />
          </div>
          <div className="flex items-center justify-between mb-3">
            <PillTag
              label={props.is_available ? 'Available' : 'Not available'}
              color={props.is_available ? 'success' : 'warning'}
              small
            />
          </div>
          <div className="flex items-center justify-between mb-3">
            <PillTag
              label={props.is_exceptional ? 'Exceptional' : 'Not exceptional'}
              color={props.is_exceptional ? 'success' : 'warning'}
              small
            />
          </div>
        </div>
      </div>
    </CardBox>
  )
}

export default ShowCardBoxWidget
