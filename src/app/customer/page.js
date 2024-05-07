"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Customer() {
    const router = useRouter()
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
   
  

    function login(e) {
        e.preventDefault();
        const item = { name, number };
        localStorage.setItem('user-info', JSON.stringify(item));
        router.push('/cars');
    }

    return (
        <main className="flex min-h-screen flex-col items-center  gap-[2.75rem] p-24">
                      <h2 className=" border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                      Are you planning on buying a car?
    </h2>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                    <CardDescription>Please fill this form</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Customer Name</Label>
                                <Input onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter Your Name" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="number">Mobile Number</Label>
                                <Input onChange={(e) => setNumber(e.target.value)} id="number" placeholder="Enter Your Number" />
                            </div>
                            <Button onClick={login}>Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
