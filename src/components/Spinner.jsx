/* eslint-disable react/prop-types */
import {InfinitySpin} from "react-loader-spinner"

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <InfinitySpin
        color="#00BFFF" 
        width={200}
        className="m-5"
      />
      
      <p className='text-lg text-center px-2'>
        {message}
      </p>
      
    </div>
  )
}

export default Spinner
