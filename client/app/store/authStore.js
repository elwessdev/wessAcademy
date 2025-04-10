import {create} from 'zustand';

const useAuthStore = create((set,get) => ({
    isAuth: false,
    userData: [],

    setIsAuth: (isAuth) => set({isAuth: isAuth}),
    
    setUserData: (userData) => set({userData: userData}),

    getUserData: async() => {
        if(!get().isAuth && localStorage.getItem('token')) {
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
                    set({userData: data});
                    set({isAuth: true});
                    console.log(get().userData);
                } else {
                    set({isAuth: false});
                    console.log("Token expired or invalid");
                    // localStorage.removeItem("token");
                }
            } catch(error) {
                console.error("Error fetching user data:", error);
            }
        }
    },

    logout: () => {
        set({isAuth: false});
        set({userData: []});
        localStorage.removeItem("token");
    }
    
}));

export default useAuthStore;