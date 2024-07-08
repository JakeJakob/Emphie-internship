import React from 'react';

interface TitleProps {
  content: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ content }) => {
  
  return (
    <div className="h-frame48-height w-screen ">
        <div className="flex items-center h-frame32-height w-screen " >
            {content}
            <div className="mr-4 border-l border-white h-82.82"></div>
            <p className="font-sans text-white font-normal text-6xl"> | Międzynarodowy Testowy Turniej Szachowy</p>
        </div>
        <hr className="text-white w-hr-width border-2 mt-3"/>
    </div>
  )
}

export default Title