import {create} from 'zustand';

const useAuthStore = create((set,get) => ({
    isAuth: false,
    userData: [],
    token: null,

    setIsAuth: (isAuth) => set({isAuth: isAuth}),
    
    setUserData: (userData) => set({userData: userData}),

    setToken: (token) => set({token: token}),

    getUserData: async() => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/auth/userData",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            if(res.ok) {
                set({userData: data.user});
                set({isAuth: true});
                set({token: localStorage.getItem("token")});
            } else {
                set({isAuth: false});
                localStorage.removeItem("token");
            }
        } catch(error) {
            console.error("Error fetching user data:", error);
        }
    },
    
}));

export default useAuthStore;