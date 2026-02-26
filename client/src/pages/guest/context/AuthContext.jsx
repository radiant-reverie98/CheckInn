import React,{createContext,useContext,useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)

    const isUserAuthenticated = async(req,res)=>{
        try{
            setLoading(true)
            const res = await axios.get(`http://localhost:5000/api/auth/me`,{withCredentials: true})
            if(res.data.success){
                setUser(true)
            }

        }catch(err){
            console.log(err)
        }finally{setLoading(false)}
    }
    const value = {
        user,
        setUser,
        loading,
        setLoading
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {return useContext(AuthContext)}