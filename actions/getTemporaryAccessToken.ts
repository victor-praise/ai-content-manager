'use server';

import { currentUser } from "@clerk/nextjs/server";
import {SchematicClient} from "@schematichq/schematic-typescript-node";

const client = new SchematicClient({
    apiKey: process.env.SCHEMATIC_API_KEY || '',
});


export async function getTemporaryAccessToken() {

    const user = await currentUser();
    if(!user){
        throw new Error("User is not authenticated");
    }

    const response =await client.accesstokens.issueTemporaryAccessToken({
        resource_type: "company",
        lookup:{
            id:user.id,
        }
    })

    return response.data.token;

}