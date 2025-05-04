import {create} from 'zustand';
import axios from 'axios';
import { message } from 'antd';

export const useCourseStore = create((set,get)=>({

    addNote: async(note:string,courseID: number) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/course/addNote`,{note,courseID},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if(res.status === 200){
                console.log(res);
                message.success("Note added successfully");
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
    },

    deleteNote: async(noteID:number, courseID: number) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/course/deleteNote`,{
                data: {noteID,courseID},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if(res.status === 200){
                // console.log(res);
                message.success("Note deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    },
}));