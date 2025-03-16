import { AuthInterface, useAuth } from "@context/authContext";
import { IInitialState, onSelection, setImage, setInput } from "@feature/OnBoarding.slice";
import { useAppDispatch, useAppSelector } from "@hooks/store.hooks";
import { Button, LinearProgress, Tab, Tabs, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Fragment, useCallback, useEffect, useState } from "react";
import OptionSelector from "@components/OptionSelector";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { red } from "@mui/material/colors";

const MobileView = () => {

    const { user } = useAuth() as AuthInterface;
    const onBoardingForm = useAppSelector((selector) => selector.onBoarding);
    let formLength = (Object.keys(onBoardingForm).length - 1) + Object.keys(onBoardingForm.selection).length
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
        let value = (user as any)?.email;
        let name: keyof Omit<IInitialState, 'selection' | 'image'> = 'email';
        dispatch(setInput({ name, value }));
    }, [(user as any)?.email]);

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

    let percentPerIndex = 100 / (formLength - 1)
    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        const onDisabled = () => {
            if (selectedTabIndex === 0) return !onBoardingForm.firstName.selectedValue;
            if (selectedTabIndex === 2) return !onBoardingForm.birthday.selectedValue;
            if (selectedTabIndex === 1) return false;
            if (selectedTabIndex === 3) return !onBoardingForm.selection.gender.selectedValue;

            let keys = Object.keys(onBoardingForm.selection).slice(1);
            let selectedKey = keys[selectedTabIndex - 4];
            return selectedKey ? !(onBoardingForm.selection as any)[selectedKey]?.selectedValue : true;
        };

        setDisabled(onDisabled());
    }, [onBoardingForm, selectedTabIndex]);

    return (
        <div className="flex min-h-screen flex-col  bg-gray-100 px-2">
            <div className="fixed top-0 left-0">
                <div className="min-w-screen">
                    <LinearProgress variant="determinate" value={selectedTabIndex * percentPerIndex} />
                </div>
            </div>
            <div >
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    className="tab-conatainer"
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >

                    <Tab value="dec" label={<>👈<br /> Previous</>} onClick={() => handleTabIncDec('dec')} />
                    <Tab disabled={disabled!} value="inc" label={<>👉 <br /> Next</>} onClick={() => handleTabIncDec('inc')} sx={{ display: formLength - 1 === selectedTabIndex ? 'none' : 'block' }} />

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
                            <TextField id="email" name="email" variant="outlined" value={(user as any)?.email} size="small" fullWidth disabled />
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
                    // selectedTabIndex === 4 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                    //     {selectedTabIndex}
                    // </div>
                    <>
                        {Object.keys(onBoardingForm.selection).slice(1).map((selectionKey: any, selectionIndex: number) => (
                            selectedTabIndex === selectionIndex + 4 && <div className={`my-4 ${selectedTab === 'inc' ? 'forward' : 'backward'}`} key={selectionKey + selectionIndex}>
                                <OptionSelector options={(onBoardingForm.selection as any)[selectionKey].list} label={(onBoardingForm.selection as any)[selectionKey].label} visibleCount={(onBoardingForm.selection as any)[selectionKey].visibleCount} selectedOption={(onBoardingForm.selection as any)[selectionKey].selectedValue} onSelect={(value) => handleSelection(value, selectionKey)} />
                            </div>
                        ))}
                    </>
                }

                {
                    selectedTabIndex === 13 && <div className={`${selectedTab === 'inc' ? 'forward' : 'backward'}`}>
                        <div >
                            <Typography variant="subtitle1" className="mb-2">{onBoardingForm.image.label}</Typography>
                            <div className="flex flex-wrap justify-center">
                                {onBoardingForm.image.list.map((imgobj: any, index: any) => (
                                    <Fragment key={(imgobj.url ?? '') + index}>
                                        <input type="file" accept="image/png, image/jpeg" key={index} id={`file-upload-${index}`} className="hidden" onChange={(e) => handleImageUpload(e, index)} />
                                        <label htmlFor={`file-upload-${index}`} className="w-24 h-28 my-2 mx-2 border-dashed border-2 border-gray-400 flex justify-center items-center rounded-lg cursor-pointer bg-gray-300 relative">
                                            <span className="text-gray-500">
                                                {imgobj?.imageuri && <img src={imgobj?.imageuri} className="h-27 w-24 rounded-lg" />}
                                            </span>
                                            <div className="absolute -bottom-2 -right-2 rounded-full bg-white flex">
                                                <AddCircleIcon sx={{ color: red[500] }} />
                                            </div>
                                        </label>
                                    </Fragment>
                                ))}
                            </div>

                            <div className="fixed bottom-2 right-2">
                                <Button variant="contained">Submit</Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MobileView
