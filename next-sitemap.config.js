/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://yoel.pw',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' }, 
            { userAgent: '*', disallow: '/node_modules/' },
            { userAgent: '*', disallow: '/src/' },
            { userAgent: '*', disallow: '/build/' },
            { userAgent: '*', disallow: '/.git/' },
            { userAgent: '*', disallow: '/pnpm-lock.yaml' },
            { userAgent: '*', disallow: '/package.json' },
            { userAgent: '*', disallow: '/package-lock.json' },
            { userAgent: '*', disallow: '/webpack.config.js' },
            { userAgent: '*', disallow: '/*?*' }, 
            { userAgent: '*', disallow: '/static/media/sensitive-image.jpg' },
            { userAgent: '*', disallow: '/admin/' },
            { userAgent: '*', disallow: '/private/' },
            { userAgent: '*', disallow: '/config/' },
            { userAgent: '*', disallow: '/secrets/' },
            { userAgent: '*', disallow: '/staging/' },
            { userAgent: '*', disallow: '/temp/' }
        ],
        additionalSitemaps: [
            'https://yoel.pw/sitemap.xml'
        ],
    },

    changefreq: 'monthly',
    priority: 0.7,
};
