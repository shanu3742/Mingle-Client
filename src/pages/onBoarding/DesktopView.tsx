import { Button, TextField, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import OptionSelector from "@components/OptionSelector";
import { useAppDispatch, useAppSelector } from "@hooks/store.hooks";
import { IInitialState, onSelection, setImage, setInput } from "@feature/OnBoarding.slice";
import { AuthInterface, useAuth } from "@context/authContext";

const DesktopView = () => {
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

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4">
                <h1 className="font-bold my-4 sticky top-0 bg-gray-100 w-full h-10 flex items-center justify-center z-40">
                    <Typography sx={{ color: "text.secondary" }}>Profile Details</Typography>
                </h1>

                <div className="w-5/6">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <div className='mb-4'>
                                <label htmlFor="name">
                                    <Typography sx={{ color: "text.secondary", mb: 1 }}>{onBoardingForm.firstName.label}</Typography>
                                </label>
                                <TextField id="name" name="firstName" placeholder="First name" variant="outlined" size="small" fullWidth onChange={handleChange} value={onBoardingForm.firstName.selectedValue} />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="email" className="mb-1">
                                    <Typography sx={{ color: "text.secondary", mb: 1 }}>{onBoardingForm.email.label}</Typography>
                                </label>
                                <TextField id="email" name="email" variant="outlined" value={(user as any).email} size="small" fullWidth disabled />
                            </div>

                            <div className='mb-4'>
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

                            <div className='mb-4'>
                                <OptionSelector options={(onBoardingForm.selection as any).gender.list} label={onBoardingForm.selection.gender.label} visibleCount={onBoardingForm.selection.gender.visibleCount} selectedOption={onBoardingForm.selection.gender.selectedValue} onSelect={(value) => handleSelection(value, 'gender')} />
                            </div>
                        </div>

                        <div className="col-span-6">
                            <Typography variant="subtitle1" className="mb-2">{onBoardingForm.image.label}</Typography>
                            <div className="flex flex-wrap">
                                {onBoardingForm.image.list.map((imgobj: any, index: any) => (
                                    <Fragment key={(imgobj.url ?? '') + index}>
                                        <input type="file" accept="image/png, image/jpeg" key={index} id={`file-upload-${index}`} className="hidden" onChange={(e) => handleImageUpload(e, index)} />
                                        <label htmlFor={`file-upload-${index}`} className="w-26 h-28 my-2 mx-2 border-dashed border-2 border-gray-400 flex justify-center items-center rounded-lg cursor-pointer bg-gray-300 relative">
                                            <span className="text-gray-500">
                                                {imgobj?.imageuri && <img src={imgobj?.imageuri} className="h-27 w-26 rounded-lg" />}
                                            </span>
                                            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-2xl bg-red-500 text-white flex items-center justify-center">+</div>
                                        </label>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        {Object.keys(onBoardingForm.selection).slice(1).map((selectionKey: any, selectionIndex: number) => (
                            <div className='mb-4' key={selectionKey + selectionIndex}>
                                <OptionSelector options={(onBoardingForm.selection as any)[selectionKey].list} label={(onBoardingForm.selection as any)[selectionKey].label} visibleCount={(onBoardingForm.selection as any)[selectionKey].visibleCount} selectedOption={(onBoardingForm.selection as any)[selectionKey].selectedValue} onSelect={(value) => handleSelection(value, selectionKey)} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-2 right-2">
                    <Button variant="contained">Submit</Button>
                </div>
            </div>
        </>
    );
};

export default DesktopView;
