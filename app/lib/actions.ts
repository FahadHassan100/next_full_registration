'use server'
import  prisma  from "@/prisma/client";
import { redirect } from "next/navigation";
import { signIn } from "../auth";

export const registerUser = async (formData:any) => {

    const {username,email,password} = Object.fromEntries(formData);

    await prisma.users.create({
            data:{
                username: username,
                email:email,
                password: password,
                isActive: false
            },
    });

    redirect("/");

}


export const authentication = async (formData:any) => {

    const {username,password} = Object.fromEntries(formData);

    await signIn("credentials",{username,password, redirectTo: "/dashboard"});

}