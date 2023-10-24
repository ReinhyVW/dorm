"use client"

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from 'next/navigation'
import { Button, Image, Badge } from "@nextui-org/react";
import Datepicker from "@/components/inputs/DatePicker";
import { imagesSrc } from "../../../public/images";

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
          <Image as={NextImage} src={imagesSrc.dhgLogo} priority alt="logo" width={200} height={93.75} className="w-auto h-auto" />
          <h1 className="mb-4 text-center font-bold leading-none tracking-tight text-primary-500 text-4xl md:text-5xl lg:text-6xl dark:text-white">DORM</h1>
        </div>
        <div className="w-1/4 items-center justify-center flex flex-col gap-8">
          <div className="flex items-center gap-3 justify-center">
            <h1 className="text-center font-bold leading-none tracking-tight text-foreground-500 text-lg md:text-xl lg:text-2xl dark:text-white">Date</h1>
            <Datepicker readOnly={false} selectedDate={null} />
          </div>

          {/* 
          <div className="grid items-center grid-cols-2 gap-2">
          <div className="grid items-center">
          */}
          <div className="grid items-center grid-cols-2 gap-2">
            <Button color="primary" size="lg" onClick={() => { router.push("/meeting/" + (document.querySelector('#datepicker') as HTMLInputElement).value) }}>New Meeting</Button>
            <Badge classNames={{ base: "w-full shrink flex" }} content="1" color="primary">
              <Button className="w-full" color="primary" size="lg" onClick={() => { router.push(`/actions/${localStorage.getItem("loggedUserId")}`) }}>Check Actions</Button>
            </Badge>
            {/* <Button color="primary" size="lg" onClick={() => { router.push("/admin") }}>Admin</Button> */}
            <Button color="primary" size="lg" onClick={() => { router.push(`/actions`) }}>Dashboard</Button>
          </div>
        </div>
      </main>
    </>
  );
}
