import Error from "@/assets/Error 404.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const NotFound = () => {
  const { user } = useSelector((store) => store.auth);
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
    <img src={Error} alt="404 Error" className="w-90 md:w-120 lg:w-130" />
    <Button><Link to="/">Go Back Home</Link></Button>
  </div>
  )
};

export default NotFound;
