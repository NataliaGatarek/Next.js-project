import { useRouter } from "next/router";

function SelectedClientProject() {
    const router = useRouter();
    console.log(router.query);
    
    return (
        <div>
            <h1>Specific Project for a client</h1>
        </div>
    )
}
export default SelectedClientProject;