import React, { useState, useEffect } from 'react';
import { PieChart ,LineChart } from "@mui/x-charts";
import { API_BASE_URL } from '../apiConfig';
const BasicPie = ({ data }) => {
  return (
    <PieChart
      series={[
        {
          data: data.map(item => ({ id: item.id, value: item.value, label: item.label })),
        },
      ]}
      width={400}
      height={200}
    />
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, entries: 0 });

  useEffect(() => {
    fetch(`${API_BASE_URL}/stats`)
      .then(response => response.json())
      .then(data => {
        setStats({
          users: data.users,
          products: data.products,
          entries: data.entries, // Corrected property name
        });
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }, []);

  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
          <h2 className="text-gray-600 ml-0.5"></h2>
        </div>

      </div>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.users}</span>
            <span className="block text-gray-500">Users</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.products}</span>
        
            <span className="block text-gray-500">Articles</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.achats}</span>
            <span className="block text-gray-500">Entree</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 10v4m0 0V10m0 4H7m10 0h3a2 2 0 002-2V6a2 2 0 00-2-2h-1a3 3 0 00-3 3v2"
              ></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">5</span>
            <span className="block text-gray-500">Sortie</span>
          </div>
        </div>
      </section>
      <section className="bg-white shadow rounded-lg p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">Gestion de stock pieces Rechanges</h2>
        {/* <div className="flex space-x-6">
          <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg"></div> */}
          {/* <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1"></h3>
            <p className="text-gray-600 mb-2">2 weeks • Design basics and principles</p>
            <p className="text-sm text-gray-500">Starts on April 29, 2024</p>
          </div> */}
          {/* <a
            href="#"
            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
          >
            <span className="sr-only">Messages</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </a>
        </div> */}

        <section className="grid md:grid-cols-2 gap-6">
         <div className="bg-white shadow rounded-lg p-6">
           <h3 className="text-xl font-semibold mb-4">
             Total Registered Supliers
           </h3>
           <LineChart
             xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12] }]}
             series={[
               {
                 data: [10, 15, 25, 30, 40, 50, 60],
               },
             ]}
             width={500}
             height={300}
           />
         </div>
         {/* <div className="bg-white shadow rounded-lg p-6">
           <h3 className="text-xl font-semibold mb-4">Number of Sales</h3>

           <PieChart
             series={[
               {
                 data: [
                   { id: 0, value: 10, label: "series A" },
                   { id: 1, value: 15, label: "series B" },
                   { id: 2, value: 20, label: "series C" },
                 ],
               },
             ]}
             width={400}
             height={200}
           />
  
         </div> */}
                       <div className="mt-8">
          <BasicPie
            data={[
              { id: 0, value: stats.users, label: 'Users' },
              { id: 1, value: stats.products, label: 'Articles' },
              { id: 2, value: stats.achat, label: 'Entree' },
            ]}
          />
        </div>
       </section>
   
      </section>
    </main>
  );
};

export default Dashboard;