"use client";
import { Container } from '@/components';
import useFlightSearch from '@/hooks/useFlightSearch';
import { type FC } from 'react'
import FlightOverview from './FlightOverview';

interface Props {

}

const SearchResult: FC<Props> = ({}) => {
  const {searchResult} = useFlightSearch();
  console.log(searchResult)
  return (
    <Container className='my-4'>
      {
        searchResult.map((item,index) => (
          <FlightOverview sI={item.sI} totalPriceList={item.totalPriceList} key={`SearchResult${index}`}/>
        ))
      }
    </Container>
  )
}

export default SearchResult;