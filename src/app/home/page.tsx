"use client"

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from 'next/navigation'
import { Button, Image, Badge } from "@nextui-org/react";
import Datepicker from "@/components/inputs/DatePicker";

export default function Home() {
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setLoadingState(true);
  }, []);

  return (
    <>
      <main className="h-screen w-screen flex items-center justify-center gap-4">
        <div className="flex flex-col gap-8">
          <Image as={NextImage} src={'/dhgLogo.jpg'} alt="logo" width={300} height={300} />
          <h1 className="mb-4 text-center font-bold leading-none tracking-tight text-primary-500 text-4xl md:text-5xl lg:text-6xl dark:text-white">DORM</h1>
        </div>
        <div className="w-1/4 items-center justify-center flex flex-col gap-8">
          <div className="flex items-center gap-3 justify-center">
            <h1 className="text-center font-bold leading-none tracking-tight text-foreground-500 text-lg md:text-xl lg:text-2xl dark:text-white">Date</h1>
            <Datepicker readOnly={false} selectedDate={null} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button color="primary" size="lg" onClick={() => { router.push("/meeting/new/" + (document.querySelector('#datepicker') as HTMLInputElement).value) }}>New Meeting</Button>
            <Badge classNames={{ base: "w-full shrink flex" }} content="1" color="primary">
              <Button className="w-full" color="primary" size="lg" onClick={() => { router.push("/action/53") }}>Check Actions</Button>
            </Badge>
            <Button color="primary" size="lg" isDisabled>Dashboard</Button>
            <Button color="primary" size="lg" onClick={() => { router.push("/admin") }}>Admin</Button>
          </div>
        </div>
      </main>
    </>
  );
}