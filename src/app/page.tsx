"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Image, Input, Button } from "@nextui-org/react"
import { MailIcon, LockClosedIcon, EyeOffIcon, EyeIcon, LoginIcon } from "@heroicons/react/outline";
import { Icon } from "@tremor/react";
import { getUserByEmail } from "@/adapters/dataGetters/getUsers";

export default function SignIn() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [value, setValue] = React.useState("");

  const router = useRouter()

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className='w-screen h-screen flex items-center justify-center bg-danger-50'>
      <div className='w-1/2 h-4/6 flex rounded-xl'>
        <div className="w-1/2 h-full bg-primary-300 flex flex-col items-center justify-evenly rounded-xl">
          <h2 className="text-center text-white font-semibold text-2xl ">Report all of your issues, relax and <br /> track your solutions</h2>
          <Image alt="Rocket heading at the sky" width={300} src="/loginBg.svg" />
          <Image alt="Rocket heading at the sky" width={100} src="/loadingDots.svg" />
        </div>

        <div className="w-1/2 h-full bg-gradient-to-tr from-[#253244] to-[#23272E] flex flex-col items-center justify-evenly rounded-xl -ml-6">
          <div className="w-10/12 h-full flex flex-col items-center justify-center gap-12">
            <h1 className="text-default-100 text-center font-semibold text-2xl">Sign In</h1>

            <Input         value={value}
        onValueChange={setValue} variant="underlined" size="lg" className="w-full text-white" classNames={{ label: "text-white" }} labelPlacement="outside" type="email" label="Email" placeholder="junior@nextui.org" startContent={<Icon size="md" icon={MailIcon} color="blue" />} />
            <Input
              size="lg"
              label="Password"
              variant="underlined"
              placeholder="Enter your password"
              startContent={<Icon size="md" icon={LockClosedIcon} color="blue" />}
              className="text-white"
              classNames={{ label: "text-white" }}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon icon={EyeOffIcon} />
                  ) : (
                    <Icon icon={EyeIcon} />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            <Button onClick={
              async () => {
                const userData = await getUserByEmail(value)

                if (userData[0] < 0) {
                  alert("Please insert a valid email address")
                } else {
                  router.push('/home')
                }
              }
            }
              startContent={
                <Icon icon={LoginIcon} size="lg" color="stone" />
              } color="primary" size="lg" radius="md" variant="shadow">Sign In</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
