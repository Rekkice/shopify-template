// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    nitro: {
        preset: 'netlify'
    },
    modules: [
        "@nuxtjs/tailwindcss",
        "nuxt-graphql-client",
        "@pinia/nuxt",
        '@pinia-plugin-persistedstate/nuxt',
        '@kevinmarrec/nuxt-pwa',
        ],
    pwa: {
        meta: {
            ogSiteName: "Shopify store",
            ogType: "website",
            ogTitle: false,
            ogDescription: false,
            mobileAppIOS: true,
        },
        manifest: {
            name: "Shopify store",
            description: "PWA for Shopify store.",
            theme_color: "#f4f4f5",
            lang: "en",
            shortcuts: [{
                    name: "Home",
                    short_name: "Home",
                    url: "/",
                    icons: [{ src: "/icon.png", sizes: "192x192", type: "png", purpose: "any" }]
                },
                {
                    name: "Catalog",
                    short_name: "Catalog",
                    url: "/catalog",
                    icons: [{ src: "/icon.png", sizes: "192x192", type: "png", purpose: "any" }]
                },
                {
                    name: "Contact",
                    short_name: "Contact",
                    url: "/contact",
                    icons: [{ src: "/icon.png", sizes: "192x192", type: "png", purpose: "any" }]
                }
            ]
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: "en"
            }
        }
    },
    runtimeConfig: {
        public: {
            "graphql-client": {
                clients: {
                    default: {
                        host: "https://lekktheme.myshopify.com/api/2022-10/graphql.json",
                        token: {
                            name: 'X-Shopify-Storefront-Access-Token',
                            value: 'a1294511bae9e568570e5cc19ab3d219',
                            type: null
                        },
                        retainToken: true,
                    }
                }
            }
        }
    }, 
})
