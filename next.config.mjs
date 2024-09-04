import loaderUtils from 'loader-utils'
import path from 'path'
import { fileURLToPath } from 'url'

// __filename ve __dirname'i yeniden oluştur
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  )
}

/**
 * Generate context-aware class names when developing locally
 */
const localIdent = (loaderContext, localIdentName, localName, options) => {
  return (
    loaderUtils
      .interpolateName(loaderContext, localName, options)
      // Webpack name interpolation returns `about_about.module__root` for
      // `.root {}` inside a file named `about/about.module.css`. Let's simplify
      // this.
      .replace(/\.module_/, '_')
      // Replace invalid symbols with underscores instead of escaping
      // https://mathiasbynens.be/notes/css-escapes#identifiers-strings
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      // "they cannot start with a digit, two hyphens, or a hyphen followed by a digit [sic]"
      // https://www.w3.org/TR/CSS21/syndata.html#characters
      .replace(/^(\d|--|-\d)/, '__$1')
  )
}

function cssLoaderOptions(modules) {
  const { getLocalIdent, ...others } = modules // Need to delete getLocalIdent else localIdentName doesn't work
  return {
    ...others,
    getLocalIdent: localIdent,
    mode: 'local',
  }
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: true,
    instrumentationHook: true
  },
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'flagcdn.com'
      }
    ],
  },
  /*i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
  },*/
  rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "https://orleansmc.com/uploads/:path*",
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/mustafacan",
        destination: "https://mustafacan.dev",
        permanent: true,
      },
      {
        source: "/kredi-yukle",
        destination: "https://buymeacoffee.com/orleansmc/extras",
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/BZvA97B6UZ',
        permanent: true,
      },
      {
        source: '/destek',
        destination: 'https://discord.gg/BZvA97B6UZ',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/mustqfacan',
        permanent: true,
      },
    ];
  },
  webpack: config => {
    config.resolve.modules.push(path.resolve('./'))
    const oneOf = config.module.rules.find((rule) => typeof rule.oneOf === 'object')

    if (oneOf) {
      // Find the module which targets *.scss|*.sass files
      const moduleSassRule = oneOf.oneOf.find(
        (rule) => regexEqual(rule.test, /\.module\.(scss|sass)$/) //highlight-line
      )

      if (moduleSassRule) {
        // Get the config object for css-loader plugin
        const cssLoader = moduleSassRule.use.find(
          ({ loader }) => loader.includes('css-loader') //highlight-line
        )

        if (cssLoader) {
          cssLoader.options = {
            ...cssLoader.options,
            modules: cssLoaderOptions(cssLoader.options.modules), //highlight-line

          }
        }
      }
    }

    return config

  },
}

export default nextConfig