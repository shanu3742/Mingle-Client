import { Box, Drawer, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const DesktopView = () => {
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState<string | null>(null);

    const otherGenders = [
        "Transgender", "Non-binary", "Genderqueer", "Agender", "Bigender",
        "Two-Spirit", "Demiboy", "Demigirl", "Genderfluid", "Androgynous",
        "Neutrois", "Intersex", "Pangender", "Maverique", "Polygender",
        "Xenogender", "Omnigender", "Third Gender", "Fa’afafine"
    ];
    const straightGender = ['Male', 'Female']

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleGender = (genderType: string) => {
        setGender(genderType)
    }
    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100">

                <h1 className="text-center font-bold my-4">
                    Profile Details
                </h1>

                <div className="w-3/4" >
                    <div className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-6">
                            <div className='my-4'>
                                <TextField name="name" label="Enter Name" variant="outlined" size="small" fullWidth />
                            </div>

                            <div className='my-4'>
                                <TextField name="name" label="Email" variant="outlined" value="krksingh.99@gmail.com" size="small" fullWidth disabled />
                            </div>

                            <div className='my-4'>
                                <div className="flex gap-2">
                                    <TextField name="DD" label="DD" variant="outlined" className="w-1/3" size="small" fullWidth />
                                    <TextField name="MM" label="MM" variant="outlined" className="w-1/3" size="small" fullWidth />
                                    <TextField name="YYYY" label="YYYY" variant="outlined" className="w-1/3" size="small" fullWidth />
                                </div>
                            </div>

                            <div>
                                <div>
                                    {
                                        straightGender.map((strGender, strGenderIndex) => {
                                            return <button key={strGender + strGenderIndex} type="button" onClick={() => handleGender(strGender)} className={`py-2.5 px-5 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${gender === strGender ? "active" : "inactive"}`}>{strGender}</button>
                                        })
                                    }
                                    <button onClick={toggleDrawer(true)} type="button" className={`py-2.5 px-5 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${gender && !straightGender.includes(gender) ? "active" : "inactive"}`}>{gender && !straightGender.includes(gender) ? gender : 'More'} <PanToolAltIcon /></button>
                                </div>

                                <Drawer anchor={'bottom'} open={open} onClose={toggleDrawer(false)}>
                                    <Box sx={{ minHeight: 350 }} role="presentation" onClick={toggleDrawer(false)}>
                                        <Typography sx={{ p: 2, color: 'text.secondary' }}>Select Gender</Typography>

                                        {
                                            otherGenders.map((othGender, genderIndex) => {
                                                return <button key={othGender + genderIndex} onClick={() => handleGender(othGender)} type="button" className={`py-5 px-15 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${othGender === gender ? "active" : "inactive"}`}>{othGender}</button>
                                            })
                                        }
                                    </Box>
                                </Drawer>
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
