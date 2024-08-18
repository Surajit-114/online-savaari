
import { SI, TotalPriceList } from '@/types/flight';
import { type FC } from 'react'
import FlightCard from './FlightCard';

interface Props {
  sI: SI[];
  totalPriceList:TotalPriceList[];
}

const FlightOverview: FC<Props> = ({sI, totalPriceList}) => {
  return (
    <div>
      {
        sI.map((item)=>(
          <FlightCard sI={item} key={item.id}/>
        ))
      }
     
    </div>
  )
}

export default FlightOverview;