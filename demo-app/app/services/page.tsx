"use client";
import React from 'react';
import Chart from '../client/Chart/Chart';

// #region Sample data
const data = [
  {
    name: 'Page A',
    started: 2500,
    "not started": 1000,
    completed: 2400,
  },
  {
    name: 'Page B',
    started: 3000,
    "not started": 1398,
    completed: 2210,
  },
  {
    name: 'Page C',
    started: 2000,
    "not started": 7800,
    completed: 2290,
  },
  {
    name: 'Page D',
    started: 2780,
    "not started": 3908,
    completed: 2000,
  },
  {
    name: 'Page E',
    started: 1890,
    "not started": 4800,
    completed: 2181,
  },
  {
    name: 'Page F',
    started: 2390,
    "not started": 3800,
    completed: 2500,
  },
  {
    name: 'Page G',
    started: 3490,
    "not started": 4300,
    completed: 2100,
  },
];

const ServicePage: React.FC = () => {
    return (
        <div className="flex flex-col px-100 py-12">
            <h1>Services</h1>
            <p>Welcome to our application! We are dedicated to providing the best service possible.</p>
            <Chart title="Charts" data={data} />
        </div>
    );
};

export default ServicePage;