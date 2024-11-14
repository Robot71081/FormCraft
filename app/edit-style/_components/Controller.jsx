import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function Controller({selectedTheme,selectedGradient}) {
    const themes = [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
        "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", 
        "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", 
        "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", 
        "night", "coffee", "winter", "dim", "nord", "sunset"
    ];

    const colors = [
        'yellow', 'red', 'blue', 'teal', 'purple', 'green', 
        'pink', 'gray', 'orange', 'indigo', 'black', 'white'
    ];
    


    return (
        <div className='rounded-lg'>
            <h2 className='text-center'> Themes</h2>
            <Select onValueChange={(value)=>selectedTheme(value)}>
                <SelectTrigger className="w-full mt-4">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {themes.map((theme) => (
                        <SelectItem key={theme} value={theme}>
                            {theme}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <h2 className="text-center mt-4">Select a background color</h2>
            <Select onValueChange={selectedGradient}>
                    <SelectTrigger className="w-full mt-4">
                        <SelectValue placeholder= "Choose a Color" />
                    </SelectTrigger>
                    <SelectContent className="absolute mt-2">
                        {colors.map((color) => (
                            <SelectItem key={color} value={color}>
                                {color}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
        </div>
    )
}

export default Controller;
