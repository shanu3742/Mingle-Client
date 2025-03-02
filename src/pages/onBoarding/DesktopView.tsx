import { TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OptionSelector from "@components/OptionSelector";

const DesktopView = () => {
    const [gender, setGender] = useState<string | null>(null);
    const [genderInterested, setGenderInterested] = useState<string | null>(null);
    const [lookingFort, setLookingFort] = useState<string | null>(null);
    const [selectedDrinkOption, setSelectedDrinkOption] = useState<string | null>(null)
    const [selectedSmokeOption, setSelectedSmokeOption] = useState<string | null>(null)
    const [selectedWorkoutOption, setSelectedWorkoutOption] = useState<string | null>(null)
    const [selectedpetOption, setSelectedPetOption] = useState<string | null>(null)



    const genderList = ['Men', 'Women', 'Gay', "Lesbian", "Demisexual"]

    const genderOption = [
        'Male', 'Female',
        "Transgender", "Non-binary", "Genderqueer", "Agender", "Bigender",
        "Two-Spirit", "Demiboy", "Demigirl", "Genderfluid", "Androgynous",
        "Neutrois", "Intersex", "Pangender", "Maverique", "Polygender",
        "Xenogender", "Omnigender", "Third Gender", "Fa’afafine"
    ];

    const lookingFor = [
        {
            value: "Long-term partner",
            icon: "❤️"
        },
        {
            value: "Long-term open to short",
            icon: "😍"
        },
        {
            value: "Short-term open to Long",
            icon: "🥂"
        },
        {
            value: "Short-term fun",
            icon: "🎉"
        },
        {
            value: "New friends",
            icon: "👋"
        },
        {
            value: "Still Figuring it out",
            icon: "🤔"
        }
    ];
    const drinkOption = [
        'Not for me',
        'Sober',
        'Sober curious',
        'On special occasions',
        'Socially on weekends',
        'Most Nights'
    ]
    const smokeOption = [
        'Non-smoker',
        'Smoker',
        'Social smoker',
        'Smoker when drinking',
        'Trying to quit',
        'Most Nights'
    ]
    const workoutOption = [
        'Everyday',
        'Often',
        'Sometimes',
        'Never'
    ]

    const petOption = [
        {
            value: "Dog",
            icon: "🐶"
        },
        {
            value: "Cat",
            icon: "🐈‍"
        },
        {
            value: "Reptile",
            icon: "🦎"
        },
        {
            value: "Amphibian",
            icon: "🐸"
        },
        {
            value: "Bird",
            icon: "🐥"
        },
        {
            value: "Fish",
            icon: "🐟"
        },
        {
            value: "Don't have but love",
            icon: "🚫"
        },
        {
            value: "Turtle",
            icon: "🐢"
        },
        {
            value: "Hamster",
            icon: "🐹"
        },
        {
            value: "Rabbit",
            icon: "🐇"
        },
        {
            value: "Pet-free",
            icon: ""
        },
        {
            value: "other",
            icon: ""
        },
        {
            value: "All the pets",
            icon: ""
        },
        {
            value: "Want a pet",
            icon: ""
        },
        {
            value: "Allergic to pets",
            icon: ""
        },

    ]

    const onGenderSelection = useCallback((genderType: string) => {
        setGender(genderType)
    }, [])
    const onGenderInterested = useCallback((genderType: string) => {
        setGenderInterested(genderType)
    }, [])
    const onLookingFor = useCallback((genderType: string) => {
        setLookingFort(genderType)
    }, [])
    const onSelectedDrinkOption = useCallback((genderType: string) => {
        setSelectedDrinkOption(genderType)
    }, [])

    const onSelectedSmokeOption = useCallback((genderType: string) => {
        setSelectedSmokeOption(genderType)
    }, [])

    const onSelectedWorkoutOption = useCallback((genderType: string) => {
        setSelectedWorkoutOption(genderType)
    }, [])

    const onSelectedPetOption = useCallback((genderType: string) => {
        setSelectedPetOption(genderType)
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
                            <div className='mb-4'>
                                <label htmlFor="name">
                                    <Typography sx={{ color: "text.secondary", mb: 1 }}> First name</Typography>
                                </label>
                                <TextField id="name" name="name" placeholder="First name" variant="outlined" size="small" fullWidth />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="email" className="mb-1">
                                    <Typography sx={{ color: "text.secondary", mb: 1 }}>Email</Typography>

                                </label>
                                <TextField id="email" name="email" variant="outlined" value="krksingh.99@gmail.com" size="small" fullWidth disabled />
                            </div>

                            <div className='mb-4'>
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
                            <div className='mb-4'>
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
                    <div>
                        <div className='mb-4'>
                            <OptionSelector options={genderList} label="👥 Interested in" visibleCount={2} selectedOption={genderInterested} onSelect={onGenderInterested} />
                        </div>
                        <div className='mb-4'>
                            <OptionSelector options={lookingFor} label="👁️ What are you looking for?" visibleCount={2} selectedOption={lookingFort} onSelect={onLookingFor} />
                        </div>
                        <div className='mb-4'>
                            <OptionSelector options={drinkOption} label="🍺 How often do you drink" visibleCount={2} selectedOption={selectedDrinkOption} onSelect={onSelectedDrinkOption} />
                        </div>

                        <div className='mb-4'>
                            <OptionSelector options={smokeOption} label="🚬 How often do you smoke" visibleCount={2} selectedOption={selectedSmokeOption} onSelect={onSelectedSmokeOption} />
                        </div>

                        <div className='mb-4'>
                            <OptionSelector options={workoutOption} label="💪 Do you workout?" visibleCount={1} selectedOption={selectedWorkoutOption} onSelect={onSelectedWorkoutOption} />
                        </div>

                        <div className='mb-4'>
                            <OptionSelector options={petOption} label="🐈 Do you have any pets?" visibleCount={2} selectedOption={selectedpetOption} onSelect={onSelectedPetOption} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DesktopView
