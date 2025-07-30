import React from 'react';
import Link from 'next/link';

const MainForm = () => {
  return (
    <>
    <main className="m-15 mt-5 flex flex-col">
    <p className="h-[15rem] w-full mt-10 mb-30 bg-lime-50">여기가 배너이미지~~</p>
 
    {/* 필터와 제품 리스트를 가로로 배치 */}
    <div className='flex flex-row gap-10'>
      {/* 필터 */}
      <div className='ml-10 w-[10rem]'>
        <h2 className='text-2xl font-bold mb-5'>BEST</h2>
        <nav className='flex flex-col gap-5'>
        <Link href="/beauty" className='hover:text-yellow-500 transition-colors'>beauty</Link>
        <Link href='/food' className='hover:text-yellow-500 transition-colors'>food</Link>
        <Link href='/living' className='hover:text-yellow-500 transition-colors'>living</Link>
        <Link href='/pet' className='hover:text-yellow-500 transition-colors'>pet</Link>
        </nav>
      </div>

      {/* 상품 리스트 */}
      <div className='flex-1 px-8'>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-6'>
          <div className='bg-yellow-50  h-[20rem]'>1번 제품 카드</div>
          <div className='bg-yellow-50  h-[20rem]'>2번 제품 카드</div>
          <div className='bg-yellow-50  h-[20rem]'>3번 제품 카드</div>
          <div className='bg-yellow-50  h-[20rem]'>4번 제품 카드</div>
          <div className='bg-yellow-50  h-[20rem]'>5번 제품 카드</div>
          <div className='bg-yellow-50  h-[20rem]'>6번 제품 카드</div>
        </div>
      </div>
    </div>
    </main>
    </>
  );
};

export default MainForm;