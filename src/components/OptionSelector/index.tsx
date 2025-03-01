import { Box, Drawer, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import './OptionSelector.scss'
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

interface OptionSelectorProps {
    options: string[]; // List of all options
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
    const { visibleOptions, hiddenOptions } = useMemo(() => {
        return {
            visibleOptions: options.slice(0, visibleCount),
            hiddenOptions: options.slice(visibleCount),
        };
    }, [options, visibleCount]);

    return (
        <div>
            <Typography sx={{ color: "text.secondary", mb: 1 }}>{label}</Typography>
            <div>
                {visibleOptions.map((option, index) => (
                    <button
                        key={option + index}
                        type="button"
                        onClick={() => handleSelect(option)}
                        className={`py-2 px-10 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${option === selected ? "select-active" : ""}`}
                    >
                        {option}
                    </button>
                ))}

                {hiddenOptions.length > 0 && (
                    <button
                        onClick={() => toggleDrawer(true)}
                        type="button"
                        className={`py-2 px-10 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${hiddenOptions.includes(selected ?? "") ? "select-active" : ""}`}
                    >
                        {hiddenOptions.includes(selected ?? "") ? selected : "More"} <PanToolAltIcon sx={{ fontSize: 10 }} />
                    </button>
                )}
            </div>

            <Drawer anchor="bottom" open={open} onClose={() => toggleDrawer(false)}>
                <Box sx={{ minHeight: 350, p: 2 }} role="presentation">
                    <Typography sx={{ color: "text.secondary", mb: 2 }}>{label}</Typography>

                    {hiddenOptions.map((option, index) => (
                        <button
                            key={option + index}
                            onClick={() => handleSelect(option)}
                            type="button"
                            className={`py-2 px-10 me-2 mb-2 text-sm bg-white rounded-lg border border-gray-200 hover:text-gray-400 hover:bg-gray-100 hover:border-gray-950 ${option === selected ? "select-active" : ""}`}>
                            {option}
                        </button>
                    ))}
                </Box>
            </Drawer>
        </div>
    );
};

export default OptionSelector;
