import { Badge } from "./badge"
export const Pending = () =>{
  return(
    <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 rounded" variant='ghost'>Pending</Badge>
  )
}
export const Rejected = () =>{
  return(
    <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 rounded" variant='ghost'>Rejected</Badge>
  )
}
export const Accepted = () =>{
  return(
    <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 rounded" variant='ghost'>Accepted</Badge>
  )
}

export const StatusBadge = ({status}) =>{
  switch(status){
    case "accepted":
      return <Accepted/>;

    case "rejected":
      return <Rejected/>;

    case "pending":
      return <Pending/>;  
  }
}