import React from 'react'

function Experiance() {
  const experianceArray=[
    {
      id:1,
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwikJxeh-w01rf23z-dMoVcE7xks71VljdTVAWjVMAL-HXD3oQPeiPNg&s",
      name:"C++"
    },
    {
      id:2,
      imageUrl:"https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png",
      name:"MongoDb"
    },
    {
      id:3,
      imageUrl:"https://cdn.worldvectorlogo.com/logos/css-3.svg",
      name:"CSS-3"
    },
    {
      id:4,
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s",
      name:"Tailwind CSS"
    },
    {
      id:5,
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSTVjZgtLF2vqZV3Nh6VdLV5HEZ3xOyVCRuw&s",
      name:"HTML-5"
    },
    {
      id:6,
      imageUrl:"https://cdn.worldvectorlogo.com/logos/react-1.svg",
      name:"ReactJs"
    },
    {
      id:7,
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGuBa5DX9QoDb6M4oP3bYIsciHpxYZZGnlejOaOqgiAyKwPjiMUIRwIK4&s",
      name:"SQL"
    },
    {
      id:8,
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0G5fsXtmTlJGJ_FZKNWqFB5GENp886spBT4v2voYGXcnxF6-2ex48gqQ&s",
      name:"No-SQL"
    },
  ]
  return (
    <div name="Experience" className='p-4 border border-b-green-600 mb-4'>
       <h1 className="text-xl font-bold my-2">Experiance</h1>
       <div>
         <p className="text-xl md:text-lg font-semibold">I've more then 1 years of experiance in bleow technologies.</p>
         <div className="w-full flex justify-evenly items-center flex-wrap gap-4 p-4">
            {
              experianceArray.map((item,index)=>( 
                <div key={item.id} className=''>
                  <div className='md:max-w-[250px] grid justify-center shadow shadow-green-600 p-4 md:rounded-md rounded-t-3xl rounded-b-3xl'>
                    <img src={item.imageUrl} alt={item.name} className='md:w-[300px] md:h-[200px] w-64 h-52' /> 
                    <p className='text-lg font-bold text-center text-slate-400 p-2'>{item.name}</p>   
                  </div>
                </div>
              ))
            }
         </div>
       </div>
    </div>
  )
}

export default Experiance