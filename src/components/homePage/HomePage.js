"use client";

import AboutBanner from "../home/abuotBanner/abuotBanner";
import BannerOne from "../home/Banner/bannerOne";
import BannerCollectionOne from "../home/bannerCollection/bannerCollection";
import BlogHome from "../home/Blog/Blog";

import CollactionSize from "../home/collectionSize/collactionSize";
import Community from "../home/community/community";
import Feature from "../home/Feature/Feature";
import ProductsHome from "../home/productsHome/productsHome";


// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

const HomePage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const role = localStorage.getItem('role');

  //   console.log('Token:', token);
  //   console.log('Role:', role);

  //   if (!token || role !== 'USER') {
  //     router.push('/auth/login');
  //   }
  // }, []);

  return (
    <>
      <div >
        <BannerOne/>
        <AboutBanner/>
      </div>
      <ProductsHome/>
      <Feature/>
      <CollactionSize />
      <BannerCollectionOne/>
      <BlogHome/>
      <Community/>

    </>
  );
};

export default HomePage;
