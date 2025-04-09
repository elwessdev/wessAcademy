import {create} from 'zustand';

const useAuthStore = create((set,get) => ({
    isAuth: false,
    userData: [],
    isSubmitting: false,
    error: null,

    setIsAuth: (isAuth) => set({isAuth}),

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
                set({userData: data});
                set({isAuth: true});
            } else {
                set({isAuth: false});
                localStorage.removeItem("token");
            }
        } catch(error) {
            console.error("Error fetching user data:", error);
        }
    },

    SignUp: async(userData) => {
        set({isSubmitting: true});
        set({error: null});
        try{
            const res = await fetch("http://127.0.0.1:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (res.ok) {
                set({error: null});
                localStorage.setItem("token", data.token);
                set({isAuth: true});
            } else {
                if(data?.detail?.split(" ")[0] === "Username") {
                    set({error:{"username": data.detail}});
                    return;
                }
                if(data?.detail?.split(" ")[0] === "Email") {
                    set({error:{"email": data.detail}});
                    return;
                }
                set({ errors: { ...get().errors, global: data.detail } });
            }
        } catch (error) {
            set({ errors: { ...get().errors, global: "An error occurred. Please try again." } });
        } finally {
            set({isSubmitting: false});
        }
    }
    
}));

export default useAuthStore;