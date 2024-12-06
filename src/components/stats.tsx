"use client"
import React from 'react';
import CountUp from 'react-countup';
const stats = [
    { num: 12, label: "Years of Experience" },
    { num: 26, label: "Projects Completed" },
    { num: 8, label: "Technologies Mastered" },
    { num: 500, label: "Code Commits" },
]
const Stats = () => {
    return (
        <section className='pt-4 pb-12 lg:p-0'>
            <div className='container mx-auto'>
                <div className='flex flex-wrap gap-6 max-w-[850px] mx-auto lg:max-w-none'>
                    {stats.map((stat) => (
                        <div key={stat.label}
                            className="flex-1 flex items-center justify-center lg:justify-start gap-4">
                            <CountUp
                                delay={2}
                                duration={5}
                                end={stat.num}
                                className='text-4xl lg:text-6xl font-extrabold'
                            />
                            <p className={`${stat.label.length > 7 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-white/80`}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Stats;
