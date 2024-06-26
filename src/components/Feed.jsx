import { useState,useEffect } from "react"
import {useParams} from 'react-router-dom'

import {client} from "../client"
import {searchQuery,feedQuery} from "../utils/data"
import MasonryLayout from "./MasonryLayout.jsx"
import Spinner from "./Spinner.jsx"


const Feed = () => {
  const [loading,setLoading] =useState(false);
  const {categoryId} =useParams();
  const [pins,setPins]=useState(null);

  useEffect(()=>{
    setLoading(true);
    if(categoryId)
    {
      const query=searchQuery(categoryId);
      client.fetch(query)
        .then((data)=>{
          setPins(data)
          setLoading(false);
        });
    }
    else
    {
      client.fetch(feedQuery())
        .then((data)=>{
          setPins(data)
          setLoading(false)
        })
    }
  },[categoryId])

  if(loading)
  {
    return <Spinner message="We are expanding your feed !"/> 
  }

  if(!pins?.length)
  {
    return (
      <h2>No pins available</h2>
    )
  }


  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )

}

export default Feed
