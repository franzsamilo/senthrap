import React from 'react'
import { useRouter } from 'next/router';

function Index() {

  const router = useRouter();


  function goToHome() {
    router.push('/screens/Home/Home');
  }
  return (
    <div>
      <button className='px-10 py-2 rounded-full font-semibold hover:text-main' onClick={goToHome}>
        Home
      </button>
    </div>
  )
}

export default Index
