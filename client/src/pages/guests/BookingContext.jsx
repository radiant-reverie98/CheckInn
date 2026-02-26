import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const today = new Date().toISOString().split('T')[0];
    
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const updateCheckIn = (newDate) => {
        setCheckIn(newDate);
        // Corrected: reset checkOut if it's before the new checkIn
        if (checkOut && newDate >= checkOut) {
            setCheckOut('');
        }
    };

    const getMinCheckOut = () => {
        if (!checkIn) return today;
        const nextDay = new Date(checkIn);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split('T')[0];
    };

    // The Reset Function for "Browse All"
    const browseAll = () => {
        setCheckIn('');
        setCheckOut('');
        setPage(1);
        
    };

    const fetchHotels = async () => {
        setLoading(true);
        try {
            // Added params so the backend actually receives the filters
            const res = await axios.get(`http://localhost:5000/api/fetchHotels`, {
                params: {
                    checkIn: checkIn || undefined,
                    checkOut: checkOut || undefined,
                    page: page,
                    limit: 10
                }
            });

            if (res.data.success) {
                setHotels(res.data.data);
                setTotalPages(res.data.pagination.totalPages);
            }
        } catch (err) {
            console.log(`ERROR FETCHING HOTELS: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch on date or page change
    useEffect(() => {
        fetchHotels();
    }, [checkIn, checkOut, page]);

    return (
        <BookingContext.Provider value={{ 
            checkIn, updateCheckIn, 
            checkOut, setCheckOut, 
            getMinCheckOut, today,
            hotels, loading,
            page, setPage, totalPages,
            browseAll // Exporting the reset function
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);