import React from 'react'
import {useRouter} from "next/router"

function PortfolioPageProject() {
    const router = useRouter();

    console.log(router.pathname);
    console.log(router.query);
    return (
        <div>
            <h1>Portfolio Pages project</h1>
        </div>
    )
}
export default PortfolioPageProject;