"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/supabaseClient";
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation';


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Cars() {
    const router = useRouter();
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            let { data: Vehicles, error } = await supabase
                .from("Vehicles")
                .select("*");
            if (error) {
                throw error;
            }
            console.log(Vehicles);
            setVehicles(Vehicles);
        } catch (error) {
            console.error("Error fetching vehicles:", error.message);
        }
    }
    function saveValue(id){
        localStorage.setItem('car-info', JSON.stringify(id));
        
         router.push('/details');
         
    }

    return (
        <Table>
            <TableCaption>List of Cars.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Car Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Select Your car</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
            {vehicles.map((vehicle, index) => (
        <TableRow key={vehicle.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{vehicle.name}</TableCell>
            <TableCell>{vehicle.price}</TableCell>
            <TableCell className="">  <Checkbox onClick={() => saveValue(vehicle.id)} />   Select
</TableCell>
           
        </TableRow>
    ))}
            </TableBody>
        </Table>
    );
}
