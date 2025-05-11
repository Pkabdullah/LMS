/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif','Roman'],
            },
            
       

    },
    plugins: [require("tailwindcss-animate")],
}