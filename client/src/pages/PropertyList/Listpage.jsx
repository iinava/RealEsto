import React, { Suspense } from "react";
import Filtercomponet from "../../components/Filter/Filter";
import { CardFour } from "../../components/Card/Card";
import CustomMap from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import ListSkelton from "../../components/Skeltons/ListSkelton";

export default function Listpage() {
  // const data = listData
  const data = useLoaderData();
  console.log(data, "loaded  data");
  return (
    <div className="flex h-[88vh] justify-around gap-1 sm:px-10 px-2 ">
      <div className="flex-3 h-[85vh]">
        <div className="h-[88vh] flex flex-col overflow-y-scroll custom-scrollbar pb-[50px] gap-6">
          <Filtercomponet />
          <Suspense
            fallback={
             <ListSkelton/>
            }
          >
            <Await
              resolve={data.PostResponse}
              errorElement={<p>Error loading posts !</p>}
            >
              {(PostResponse) =>
                PostResponse.data.map((item) => (
                  <CardFour key={item.id} item={item} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="flex-2 height-[100%] w-[500px] hidden md:block  ">
      <Suspense
            fallback={
             <ListSkelton/>
            }
          >
            <Await
              resolve={data.PostResponse}
              errorElement={<p className="text-white">Error loading posts !</p>}
            >
              {(PostResponse) =>
              <CustomMap items={PostResponse.data} /> 
              }
            </Await>
          </Suspense>
      </div>
    </div>
  );
}
