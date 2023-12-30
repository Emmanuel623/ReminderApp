const data = [
    {
        // ... other fields
        "bookedServicesData": [
            {
                // ... other fields
                "datetime": "2023-12-30T09:18:00", // Format as "YYYY-MM-DDTHH:mm:ss"
            }
        ]
    },
    // ... other entries
];

const newData = data.map(entry => {
    const newEntry = { ...entry };
    newEntry.bookedServicesData = entry.bookedServicesData.map(booking => {
        const newBooking = { ...booking };
        // Convert the datetime string to a JavaScript Date object
        newBooking.datetime = new Date(booking.datetime);
        return newBooking;
    });
    return newEntry;
});

console.log(newData[0]);