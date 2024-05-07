"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/supabaseClient";
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            let { data: userInfoData, error } = await supabase
                .from("UserInfo")
                .select("*");
            if (error) {
                throw error;
            }
            setUserInfo(userInfoData);
            console.log(userInfoData);
        } catch (error) {
            console.error("Error fetching UserInfo:", error.message);
        }
    }
    async function deleteOperation(id) {
        try {
            const { error } = await supabase
                .from('UserInfo')
                .delete()
                .eq('id', id);
    
            if (error) {
                throw error;
            }
    
            getProducts(); 
    
            console.log("Data deleted successfully:", id);
        } catch (error) {
            console.error("Error deleting data:", error.message);
        }
    }
    

    return (
        <main className="flex min-h-screen flex-col items-center gap-[2.75rem] p-24">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Dashboard
            </h2>
            <Table>
                <TableCaption>Buyers Details</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Car Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Delete User</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userInfo &&
                        userInfo.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.number}</TableCell>
                                <TableCell>{user.carname}</TableCell>
                                <TableCell>{user.price}</TableCell>
                                <TableCell><Badge className="cursor-not-allowed focus:cursor-auto" onClick={() => deleteOperation(user.id)} variant="destructive">Delete</Badge></TableCell>
                            </TableRow> 
                        ))}
                </TableBody>
            </Table>
        </main>
    );
}
