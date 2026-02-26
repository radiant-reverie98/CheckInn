import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

function GuestLayout(){
    return(
        <AuthProvider>
            <Outlet/>
        </AuthProvider>
    )
}

export default GuestLayout