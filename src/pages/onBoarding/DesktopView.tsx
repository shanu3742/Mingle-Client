import { TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OptionSelector from "@components/OptionSelector";

const DesktopView = () => {
    const [gender, setGender] = useState<string | null>(null);

    const genderOption = [
        'Male', 'Female',
        "Transgender", "Non-binary", "Genderqueer", "Agender", "Bigender",
        "Two-Spirit", "Demiboy", "Demigirl", "Genderfluid", "Androgynous",
        "Neutrois", "Intersex", "Pangender", "Maverique", "Polygender",
        "Xenogender", "Omnigender", "Third Gender", "Fa’afafine"
    ];

    const onGenderSelection = useCallback((genderType: string) => {
        setGender(genderType)
    }, [])

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4">

                <h1 className="text-center font-bold my-4">
                    Profile Details
                </h1>

                <div className="w-5/6">
                    <div className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-6">
                            <div className='my-4'>
                                <TextField name="name" label="Enter Name" variant="outlined" size="small" fullWidth />
                            </div>

                            <div className='my-4'>
                                <TextField name="name" label="Email" variant="outlined" value="krksingh.99@gmail.com" size="small" fullWidth disabled />
                            </div>

                            <div className='my-4'>
                                <Typography sx={{ color: "text.secondary", mb: 1 }}>{'Birthday'}</Typography>
                                <div className="flex gap-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker slotProps={{
                                            textField: {
                                                sx: {
                                                    "& .MuiInputBase-root": {
                                                        padding: "4px", // Adjust padding
                                                        minHeight: "30px", // Reduce height
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        padding: "4px", // For outlined variant
                                                        paddingRight: "10px"
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        padding: "2px", // Inner input padding
                                                    },
                                                },
                                            },
                                        }} />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className='my-4'>
                                <OptionSelector options={genderOption} label="Select Gender" visibleCount={2} selectedOption={gender} onSelect={onGenderSelection} />
                            </div>

                        </div>


                        <div className="col-span-6" >
                            <Typography variant="subtitle1" className="mb-2">Profile Photos</Typography>
                            <div className="flex flex-wrap">
                                {[...Array(6)].map((_, index) => (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            key={index}
                                            id={`file-upload-${index}`}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={`file-upload-${index}`}
                                            className="w-26 h-28 my-2 mx-2 border-dashed border-2 border-gray-400 flex justify-center items-center rounded-lg cursor-pointer bg-gray-300 relative"
                                        >
                                            <span className="text-gray-500"></span>
                                            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-2xl bg-red-500 text-white flex items-center justify-center">+</div>
                                        </label>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DesktopView
