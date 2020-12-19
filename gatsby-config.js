/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: "Statify",
        menuLinks: [
            {
                name: "Connect",
                link: "/",
            },
            {
                name: "Home",
                link: "/home",
            },
            {
                name: "404",
                link: "/404",
            },
            {
                name: "Redirect",
                link: "/redirect",
            },
            {
                name: "Search",
                link: "/search",
            },
            {
                name: "Your Data",
                link: "/your-data",
            },
        ],
    },
    plugins: [
        {
            resolve: `gatsby-plugin-polyfill-io`,
            options: {
                features: [`Array.prototype.map`, `fetch`],
            },
        },
    ],
}
