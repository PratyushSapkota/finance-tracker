import React from 'react'
import UserMenu from "@/components/UserMenu";
import {requireUser} from "@/lib/require-user";

async function Page() {
    const user = await requireUser()


    return (
        <div className="main flex justify-center items-center h-screen">
            <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                <UserMenu signedEmail={user.email} isSettings={false} />
            </div>
            Main
        </div>
    )
}

export default Page