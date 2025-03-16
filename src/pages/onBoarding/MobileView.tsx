import { AuthInterface, useAuth } from "@context/authContext";
import { IInitialState, onSelection, setImage, setInput } from "@feature/OnBoarding.slice";
import { useAppDispatch, useAppSelector } from "@hooks/store.hooks";
import { Tab, Tabs, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCallback, useEffect, useState } from "react";
import OptionSelector from "@components/OptionSelector";

const MobileView = () => {

    const { user } = useAuth() as AuthInterface;
    const onBoardingForm = useAppSelector((selector) => selector.onBoarding);
    const dispatch = useAppDispatch();

    const handleSelection = useCallback((value: string, keyToUpdate: any) => {
        dispatch(onSelection({ value: value, keyToUpdate } as any));
    }, []);

    const handleImageUpload = (event: any, index: number) => {
        const file = event.target.files[0];
        if (file) {
            dispatch(setImage({ file: file, index } as any));
        }
    };

    useEffect(() => {
        let value = (user as any).email;
        let name: keyof Omit<IInitialState, 'selection' | 'image'> = 'email';
        dispatch(setInput({ name, value }));
    }, [(user as any).email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let name: keyof Omit<IInitialState, 'selection' | 'image'> = e.target.name as keyof Omit<IInitialState, 'selection' | 'image'>;
        let value = e.target.value;
        dispatch(setInput({ name, value }));
    };

    const getDate = (date: any) => {
        if (date) {
            const name: keyof Omit<IInitialState, 'selection' | 'image'> = 'birthday';
            const value = date.format('MM/DD/YYYY');
            dispatch(setInput({ name, value }));
        }
    };

    console.log('onBoardingForm', onBoardingForm);

    const [selectedTab, setSelectedTab] = useState('inc');
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    };
    const handleTabIncDec = (type = 'inc') => {
        let length = (Object.keys(onBoardingForm).length - 1) + Object.keys(onBoardingForm.selection).length
        if (type === 'inc') {
            setSelectedTabIndex((prev) => {
                if (prev === length - 1) {
                    return prev
                } else {
                    return prev + 1
                }
            })
        }

        if (type === 'dec') {
            setSelectedTabIndex((prev) => {
                if (prev === 0) {
                    return 0
                } else {
                    return prev - 1
                }
            })
        }
    };


    console.log(selectedTabIndex)
    return (
        <div className="flex min-h-screen flex-col  bg-gray-100">
            <div className="min-w-screen">
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    className="tab-conatainer"
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >

                    <Tab value="dec" label={<>👈<br /> Previous</>} onClick={() => handleTabIncDec('dec')} />
                    <Tab value="inc" label={<>👉 <br /> Next</>} onClick={() => handleTabIncDec('inc')} />

                </Tabs>
            </div>
            <div className={`tab-page-view`}>
                {
                    selectedTabIndex === 0 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        <div className='my-4'>
                            <label htmlFor="name">
                                <Typography sx={{ color: "text.secondary", mb: 1 }}>{onBoardingForm.firstName.label}</Typography>
                            </label>
                            <TextField id="name" name="firstName" placeholder="First name" variant="outlined" size="small" fullWidth onChange={handleChange} value={onBoardingForm.firstName.selectedValue} />
                        </div>
                    </div>
                }
                {
                    selectedTabIndex === 1 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        <div className='my-4'>
                            <label htmlFor="email" className="mb-1">
                                <Typography sx={{ color: "text.secondary", mb: 1 }}>{onBoardingForm.email.label}</Typography>
                            </label>
                            <TextField id="email" name="email" variant="outlined" value={(user as any).email} size="small" fullWidth disabled />
                        </div>
                    </div>
                }
                {
                    selectedTabIndex === 2 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        <div className='my-4'>
                            <Typography sx={{ color: "text.secondary", mb: 1 }}>{onBoardingForm.birthday.label}</Typography>
                            <div className="flex gap-2">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        slotProps={{
                                            textField: {
                                                sx: {
                                                    "& .MuiInputBase-root": {
                                                        padding: "4px",
                                                        minHeight: "30px",
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        padding: "4px",
                                                        paddingRight: "10px",
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        padding: "2px",
                                                    },
                                                },
                                            },
                                        }}
                                        onChange={getDate}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>

                    </div>
                }
                {
                    selectedTabIndex === 3 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        <div className='my-4'>
                            <OptionSelector options={(onBoardingForm.selection as any).gender.list} label={onBoardingForm.selection.gender.label} visibleCount={onBoardingForm.selection.gender.visibleCount} selectedOption={onBoardingForm.selection.gender.selectedValue} onSelect={(value) => handleSelection(value, 'gender')} />
                        </div>
                    </div>
                }
                {
                    selectedTabIndex === 4 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 5 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 6 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 7 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 8 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 9 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 10 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 11 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 12 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
                {
                    selectedTabIndex === 13 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        {selectedTabIndex}
                    </div>
                }
            </div>
        </div>
    )
}

export default MobileView
