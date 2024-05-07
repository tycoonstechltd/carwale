"use client";
import React, { useState, useEffect } from "react";
import {supabase} from  "@/app/supabaseClient";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';




export default function Details() {

    const router = useRouter();
    const [user, setUser] = useState(null); 
    const [number, setNumber] = useState(null);
    const [vehcile, setVehcile] = useState(null);



    useEffect(() => {
        async function getcarDetails() {
            const newCarId = localStorage.getItem('car-info');
            
            // Check if newCarId exists
            if (newCarId) {
               const newCarId1 = newCarId.replace(/^"(.*)"$/, '$1');
                try {
                 
                    localStorage.removeItem('car-info');
                    
                 
                    localStorage.setItem('car-info', newCarId1);
    
                
                    const { data: vehicle, error } = await supabase
                        .from('Vehicles')
                        .select("*")
                        .eq('id', newCarId1)
                        .single();
    
                    if (error) {
                        throw error;
                    }
                    console.log(vehicle);
                    setVehcile(vehicle);
                } catch (error) {
                    console.error("Error fetching car details:", error.message);
                }
            } else {
                console.log("No new car ID found.");
            }
        }
    
        getcarDetails();
    }, []);
    
    
    
   
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user-info'));
      
    
        if (storedUser) {
            setUser(storedUser.name);
            setNumber(storedUser.number);
        }
    }, []);


    async function saveInfo() {
        try {
            const { data, error } = await supabase
                .from('UserInfo')
                .insert([
                    { name: user, number: number, price: vehcile.price, carname: vehcile.name },
                ])
                .select();
    
            if (error) {
                throw error;
            }
         
          

            router.push('/dashboard');
         
            console.log("Data inserted successfully:", data);
        } catch (error) {
            console.error("Error inserting data:", error.message);
        }
    }
    


    

    return (
        <main className="flex min-h-screen flex-col items-center  gap-[2.75rem]  p-24">

               <h2 className=" border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
    All user details
    </h2>
            {user && number && (
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">
                        <CardTitle>Name : {user}</CardTitle>
                        <CardTitle>Number : {number}</CardTitle>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                                Car Name: {vehcile ? vehcile.name : 'N/A'}
                            </CardDescription>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                                Car Price: {vehcile ? vehcile.price : 'N/A'}
                            </CardDescription>

                    </CardHeader>
                    <CardFooter>
                        <Button onClick={saveInfo}>Send Info</Button>
                    </CardFooter>
                </Card>
            )}
        </main>
    );
}
