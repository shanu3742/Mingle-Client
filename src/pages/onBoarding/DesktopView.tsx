import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";


const DesktopView = () => {
    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100">

                <h1 className="text-center font-bold my-4">
                    Profile Details
                </h1>

                <div className="w-3/4" >
                    <div className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-6">
                            <div>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    variant="outlined"
                                    error
                                    helperText="This field must contain between 1 and 22 characters."
                                />
                            </div>
                            <div>
                                <TextField fullWidth label="Email" variant="outlined" value="krksingh.99@gmail.com" disabled />
                            </div>
                            <div className="flex gap-2">
                                <TextField label="Day" variant="outlined" className="w-1/3" />
                                <TextField label="Month" variant="outlined" className="w-1/3" />
                                <TextField label="Year" variant="outlined" className="w-1/3" />
                            </div>
                            <div>
                                <FormControl>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup row>
                                        <FormControlLabel value="man" control={<Radio />} label="Man" />
                                        <FormControlLabel value="woman" control={<Radio />} label="Woman" />
                                        <FormControlLabel value="more" control={<Radio />} label="More" />
                                    </RadioGroup>
                                </FormControl>
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
