import { Button, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OptionSelector from "@components/OptionSelector";

const DesktopView = () => {

    const [selectOption, setSelectOption] = useState<any>({
        gender: {
            list: ['Male', 'Female',
                "Transgender", "Non-binary", "Genderqueer", "Agender", "Bigender",
                "Two-Spirit", "Demiboy", "Demigirl", "Genderfluid", "Androgynous",
                "Neutrois", "Intersex", "Pangender", "Maverique", "Polygender",
                "Xenogender", "Omnigender", "Third Gender", "Fa’afafine"],
            selectedValue: '',
            label: 'Select Gender',
            visibleCount: 2
        },
        interestedIn: {
            list: ['Men', 'Women', 'Gay', "Lesbian", "Demisexual"],
            selectedValue: '',
            label: '👥 Interested in',
            visibleCount: 2
        },
        lookingFor: {
            list: [
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
            ],
            selectedValue: '',
            label: "👁️ What are you looking for?",
            visibleCount: 2
        },
        drinkOption: {
            list: [
                'Not for me',
                'Sober',
                'Sober curious',
                'On special occasions',
                'Socially on weekends',
                'Most Nights'
            ],
            selectedValue: '',
            label: '🍺 How often do you drink',
            visibleCount: 2
        },
        smokeOption: {
            list: [
                'Non-smoker',
                'Smoker',
                'Social smoker',
                'Smoker when drinking',
                'Trying to quit',
                'Most Nights'
            ],
            selectedValue: '',
            label: '🚬 How often do you smoke',
            visibleCount: 2
        },
        workoutOption: {
            list: ['Everyday',
                'Often',
                'Sometimes',
                'Never'],
            selectedValue: '',
            label: '💪 Do you workout?',
            visibleCount: 1
        },
        petOption: {
            list: [
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

            ],
            selectedValue: '',
            label: '🐈 Do you have any pets?',
            visibleCount: 2
        },
        interested: {
            list: ["Harry Potter", "SoundCloud", "Spa", "Self Care", "Heavy Metal", "House Parties",
                "Gin tonic", "Gymnastics", "Ludo", "Maggi", "Hot Yoga", "Documentaries",
                "Biryani", "Drama shows", "Meditation", "Foodie", "Sushi", "Spotify", "Hockey",
                "Basketball", "Fantasy movies", "Slam Poetry", "Home Workout", "Theater",
                "Cafe hopping", "Sneakers", "Aquarium", "Instagram", "Hot Springs", "Walking",
                "Running", "Travel", "Language Exchange", "Movies", "Action movies",
                "Animated movies", "Crime shows"],
            selectedValue: '',
            label: '🧭 What are you into?',
            visibleCount: 3
        },
        education: {
            list: ["Bachelors", "In College", "High School",
                "PhD", "In Grad School", "Masters",
                "Trade School"],
            selectedValue: '',
            label: '📙What is your education level?',
            visibleCount: 2
        },
        zodiacSign: {
            list: ["Capricorn", "Aquarius", "Pisces", "Aries",
                "Taurus", "Gemini", "Cancer", "Leo",
                "Virgo", "Libra", "Scorpio", "Sagittarius"],
            selectedValue: '',
            label: 'What is your zodiac sign?',
            visibleCount: 2
        },
    })


    const imageListInit = Array.from({ length: 6 }).fill({ imageuri: '', file: '' })
    const [imageList, setImageList] = useState(imageListInit)


    const onSelection = useCallback((value: string, keyToUpdate: any) => {
        setSelectOption((prev: any) => {
            return {
                ...prev,
                [keyToUpdate]: {
                    ...prev[keyToUpdate],
                    selectedValue: value
                }
            }
        });
    }, [])


    const handleImageUpload = (event: any, index: any) => {
        console.log('index', index)
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            // Create a new array and update the specific index
            const newImageList = imageList.map((item: any, i: number) =>
                i === index ? { ...item, imageuri: imageUrl, file: file } : item
            );

            setImageList(newImageList)
        }
    }

    console.log('imageList', selectOption)
    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4">

                <h1 className="font-bold my-4 sticky top-0 bg-gray-100 w-full h-10 flex items-center justify-center z-40">

                    <Typography sx={{ color: "text.secondary", }}>Profile Details</Typography>
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
                                <OptionSelector options={selectOption.gender.list} label={selectOption.gender.label} visibleCount={selectOption.gender.visibleCount} selectedOption={selectOption.gender.selectedValue} onSelect={(value) => onSelection(value, 'gender')} />
                            </div>

                        </div>


                        <div className="col-span-6" >
                            <Typography variant="subtitle1" className="mb-2">Profile Photos</Typography>
                            <div className="flex flex-wrap">
                                {imageList.map((imgobj: any, index: any) => (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            key={index}
                                            id={`file-upload-${index}`}
                                            className="hidden"
                                            onChange={(e) => handleImageUpload(e, index)}
                                        />
                                        <label
                                            htmlFor={`file-upload-${index}`}
                                            className="w-26 h-28 my-2 mx-2 border-dashed border-2 border-gray-400 flex justify-center items-center rounded-lg cursor-pointer bg-gray-300 relative"
                                        >
                                            <span className="text-gray-500">
                                                {imgobj?.imageuri && <img src={imgobj?.imageuri} className="h-27 w-26 rounded-lg" />}
                                            </span>
                                            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-2xl bg-red-500 text-white flex items-center justify-center">+</div>
                                        </label>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            Object.keys(selectOption).slice(1).map((selectionKey: any, selectionIndex) => {
                                return <div className='mb-4' key={selectionKey + selectionIndex}>
                                    <OptionSelector options={selectOption[selectionKey].list} label={selectOption[selectionKey].label} visibleCount={selectOption[selectionKey].visibleCount} selectedOption={selectOption[selectionKey].selectedValue} onSelect={(value) => onSelection(value, selectionKey)} />
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="fixed bottom-2 right-2">
                    <Button variant="contained">Submit</Button>
                </div>
            </div>
        </>
    )
}

export default DesktopView
