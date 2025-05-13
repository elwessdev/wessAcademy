import axios from 'axios';
import {create} from 'zustand';

export const useFavoriteStore = create((set,get:any)=>({
    favorites: new Map<number, {id:number, userId:number}>(),

    getFavorites: async(user_id:number)=>{
        try {
            const res = await axios.get(`http://localhost:8081/api/favorite/getByUser?userId=${user_id}`);
            if(res.status === 200){
                res.data.forEach((favorite:any) => {
                    set({
                        favorites: new Map(
                            [...get().favorites, [parseInt(favorite.courseId), favorite.id]]
                        )
                    })
                });
                console.log(get().favorites);
            }
        } catch(err){
            console.log("Error fetching favorite courses", err);
        }
    }

}))