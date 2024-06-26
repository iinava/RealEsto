import React from "react";

export default function ListSkelton() {
  return (
    <div>
      {" "}
      <div class="p-4 bg-none rounded shadow w-[400px]">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-gray-300 h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      {" "}
      <div class="p-4 bg-none rounded shadow w-[400px]">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-gray-300 h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      {" "}
      <div class="p-4 bg-none rounded shadow w-[400px]">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-gray-300 h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      {" "}
      <div class="p-4 bg-none rounded shadow w-[400px]">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-gray-300 h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
