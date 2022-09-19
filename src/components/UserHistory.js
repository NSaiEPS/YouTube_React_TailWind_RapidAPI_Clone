import React from 'react'
import { useParams } from 'react-router-dom'

const UserHistory = () => {
    let {id}=useParams()

  return (
    <div>{id}</div>
  )
}

export default UserHistory