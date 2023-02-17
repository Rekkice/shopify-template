export default {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        template: {
        
            "primary": "#000000",
                    
            "secondary": "#FFFFFF",
                    
            "accent": "#1FB2A6",
                    
            "neutral": "#1E151E",
                    
            "base-100": "#FFFFFF",
                    
            "info": "#3ABFF8",
                    
            "success": "#36D399",
                    
            "warning": "#FBBD23",
                    
            "error": "#F87272",
        },
      },
    ],
  },
}