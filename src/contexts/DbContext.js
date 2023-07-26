import React, {useContext, useState, useEffect} from 'react'
import {db} from '../firebase/firebase.js'
import { collection, setDoc, doc, getDocs, deleteDoc, updateDoc, orderBy, query} from "firebase/firestore"; 
import { useAuth } from './AuthContext';


const DbContext = React.createContext()

export function useDb(){
    return useContext(DbContext)
}

export function DbProvider({children}){
    const addUser = (userID) => {
        return setDoc(doc(db, "user_information", userID), {})
    }

    const addMedication = (userID, medID, medication) => {
        return setDoc(doc(db, "user_information", userID, "medication_list", medID),{
            id: medID,
            name: medication.name,
            days: medication.days,
            times: medication.times,
            note: medication.note,
            createdTimestamp: new Date()
        })
    }

    const deleteMedication = (userID, medID) => {
        return deleteDoc(doc(db, "user_information", userID, "medication_list", medID))
    }

    const updateMedication = (userID, medID, medication) => {
        return updateDoc(doc(db, "user_information", userID, "medication_list", medID), {
            id: medID,
            name: medication.name,
            days: medication.days,
            times: medication.times.map((time) => time.$d),
            note: medication.note,
        })
    }

    const getUserMedications = (userID) => {
        const medicationListRef = collection(db, 'user_information', userID, 'medication_list');
        const orderedQuery = query(medicationListRef, orderBy('createdTimestamp')); // Order the documents by timestamp
        return getDocs(orderedQuery);
    }




    const value = {
        addUser,
        addMedication,
        deleteMedication,
        updateMedication,
        getUserMedications
    }

    return (
        <DbContext.Provider value={value}>
            {children}
        </DbContext.Provider>
    )

}
