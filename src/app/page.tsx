"use client"

import React from "react";
import { Users } from "@/types"

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
      <div className='w-11/12 md:w-3/4 xl:w-1/2 h-4/6 flex rounded-xl pr-12'>
        <div className="w-1/2 h-full bg-primary-300 flex flex-col items-center justify-evenly rounded-xl">
          <h2 className="text-center w-10/12 text-white font-semibold text-2xl whitespace-break-spaces">Report all of your issues, relax and <br /> track your solutions</h2>
          <Image alt="Rocket heading at the sky" width={300} src="/loginBg.svg" />
          <Image alt="Vertical Dots" width={100} src="/loadingDots.svg" />
        </div>

        <div className="w-1/2 h-full bg-gradient-to-tr from-primary-700 to-primary-900 flex flex-col items-center justify-evenly rounded-xl -ml-4">
          <div className="w-10/12 h-full flex flex-col items-center justify-center gap-12">
            <h1 className="text-default-100 text-center font-semibold text-2xl">Sign In</h1>

            <Input value={value}
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
                try {
                  const userData: Users = await getUserByEmail(value);

                  if (!userData) {
                    alert("Incorrect Email Address");
                  } else {
                    localStorage.setItem("loggedUserId", JSON.stringify(userData.UserId))
                    router.push('/home');
                  }
                } catch (error) {
                  console.error("An error occurred:", error);
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
