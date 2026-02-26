import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { HotelProvider } from "../context/HotelContext"

function GuestLayout(){
    return(
        <AuthProvider>
            <HotelProvider>
                <Outlet/>
            </HotelProvider>
            
        </AuthProvider>
    )
}

export default GuestLayout