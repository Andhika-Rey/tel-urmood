import { Activity } from 'lucide-react';

export default function WhatIsSection() {
  return (
    <section className="px-8 py-20">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-[32px] shadow-card-lg border border-white/60 p-10 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center">
            <Activity className="w-5 h-5 text-teal" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">What is Tel-UrMood?</h2>
        </div>
        <p className="text-base text-gray-600 leading-[1.75]">
          Tel-UrMood helps you map your mood across four areas of your life — home,
          school, social settings, and time alone. By answering a few short
          statements, you'll get a personal mood map based on two things: how
          comfortable you feel and how much energy you have.
        </p>
        <p className="text-base text-gray-600 leading-[1.75] mt-4">
          There are no right or wrong answers. It's just a way to notice patterns.
        </p>
      </div>
    </section>
  );
}
