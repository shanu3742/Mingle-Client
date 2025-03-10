import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface IOption {
    value: string;
    icon?: string; // Optional since some values don't have icons
}

export interface IOptionGroup {
    list: (string | IOption)[]; // Array of strings or Option objects
    selectedValue: string;
    label: string;
    visibleCount: number;
}

export interface ISelection {
    gender: IOptionGroup;
    interestedIn: IOptionGroup;
    lookingFor: IOptionGroup;
    drinkOption: IOptionGroup;
    smokeOption: IOptionGroup;
    workoutOption: IOptionGroup;
    petOption: IOptionGroup;
    interested: IOptionGroup;
    education: IOptionGroup;
    zodiacSign: IOptionGroup;
}

export interface IImage {
    imageuri: string;
    file: Blob | MediaSource;
}

export interface IImageList {
    list: IImage[];
    label: string;
}

export interface IInitialState {
    selection: ISelection;
    email: Omit<IOptionGroup, 'list' | 'visibleCount'>;
    firstName: Omit<IOptionGroup, 'list' | 'visibleCount'>;
    birthday: Omit<IOptionGroup, 'list' | 'visibleCount'>;
    image: IImageList;
}

export interface ISelectionPayload {
    keyToUpdate: keyof IInitialState['selection'];
    value: string;
}

export interface IImagePayload {
    file: Blob | MediaSource;
    index: number;
}

export interface IInputPayload {
    name: keyof Omit<IInitialState, 'selection' | 'image'>;
    value: string;
}

// Define the initial state using that type
const initialState: IInitialState = {
    selection: {
        gender: {
            list: ['Male', 'Female', 'Transgender', 'Non-binary', 'Genderqueer', 'Agender', 'Bigender', 'Two-Spirit', 'Demiboy', 'Demigirl', 'Genderfluid', 'Androgynous', 'Neutrois', 'Intersex', 'Pangender', 'Maverique', 'Polygender', 'Xenogender', 'Omnigender', 'Third Gender', 'Fa’afafine'],
            selectedValue: '',
            label: 'Select Gender',
            visibleCount: 2
        },
        interestedIn: {
            list: ['Men', 'Women', 'Gay', 'Lesbian', 'Demisexual'],
            selectedValue: '',
            label: '👥 Interested in',
            visibleCount: 2
        },
        lookingFor: {
            list: [
                { value: 'Long-term partner', icon: '❤️' },
                { value: 'Long-term open to short', icon: '😍' },
                { value: 'Short-term open to Long', icon: '🥂' },
                { value: 'Short-term fun', icon: '🎉' },
                { value: 'New friends', icon: '👋' },
                { value: 'Still Figuring it out', icon: '🤔' }
            ],
            selectedValue: '',
            label: '👁️ What are you looking for?',
            visibleCount: 2
        },
        drinkOption: {
            list: ['Not for me', 'Sober', 'Sober curious', 'On special occasions', 'Socially on weekends', 'Most Nights'],
            selectedValue: '',
            label: '🍺 How often do you drink',
            visibleCount: 2
        },
        smokeOption: {
            list: ['Non-smoker', 'Smoker', 'Social smoker', 'Smoker when drinking', 'Trying to quit', 'Most Nights'],
            selectedValue: '',
            label: '🚬 How often do you smoke',
            visibleCount: 2
        },
        workoutOption: {
            list: ['Everyday', 'Often', 'Sometimes', 'Never'],
            selectedValue: '',
            label: '💪 Do you workout?',
            visibleCount: 1
        },
        petOption: {
            list: [
                { value: 'Dog', icon: '🐶' },
                { value: 'Cat', icon: '🐈‍' },
                { value: 'Reptile', icon: '🦎' },
                { value: 'Amphibian', icon: '🐸' },
                { value: 'Bird', icon: '🐥' },
                { value: 'Fish', icon: '🐟' }
            ],
            selectedValue: '',
            label: '🐈 Do you have any pets?',
            visibleCount: 2
        },
        interested: {
            list: ['Movies', 'Music', 'Sports', 'Travel', 'Gaming', 'Reading'],
            selectedValue: '',
            label: '🧭 What are you into?',
            visibleCount: 3
        },
        education: {
            list: ['Bachelors', 'Masters', 'PhD', 'Trade School'],
            selectedValue: '',
            label: '📙 What is your education level?',
            visibleCount: 2
        },
        zodiacSign: {
            list: ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'],
            selectedValue: '',
            label: 'What is your zodiac sign?',
            visibleCount: 2
        }
    },
    email: {
        selectedValue: '',
        label: '✉️ Email'
    },
    firstName: {
        selectedValue: '',
        label: 'First name'
    },
    birthday: {
        selectedValue: '',
        label: '🎂 Birthday'
    },
    image: {
        list: Array.from({ length: 6 }, () => ({ imageuri: '', file: new Blob() })),
        label: '🌌 Profile Photo'
    }
};

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        onSelection: (state, action: PayloadAction<ISelectionPayload>) => {
            const { keyToUpdate, value } = action.payload;
            state.selection[keyToUpdate].selectedValue = value;
        },
        setImage: (state, action: PayloadAction<IImagePayload>) => {
            const { file, index } = action.payload;
            if (state.image.list[index]) {
                URL.revokeObjectURL(state.image.list[index].imageuri);
                state.image.list[index].imageuri = URL.createObjectURL(file);
                state.image.list[index].file = file;
            }
        },
        setInput: (state, action: PayloadAction<IInputPayload>) => {
            const { name, value } = action.payload;
            state[name].selectedValue = value;
        }
    }
});

export const { onSelection, setImage, setInput } = onboardingSlice.actions;
export default onboardingSlice.reducer;
