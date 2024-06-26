import sharevideo from '../assets/share.mp4';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/logowhite.png';
import { GoogleLogin } from '@react-oauth/google';
import { client } from '../client';
import {jwtDecode} from 'jwt-decode';

const Login = () => {

  const navigate =useNavigate();

  const responseGoogle = (response) => {
    const decoded=jwtDecode(response.credential);
    // console.log(decoded);
    const profileObj = {
      googleId: decoded.sub,
      imageUrl: decoded.picture,
      email: decoded.email,
      name: decoded.name,
    };

    localStorage.setItem('user',JSON.stringify(profileObj));
    
    const {name,googleId,imageUrl} =profileObj;
    const doc = {
      _id:googleId,
      _type:'user',
      userName:name,
      image:imageUrl
    }

    client.createIfNotExists(doc).then(
      ()=>{
        navigate('/',{replace:true});
      }
    )
  }
  
  return (
    <div className='flex justify-start items-center flex-col h-screen w-screen'>
      <div className='relative w-full h-full'>
        <video
          className='w-full h-full object-cover'
          src={sharevideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
        <div className='absolute flex flex-col justify-center items-center left-0 bottom-0 right-0 top-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} alt="logo" width="130px" />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin 
              clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-4'/>
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}           
              onFailure={responseGoogle} 
              cookiePolicy="single_host_origin"          
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
