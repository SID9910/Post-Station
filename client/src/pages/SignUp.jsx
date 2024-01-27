import { Link ,useNavigate } from "react-router-dom";
import { Label,Button, TextInput, Alert, Spinner } from "flowbite-react";
import { useState } from "react";

export default function SignUp() {
  
   const [formData , setformData] = useState({});
    const[errorMessage , setErrorMessage] = useState(null);
    const [loading ,setLoading] =useState(false);

const navigate =useNavigate();
    // trip is used to remove space before input
  const handleChange =(e)=>{
    setformData({...formData , [e.target.id]: e.target.value.trim()});
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all the fields');
    }
    try {
         setLoading(true);
         setErrorMessage(null);
      // Check if formData is correctly populated

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
   
      
      const data = await res.json();
      if(data.success ===false){
        return setErrorMessage(data.message);
      }
     setLoading(false);
     
     if(res.ok){
      navigate('/sign-in');
     }
      
    } catch (error) {
      setErrorMessage(error.message); // Log any errors
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen mt-20">
     <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5" >
   {/* left */}

    <div  className=" flex-1">

    <Link to="/" className=' font-bold dark:text-white text-4xl'>

<span className='px-2 py-1 bg-gradient-to-r from-red-600 via-indigo-500 rounded '>Photo</span>Station
</Link>

<p className="text-sm mt-5">
 You can Sign up with your Email and Password Or with Google here ...

</p>
    </div>
     {/* right */}

     <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div><Button type="submit" gradientDuoTone='purpleToBlue' disabled={loading}>

{
  loading ?(
    <>
    <Spinner size='sm' />
    <span className="pl-3">Loading...</span>
    </>
  ):'Sign Up'
}

            </Button>
  </form>

  <div className="flex gap-2 text-sm mt-5">
    <span>Have an account?</span>
    <Link to='/sign-in' className="text-blue-500" >Sign In</Link>
  </div>

{
  errorMessage && (
    <Alert className="mt-5" color='failure'>{errorMessage}</Alert>
    )
}
    </div>
     </div>


    </div>
  )
}
