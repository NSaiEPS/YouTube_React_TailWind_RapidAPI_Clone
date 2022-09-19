import React, { useState } from 'react'

const Signup = () => {
    const [input, setInput] = useState({
        name:'',
        email:'',
        password:'',
        type:'signUp'
      })
        let handleFormSubmit=(e)=>{
        e.preventDefault()
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
z-[1]


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
lg:w-[65%]
flex

'
>
{/* xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px", */}

  <form
  className='flex
  flex-col
  w-[75%]
  m-auto
 
  sm:w-[55%]
 
  '
  onSubmit={handleFormSubmit}
  >
    {input.type==='signUp' &&
    <input 
    placeholder='Enter your name'
    className='mt-[5px]
    p-[7px]
    
    '
    onChange={handleChane}
    name='name'
    value={input.name}
    />
  }
<input 
    placeholder='Enter your email'
    type='email'
    className='mt-[5px]
    p-[7px]
    
    '
    onChange={handleChane}
    name='email'
    value={input.email}

    />

<input 
    placeholder='Enter your password'
    type='password'
    className='mt-[5px]
    p-[7px]
    '
    onChange={handleChane}
    name='password'
    value={input.password}

    />
    <button
    type='submit'
    className='border
    mt-[5px]
  p-[3px]

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
  p-[3px]
  '
  >  {input.type!=='signUp' ?
        
        'SignUp':'Login'}</button>
  </form>
  
  </div>

  </div>
    
  )
}

export default Signup