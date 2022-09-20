import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { auth, db } from '../Firebase';
import { updateProfile } from 'firebase/auth';


const Signup = () => {
    const [input, setInput] = useState({
        name:'',
        email:'',
        password:'',
        type:'signUp',
        showPassword:false
      })
    

      let handleFormSubmit=(e)=>{
        e.preventDefault()
        // alert(`submitted the ${input.name}  ${input.email} `)
        if(input.type==='signUp'){
        auth.createUserWithEmailAndPassword(input.email,input.password).then((userAuth)=>{
            userAuth.user.updateProfile({
              displayName:input.name,
              
            })
            setInput({
                ...input,
                name:'',
                email:'',
                password:''
    
            })

            db.collection('users').add({
                name:(input.name),
                email:(input.email)
            })


        
        })
         .catch(error=>alert(error))
         
        }
    

        else {
            auth.signInWithEmailAndPassword(input.email,input.password).then (userAuth=>{
                
                setInput({
                    ...input,
                    name:'',
                    email:'',
                    password:''
        
                })
              })
         .catch(error=>alert(error))
            
        }
    }

    
    let handleChane=(e)=>{
            let nam=e.target.name
            let val=e.target.value
            setInput({
                ...input,
                [nam]:val
            })
        }

    
        let handleSigninChange=()=>{
            if(input.type==='signUp'){
                setInput({
                    ...input,
                    type:'login'
                })
            }
            else {
                setInput({
                    ...input,
                    type:'signUp'
                })
            }
        }
  return (
   
<div
className='

bg-primaryBlackOpcity
w-[100%]
h-[100vh]
fixed
top-[0px]
z-[3]


flex
'
>

<div
className='
w-[85%]
m-auto
bg-primaryBlue
rounded-[15px]
h-[350px]
ss:w-[60%]
sm:w-[75%]
lg:w-[55%]
flex
flex-col

'
>
{/* xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px", */}

      <h1
      className='
      m-auto
      text-white
      '
      >Please {input.type==='signUp' ?
        
        <span>'SignUp'</span>: 
        <span>
        'Login'
        </span>
        } to proceed further</h1>

  <form
  className='flex
  flex-col
  w-[75%]
  m-auto
  pb-[20px]
 
  sm:w-[55%]
 
  '
  onSubmit={handleFormSubmit}
  >
    {input.type==='signUp' &&
    <input 
    placeholder='Enter your name'
    className='mt-[5px]
    p-[10px]

    outline-none
    
    '
    required

    onChange={handleChane}
    name='name'
    value={input.name}
    />
  }
<input 
    placeholder='Enter your email'
    type='email'
    className='mt-[5px]
    p-[10px]

    outline-none

    
    '
    required

    onChange={handleChane}
    name='email'
    value={input.email}

    />
<div
className='relative'
>
<input 
    placeholder='Enter your password'
    type={
        input.showPassword ? 'text':'password'
    }
    className='mt-[5px]
    p-[10px]
    outline-none
    w-[100%]

    '
    required
    onChange={handleChane}
    name='password'
    value={input.password}

    />

    {input.password &&
    
    <span
    className='absolute
    top-[12px]
    right-[7px]
    cursor-pointer
    '
    >
        {input.showPassword ?
    <VisibilityOffIcon
    onClick={
        ()=>{
            let paswordCondition=input.showPassword
            setInput({
                ...input,
                showPassword:!paswordCondition
            })
        }
    }
    />:
    
<VisibilityIcon
    onClick={
        ()=>{
            let paswordCondition=input.showPassword
            setInput({
                ...input,
                showPassword:!paswordCondition
            })
        }
    }
/>


        }
    </span>
}
    </div>
    <button
    type='submit'
    className='border
    mt-[5px]
  p-[5px]
  bg-secondary
  hover:bg-primaryRed
  duration-1000
  hover:text-white



    '
    >
        {input.type==='signUp' ?
        
        'SignUp':'Login'}
        
        </button> 
        <span
        className='m-auto
        text-white
        '
        >or 
        {input.type==='signUp' ?
        ' alredy ':
        ' not yet '} Registered!</span> 
        <button
  onClick={handleSigninChange}

  className='border
  mt-[5px]
  p-[5px]
  bg-pink
  hover:bg-primaryRed
  hover:text-white
  duration-1000

  '
  type='button'
  >  {input.type!=='signUp' ?
        
        'SignUp':'Login'}</button>
  </form>
  
  </div>

  </div>
    
  )
}

export default Signup