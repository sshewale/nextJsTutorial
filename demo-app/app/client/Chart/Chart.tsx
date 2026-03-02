'use client';
import React, { useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Sector, PieSectorShapeProps } from 'recharts';

interface ChartProps {
    title?: string;
    data?: any[];
}

export function generateMockData(length: number, seed: number): Array<{
    label: string;
    x: number;
    y: number;
    z: number;
}> {
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push({
            label: `Item ${i + 1}`,
            x: Math.floor(Math.random() * 100) + seed,
            y: Math.floor(Math.random() * 100) + seed,
            z: Math.floor(Math.random() * 100) + seed,
        });
    }
    return data;
}

const pieChartdata = generateMockData(4, 1000);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieGradient = (props: PieSectorShapeProps) => {
  return (
    <>
      <defs>
        <radialGradient
          id={`fillGradient${props.index}`}
          cx={props.cx}
          cy={props.cy}
          r={props.outerRadius}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={COLORS[props.index % COLORS.length]} stopOpacity={0} />
          <stop offset="100%" stopColor={COLORS[props.index % COLORS.length]} stopOpacity={0.8} />
        </radialGradient>
        <radialGradient
          id={`borderGradient${props.index}`}
          cx={(typeof props.width === 'number' ? props.width : 0) / 2}
          cy={(typeof props.height === 'number' ? props.height : 0) / 2}
        >
          <stop offset="0%" stopColor={COLORS[props.index % COLORS.length]} stopOpacity={0} />
          <stop offset="100%" stopColor={COLORS[props.index % COLORS.length]} stopOpacity={0.8} />
        </radialGradient>
        <clipPath id={`clipPath${props.index}`}>
          <Sector {...props} />
        </clipPath>
      </defs>
      <Sector
        {...props}
        clipPath={`url(#clipPath${props.index})`}
        fill={`url(#fillGradient${props.index})`}
        stroke={`url(#borderGradient${props.index})`}
        strokeWidth={props.isActive ? '100%' : 0}
      />
    </>
  );
};
    
const renderCustomizedLabel = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const delta = Math.abs(1 / cos) + 10;
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + delta) * cos;
  const my = cy + (outerRadius + delta) * sin;
  const ex = mx + Number(cos.toFixed(1)) * 20;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill.replace(/[^,]+$/, '0.2)')}
        fill="none"
      />
      <rect x={ex + (cos >= 0 ? 1 * 5 : -1 * 17)} y={ey - 4} width={12} height={8} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 21}
        y={ey + 4}
        textAnchor={textAnchor}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export const Chart: React.FC<ChartProps> = ({ title = 'Chart', data = [] }) => {
    const [showBarChart, setShowBarChart] = useState(false);
    const [showPieChart, setShowPieChart] = useState(false);

    const toggleBarChart = () => {
        setShowBarChart((prev) => !prev);
        setShowPieChart(false); // Ensure only one chart is shown at a time
    };

    const togglePieChart = () => {
        setShowPieChart((prev) => !prev);
        setShowBarChart(false); // Ensure only one chart is shown at a time
    };

    return (
        <div className="w-full h-full p-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <button
                onClick={toggleBarChart}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                {showBarChart ? 'Hide Bar Chart' : 'Show Bar Chart'}
            </button>
            <button onClick={togglePieChart} className="mb-4 ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                {showPieChart ? 'Hide Pie Chart' : 'Show Pie Chart'}
            </button>
            {showBarChart && (
                <div className="bg-gray-100 rounded-lg p-4">
                    <BarChart
                        style={{ width: '100%', maxWidth: '80vw', maxHeight: '90vh', aspectRatio: 1 }}
                        responsive
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 50,
                            right: 50,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="2 3" />
                        <XAxis width="auto" type='auto' />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip active={true} />
                        <Legend />
                        <Bar barSize={10} dataKey="started" fill="#8884d8" activeBar={true} label={{ position: 'right', fontSize: 10 }} />
                        <Bar barSize={10} dataKey="not started" fill="#82ca9d" activeBar={true} label={{ position: 'right', fontSize: 10 }} />
                        <Bar barSize={10} dataKey="completed" fill="#123a9d" activeBar={true} label={{ position: 'right', fontSize: 10 }} />
                    </BarChart>
                </div>)}
            {showPieChart && (
                <div className="bg-gray-100 rounded-lg p-4">
                    <p>Pie Chart Placeholder</p>
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
                        <Pie data={pieChartdata} dataKey="x" isAnimationActive={true} shape={PieGradient} innerRadius="20%" 
                        labelLine={true} label={renderCustomizedLabel}/>
                        <Tooltip />
                    </PieChart>
                </div>
                
            )}
        </div>
    );
};

export default Chart;