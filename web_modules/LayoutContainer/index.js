import React, { Component } from "react"
import { PropTypes } from "react"
import Helmet from "react-helmet"

import Navigation from "../Navigation"
import Social from "../Social"
import Footer from "../Footer"
import GoogleAnalyticsTracker from "../GoogleAnalyticsTracker"

import styles from "./index.css"

import ogImage from "./opengraph.jpg"
import favicon from "./favicon.ico" 
import favicon192x192 from "./favicon-192x192.png"

if (typeof window !== "undefined") {
  const FontFaceObserver = require("fontfaceobserver")

  const MerriweatherObserver = new FontFaceObserver("Merriweather", {})
  const FiraSansObserver = new FontFaceObserver("Fira Sans", {})

  MerriweatherObserver.check().then(() => {
    document.body.classList.add("merriweather-loaded")
  }, () => {
    document.body.classList.remove("merriweather-loaded")
  })

  FiraSansObserver.check().then(() => {
    document.body.classList.add("fira-sans-loaded")
  }, () => {
    document.body.classList.remove("fira-sans-loaded")
  })
}

export default class LayoutContainer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <GoogleAnalyticsTracker params={ this.props.params }>
        <div className={ styles.root }>
          <Helmet

            link={ [
              { "rel": "stylesheet",
                "href":
                "https://fonts.googleapis.com/css?family=Merriweather:400,700",
              },

              { "rel": "stylesheet",
                "href":
                "https://fonts.googleapis.com/css?family=Fira+Sans:500,300,700",
              },
              {
                "rel": "shortcut icon",
                "type": "image/png",
                "href": favicon,
              },

              {
                "rel": "icon",
                "type": "image/png",
                "href": favicon192x192,
                "sizes": "192x192",
              },

            ] }

            script={ [
              { 
                type: "text/javascript",
                innerHTML: "((window.gitter = {}).chat = {}).options = {" +
                "room: 'postcss/postcss'};",
              },
              { 
                type: "text/javascript",
                src: "https://sidecar.gitter.im/dist/sidecar.v1.js",
                async: undefined,
                defer: undefined,
              },
            ] }

            meta={ [
              { property: "og:site_name", content: pkg.name },
              { property: "og:image", content: ogImage },
              { name: "twitter:site", content: `@${ pkg.twitter }` },
            ] }
          />
          <div className={ styles.children }>
            { this.props.children }
          </div>
          <Navigation />
          <Social />
          <Footer />
        </div>
      </GoogleAnalyticsTracker>
    )
  }
}
