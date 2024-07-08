function Board_Main() {
  return (
    <div className=" w-full h-[720px]">
      <div className="grid grid-cols-3 mt-4">
        <div className="header-item text-white py-2 text-center bg-black bg-opacity-20 font-bold text-3xl">Runda 1</div>
        <div className="header-item text-white py-2 text-center bg-black bg-opacity-30 font-bold text-3xl">Runda 2</div>
        <div className="header-item text-white py-2 text-center bg-black bg-opacity-20 font-bold text-3xl">Runda 3</div>
      </div>
      <div className="grid grid-cols-3 h-[670px] ">
        <div className="content-item text-white p-2 text-center bg-black bg-opacity-10 overflow-y-auto">
          <div className="h-[170px] bg-red-500">
            <ul className="font-normal text-4xl">
              <li>Chlost M.</li>
              <li>Chlost M.</li>
            </ul>
          </div>
          <div className="h-[170px]">
            <ul className="font-normal text-4xl">
              <li>Chlost M.</li>
              <li>Chlost M.</li>
            </ul>
          </div>
          <div className="h-[170px] bg-red-500">
            <ul className="font-normal text-4xl">
              <li>Chlost M.</li>
              <li>Chlost M.</li>
            </ul>
          </div>
          <div className="h-[170px]">
            <ul className="font-normal text-4xl">
              <li>Chlost M.</li>
              <li>Chlost M.</li>
            </ul>
          </div>
          <div className="h-[170px] bg-red-500">
            <ul className="font-normal text-4xl">
              <li>Chlost M.</li>
              <li>Chlost M.</li>
            </ul>
          </div>
        </div >
        <div className="content-item text-white p-2 text-center bg-black bg-opacity-20">
        <div className="h-[170px]">
            <ul className="font-normal text-4xl">
              <li>Chlost M.</li>
              <li>Chlost M.</li>
            </ul>
          </div>
          <div className="h-[170px]">
            <ul className="font-normal text-4xl">
              <li>Chlost M.</li>
              <li>Chlost M.</li>
            </ul>
          </div>
        </div>
        <div className="content-item text-white p-2 text-center bg-black bg-opacity-10">
        <div className="h-[170px]">
            <ul className="font-normal text-4xl">
              <li>Chlost M.</li>
              <li>Chlost M.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board_Main