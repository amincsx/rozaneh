"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const therapists = [
  { id: "1", name: "دکتر ابوالفضل امینیان", image: "/psychologists/1/image (15).webp" },
  { id: "2", name: "زینب ایرانی", image: "/psychologists/2/image (1).webp" },
  { id: "3", name: "زهره کیانی", image: "/psychologists/3/image (13).webp" },
  { id: "4", name: "دکتر محسن محمدی", image: "/psychologists/4/image (12).webp" },
  { id: "5", name: "الهام عسگری", image: "/psychologists/5/image (2).webp" },
  { id: "6", name: "مینا خضری نمین", image: "/psychologists/6/image (3).webp" },
  { id: "7", name: "زهرا بیکی", image: "/psychologists/7/image (4).webp" },
  { id: "8", name: "دکتر رضا معیری", image: "/psychologists/8/image (5).webp" },
  { id: "9", name: "مهسا باغبانی", image: "/psychologists/9/image (6).webp" },
  { id: "10", name: "مژگان میرزاده", image: "/psychologists/10/image (7).webp" },
  { id: "11", name: "دکتر یاسمن صالح", image: "/psychologists/11/image (8).webp" },
  { id: "12", name: "سارا گلچوبیان", image: "/psychologists/12/image (9).webp" },
  { id: "13", name: "زهرا صادقی", image: "/psychologists/13/image (10).webp" },
  { id: "14", name: "دکتر بهار ایروانی", image: "/psychologists/14/image (11).webp" },
  { id: "15", name: "دکتر نسرین واسعی", image: "/psychologists/15/image (12).webp" },
  { id: "16", name: "زهرا سادات اطیابی", image: "/psychologists/16/image (13).webp" },
  { id: "17", name: "لیلا بیرانوند", image: "/psychologists/17/image (14).webp" },
  { id: "18", name: "دکتر نگار غایبی", image: "/psychologists/18/image (15).webp" },
  { id: "19", name: "دکتر محمد جدیدکار همدانی", image: "/psychologists/19/image (16).webp" },
  { id: "20", name: "بهاره نعمتی روشن", image: "/psychologists/20/image (17).webp" },
  { id: "21", name: "منصوره روحانی فر", image: "/psychologists/21/21.webp" },
  { id: "22", name: "سیده زهرا نوریزاده", image: "/psychologists/22/22.webp" },
  { id: "23", name: "فاطمه ماه روح", image: "/psychologists/23/23.webp" },
  { id: "24", name: "یاسمن طبائیان", image: "/psychologists/24/24.webp" },
  { id: "25", name: "دکتر محمد بدرخانی", image: "/psychologists/25/25.webp" },
  { id: "26", name: "دکتر اعظم گلستاتی", image: "/psychologists/26/26.webp" },
  { id: "27", name: "ساناز شاهوردی", image: "/psychologists/27/27.webp" },
];

const MAX_VISIBLE = 7;
const HALF_VISIBLE = MAX_VISIBLE >> 1;

export default function TherapistPhotoFan() {
  const [centerIndex, setCenterIndex] = useState(HALF_VISIBLE);
  const totalTherapists = therapists.length;

  const move = (offset: number) => {
    setCenterIndex((current) => (current + offset + totalTherapists) % totalTherapists);
  };

  return (
    <section
      role="region"
      aria-label="تصاویر روانشناسان و مشاوران"
      className="absolute inset-x-0 bottom-0 top-[38%] flex flex-col items-center px-2 md:top-[42%]"
    >
      <div
        className="relative w-full max-w-[80rem] shrink-0"
        style={{ height: "clamp(13rem, calc(24vw + 3rem), 24rem)" }}
      >
        {therapists.map((therapist, index) => {
          const slot = (index - centerIndex + HALF_VISIBLE + totalTherapists) % totalTherapists;
          const isVisible = slot < MAX_VISIBLE;
          const distance = isVisible
            ? slot - HALF_VISIBLE
            : ((index - centerIndex + totalTherapists) % totalTherapists) > totalTherapists / 2
              ? -5
              : 5;
          const absDistance = Math.abs(distance);

          return (
            <Link
              key={therapist.id}
              href={`/therapists/${therapist.id}`}
              aria-label={`مشاهده پروفایل ${therapist.name}`}
              tabIndex={isVisible ? 0 : -1}
              aria-hidden={!isVisible}
              className="absolute left-1/2 top-0 aspect-[3/4] overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_18px_45px_rgba(15,76,72,0.22)] transition-all duration-500 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
              style={{
                width: "clamp(5.5rem, 18vw, 14rem)",
                transform: `translate(calc(-50% + ${distance * 8}vw), ${absDistance * 0.65}rem) rotate(${distance * 7}deg) scale(${1 - absDistance * 0.055})`,
                zIndex: 10 - absDistance,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              <Image
                src={therapist.image}
                alt={therapist.name}
                fill
                sizes="(max-width: 640px) 25vw, 18vw"
                priority={index === centerIndex}
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-2 pb-3 pt-10 text-center text-sm font-semibold text-white font-arabic md:px-3 md:pb-4 md:text-base">
                {therapist.name}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="relative z-30 mt-3 flex items-center justify-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="مشاور قبلی"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/70 text-teal-800 shadow-md backdrop-blur transition hover:bg-white md:h-11 md:w-11"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="مشاور بعدی"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/70 text-teal-800 shadow-md backdrop-blur transition hover:bg-white md:h-11 md:w-11"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
