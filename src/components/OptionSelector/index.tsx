import { Box, Drawer, Typography } from "@mui/material";
import { ReactNode, useCallback, useMemo, useState } from "react";
import './OptionSelector.scss'
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
interface OptionInterface {
    value: string,
    icon: string | ReactNode
}
interface OptionSelectorProps {
    options: Array<string | OptionInterface>; // List of all options
    label: string;
    visibleCount?: number; // How many options to show before "More" button
    selectedOption?: string | null; // Currently selected option
    onSelect: (option: string) => void; // Callback when an option is selected
}

const OptionSelector = ({
    options,
    label = 'Select an Option',
    visibleCount = 2,
    selectedOption = null,
    onSelect,
}: OptionSelectorProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(selectedOption);

    // useCallback ensures these functions are only recreated when dependencies change
    const toggleDrawer = useCallback((newOpen: boolean) => {
        setOpen(newOpen);
    }, []);

    const handleSelect = useCallback(
        (option: string) => {
            setSelected(option);
            onSelect(option);
            setOpen(false);
        },
        [onSelect] // Recreates only if `onSelect` changes
    );


    // Memoize visible & hidden options to avoid recalculating on every render
    const { visibleOptions, hiddenOptions, isObject } = useMemo(() => {
        return {
            visibleOptions: options.slice(0, visibleCount),
            hiddenOptions: options.slice(visibleCount),
            isObject: typeof options[0] === 'object'
        };
    }, [options, visibleCount]);

    return (
        <div>
            <Typography sx={{ color: "text.secondary", mb: 1 }}>{label}</Typography>
            <div>
                {visibleOptions.map((option, index) => (
                    <button
                        key={(typeof option === 'string' ? option : option.value) + index}
                        type="button"
                        onClick={() => handleSelect((typeof option === 'string' ? option : option.value))}
                        className={`py-2 px-10 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${(typeof option === 'string' ? option : option.value) === selected ? "select-active" : ""}`}
                    >
                        <span>{(typeof option === 'string' ? option : option.value)}</span>
                    </button>
                ))}

                {hiddenOptions.length > 0 && (
                    <button
                        onClick={() => toggleDrawer(true)}
                        type="button"
                        className={`py-2 px-10 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${(isObject ? hiddenOptions.map((el) => (el as OptionInterface).value) : hiddenOptions).includes(selected ?? "") ? "select-active" : ""}`}
                    >
                        {(isObject ? hiddenOptions.map((el) => (el as OptionInterface).value) : hiddenOptions).includes(selected ?? "") ? selected : "More"} <PanToolAltIcon sx={{ fontSize: 10 }} />
                    </button>
                )}
            </div>

            <Drawer anchor="bottom" open={open} onClose={() => toggleDrawer(false)}>
                <Box sx={{ minHeight: 350, p: 2 }} role="presentation">
                    <Typography sx={{ color: "text.secondary", mb: 2 }}>{label}</Typography>

                    {hiddenOptions.map((option, index) => (
                        <button
                            key={(typeof option === 'string' ? option : option.value) + index}
                            onClick={() => handleSelect((typeof option === 'string' ? option : option.value))}
                            type="button"
                            className={`py-2 px-10 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${(typeof option === 'string' ? option : option.value) === selected ? "select-active" : ""}`}>
                            {
                                isObject && <>
                                    <span className="text-2xl">{(option as OptionInterface).icon}</span>

                                    <br />
                                </>
                            }
                            <span>{(typeof option === 'string' ? option : option.value)}</span>
                        </button>
                    ))}
                </Box>
            </Drawer>
        </div>
    );
};

export default OptionSelector;
