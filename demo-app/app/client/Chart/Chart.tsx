'use client';
import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

interface ChartProps {
    title?: string;
    data?: any[];
}

export const Chart: React.FC<ChartProps> = ({ title = 'Chart', data = [] }) => {
    return (
        <div className="w-full h-full p-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="bg-gray-100 rounded-lg p-4">
                <BarChart
                    style={{ width: '100%', maxWidth: '80vw', maxHeight: '90vh', aspectRatio: 1 }}
                    responsive
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 50,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis width="auto" type='auto' />
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip active={true} />
                    <Legend />
                    <Bar dataKey="started" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }}  isAnimationActive={true}/>
                    <Bar dataKey="not started" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} isAnimationActive={true}/>
                    <Bar dataKey="completed" fill="#123a9d" activeBar={{ fill: 'red', stroke: 'yellow' }} isAnimationActive={true} />
                </BarChart>
            </div>
        </div>
    );
};

export default Chart;