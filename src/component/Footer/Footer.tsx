import { GraduationCap } from 'lucide-react';

export default function Footer(){
   return(
      <>
             <div className="bg-black text-gray-500 flex flex-col items-center justify-center gap-4">
                    <div className="w-full flex flex-row justify-evenly items-center">
                          <div className='w-[300px]'>
                                <h1 className='text-white'> <GraduationCap/>CA Monk</h1>
                                <p>Enpoworing the next generation of financial leader with tools, community and knowledge</p>
                          </div>
                          <div className="hidden sm:flex flex-col justify-center items-start">
                            <h1 className='text-white'>Resource</h1>
                            <p>Blog</p>
                            <p>Webinar</p>
                            <p>Case Study</p>
                          </div>
                          <div className="hidden sm:flex flex-col justify-center items-start">
                            <h1 className='text-white'>Plateform</h1>
                            <p>Job Board</p>
                            <p>Practice Test</p>
                            <p>MentorShip</p>
                          </div>
                          <div className="hidden sm:flex flex-col justify-center items-start">
                            <h1 className='text-white'>Contect</h1>
                            <p>Linkdin</p>
                            <p>Twinter</p>
                            <p>Instagram</p>
                          </div>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-5">
                           <p>@2026 CA Monk All Right Reserved</p><p>Privacy Policy    Terms of Service </p>
                    </div>
             </div>
      </>
   )
}