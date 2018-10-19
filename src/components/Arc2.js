import React from 'react'

export default class Arc2 extends React.Component {
  constructor(props) {
    super(props)

    this.path1 = React.createRef()
    this.path2 = React.createRef()

    this.state = {
      path1Highlight: false,
      path2Highlight: false
    }
  }

  highlightPath1 = () => {
    this.setState({
      path1Highlight: true,
      path2Highlight: false
    })
  }

  highlightPath2 = () => {
    this.setState({
      path1Highlight: false,
      path2Highlight: true
    })
  }

  componentDidMount () {
    this.path1.current.addEventListener('click', this.highlightPath1)
    this.path2.current.addEventListener('click', this.highlightPath2)
  }

  componentWillUnMount () {
    this.path1.current.removeEventListener('click', this.highlightPath1)
    this.path2.current.removeEventListener('click', this.highlightPath2)
  }

  render () {
    return (
      <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 1080 487.76" {...this.props}>
        <defs>
          <style>
            {`.cls-2{fill:#ddc272}.cls-3{fill:none}.cls-9{fill:#c4a660;stroke:#9c834c;stroke-miterlimit:10}`}
          </style>
          <linearGradient
            id="linear-gradient"
            x1={-766.422}
            y1={1775.612}
            x2={478.88}
            y2={-381.313}
            gradientTransform="rotate(-76.736 614.123 -111.082)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#c4a660" />
            <stop offset={1} stopColor="#85aca9" />
          </linearGradient>
          <radialGradient
            id="radial-gradient"
            cx={-1065.643}
            cy={350.024}
            r={1202.193}
            gradientTransform="rotate(-76.736 614.123 -111.082)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#c4a660" />
            <stop offset={0.011} stopColor="#c4a660" />
            <stop offset={0.462} stopColor="#cdb06b" />
            <stop offset={1} stopColor="#d0b36e" />
          </radialGradient>
        </defs>
        <title>{`arc2_v03`}</title>
        <path
          d="M955.414 467.721A1246.077 1246.077 0 0 1 1207 556.2V283.22a1246.016 1246.016 0 0 0-251.586-88.479C665.5 126.4 375.362 165.778 127 286.88v272.98c248.362-121.102 538.5-160.48 828.414-92.139z"
          transform="translate(-127 -76.236)"
          fill="#fff"
        />
        <path
          className="cls-2"
          d="M955.414 194.741A1246.016 1246.016 0 0 1 1207 283.22v-20.358a1264.742 1264.742 0 0 0-413.267-112.825C556.292 126.838 327.78 170.787 127 266.37v20.51c248.362-121.102 538.5-160.48 828.414-92.139z"
          transform="translate(-127 -76.236)"
        />
        <path
          className="cls-2"
          d="M793.733 151.037A1264.742 1264.742 0 0 1 1207 263.862V191.9A1347.92 1347.92 0 0 0 801.72 87.4C562.673 64.042 332.128 104.607 127 195.119v72.251c200.78-95.583 429.292-139.532 666.733-116.333z"
          transform="translate(-127 -76.236)"
        />
        <path
          className="cls-3"
          d="M793.975 148.549a1276.27 1276.27 0 0 1 280.449 59.664A1260.615 1260.615 0 0 1 1207 261.141V192.5a1339.281 1339.281 0 0 0-1080 3.267v68.817a1263.243 1263.243 0 0 1 666.975-116.035z"
          transform="translate(-127 -76.236)"
        />
        <path
          d="M801.476 87.574A1343.494 1343.494 0 0 1 1207 192.52v-5.428a1351.894 1351.894 0 0 0-1080 3.244v5.43A1346.1 1346.1 0 0 1 801.476 87.574z"
          transform="translate(-127 -76.236)"
          fill="#c4a660"
        />
        <path
          className="cls-3"
          d="M457.086 177.248c165.824-28.954 333.68-23.887 498.9 15.059A1248.533 1248.533 0 0 1 1207 280.457v-14.821a1255.635 1255.635 0 0 0-134.161-53.681A1272.529 1272.529 0 0 0 379.9 180.044 1256.833 1256.833 0 0 0 127 269.123v15q47.151-22.938 96-41.834a1244.543 1244.543 0 0 1 234.086-65.041z"
          transform="translate(-127 -76.236)"
        />
        <path
          d="M793.49 152.526a1271.218 1271.218 0 0 1 279.349 59.429A1255.635 1255.635 0 0 1 1207 265.636v-5.516a1260.676 1260.676 0 0 0-132.575-52.907 1277.509 1277.509 0 0 0-695.678-32.035A1261.861 1261.861 0 0 0 127 263.579v5.544a1258.2 1258.2 0 0 1 666.49-116.6z"
          transform="translate(-127 -76.236)"
          fill="#ba9e5b"
        />
        <path
          className="cls-3"
          d="M456.914 449.244c165.958-28.978 333.949-23.907 499.3 15.071A1249.461 1249.461 0 0 1 1207 552.328V287.109a1242.294 1242.294 0 0 0-252.388-88.961c-164.429-38.761-331.474-43.8-496.494-14.989a1238.387 1238.387 0 0 0-232.957 64.722Q175.27 267.164 127 290.8v265.188q46.98-22.832 95.637-41.656a1245.484 1245.484 0 0 1 234.277-65.088z"
          transform="translate(-127 -76.236)"
        />
        <g opacity={0.3}>
          <path
            className="cls-2"
            ref={this.path1}
            style={{ opacity: (this.state.path1Highlight) ? 1 : 0 }}
            d="M127.3 286.573l41.916 253.536A1239.541 1239.541 0 0 1 499.3 446.076l-16.28-270.591A1240.941 1240.941 0 0 0 127.3 286.573zM1206.7 283.206a1246.027 1246.027 0 0 0-251.587-88.48q-52.092-12.279-104.121-19.95l-16.286 270.667q60.1 8.1 120.4 22.263a1248.431 1248.431 0 0 1 211.031 70.016l40.556-245.3z"
            transform="translate(-127 -76.236)"
          />
          <path
            className="cls-2"
            ref={this.path2}
            style={{ opacity: (this.state.path2Highlight) ? 1 : 0 }}
            d="M483.019 175.485L499.3 446.076a1234.218 1234.218 0 0 1 335.407-.633l16.283-270.667a1234.414 1234.414 0 0 0-367.971.709z"
            transform="translate(-127 -76.236)"
          />
        </g>
        <path
          d="M458.118 183.159c165.02-28.814 332.065-23.772 496.494 14.989A1242.294 1242.294 0 0 1 1207 287.109v-7.77a1249.544 1249.544 0 0 0-250.783-88c-165.354-38.978-333.345-44.049-499.3-15.071a1245.559 1245.559 0 0 0-234.277 65.088q-48.582 18.772-95.64 41.651v7.8q48.186-23.582 98.161-42.922a1238.387 1238.387 0 0 1 232.957-64.726z"
          transform="translate(-127 -76.236)"
          fill="url(#linear-gradient)"
        />
        <path
          d="M458.161 456.325c164.994-28.809 332.017-23.768 496.418 14.986A1242.184 1242.184 0 0 1 1207 560.29v-8.185a1249.641 1249.641 0 0 0-250.727-87.973c-165.378-38.984-333.4-44.057-499.38-15.074a1245.715 1245.715 0 0 0-234.313 65.1q-48.551 18.765-95.58 41.627V564q48.224-23.6 98.24-42.958a1238.273 1238.273 0 0 1 232.921-64.717z"
          transform="translate(-127 -76.236)"
          fill="url(#radial-gradient)"
        />
        <path
          className="cls-9"
          d="M356.414 137.833a3.04 3.04 0 0 0-3.515-2.183l-9.192 2.4 7.565 28.979a3.13 3.13 0 0 0 1.5 1.882 3.077 3.077 0 0 0 2.381.309l.629-.164.126.484-10.595 2.766-.125-.484.628-.164a3.208 3.208 0 0 0 2.326-3.76l-7.579-29.027-9.191 2.4a2.851 2.851 0 0 0-1.726 1.406 2.924 2.924 0 0 0-.274 2.217l.215.822-.472.175-1.591-6.1a13.858 13.858 0 0 0 2.667-.076 21.368 21.368 0 0 0 3.366-.569l16.351-4.269a18.605 18.605 0 0 0 3.849-1.392 17.276 17.276 0 0 0 1.778-1.007l1.592 6.1-.5.077zM392.548 160.208a3.077 3.077 0 0 0 1.966-1.376 3.137 3.137 0 0 0 .456-2.363l-2.908-12.619-19.928 4.592 2.9 12.571a2.993 2.993 0 0 0 1.425 1.955 3.114 3.114 0 0 0 2.4.4l.634-.146.113.487-10.67 2.459-.113-.487.633-.146a3.034 3.034 0 0 0 1.961-1.4 3.22 3.22 0 0 0 .45-2.387l-6.235-27.048a3.135 3.135 0 0 0-1.444-1.925 3.083 3.083 0 0 0-2.371-.378l-.633.146-.113-.487 10.671-2.459.112.487-.633.146a3.077 3.077 0 0 0-1.966 1.377 3.123 3.123 0 0 0-.456 2.363l3 13.008 19.928-4.592-3-13.009a3.038 3.038 0 0 0-2.166-2.272 3.36 3.36 0 0 0-1.649-.03l-.634.146-.112-.488 10.67-2.459.112.488-.633.146a3.031 3.031 0 0 0-1.961 1.4 3.221 3.221 0 0 0-.45 2.387l6.222 26.992a3.214 3.214 0 0 0 1.449 1.949 3.029 3.029 0 0 0 2.376.4l.634-.146.112.487-10.671 2.459-.112-.487zM409.6 156.475a3.036 3.036 0 0 0 2-1.346 3.219 3.219 0 0 0 .517-2.374l-5.521-27.45a3.21 3.21 0 0 0-1.429-1.778 3.072 3.072 0 0 0-2.27-.385l-.588.119-.148-.481 14.363-2.888a20.984 20.984 0 0 0 3.249-.96 13.834 13.834 0 0 0 2.406-1.1l1.242 6.176-.49.1-.177-.882a2.948 2.948 0 0 0-3.327-2.34l-10 2.011 3.047 15.146 8.284-1.666a2.5 2.5 0 0 0 1.518-1.07 2.368 2.368 0 0 0 .341-1.854l-.137-.686.49-.1 1.557 7.745-.49.1-.147-.736a2.362 2.362 0 0 0-1-1.533 2.414 2.414 0 0 0-1.79-.405l-8.333 1.676 2.947 14.656 7.01-1.409a8.531 8.531 0 0 0 5.214-2.732 12.23 12.23 0 0 0 2.219-5.445l.49-.1L429.4 153l-20.342 4.092-.1-.49zM468.067 141.728q-5.668-4.2-6.894-12.28t2.943-13.772q4.17-5.69 12.277-6.919a21.012 21.012 0 0 1 12.225 1.584l2.046 6.821-.445.067a11.1 11.1 0 0 0-5.393-5.883 13.591 13.591 0 0 0-8.209-1.106 13.141 13.141 0 0 0-9.674 6.069q-3.2 5.088-2.074 12.5t5.643 11.357a13.175 13.175 0 0 0 10.817 3.138 14.334 14.334 0 0 0 8.787-4.418q3.51-3.87 3.233-11.363l.4-.06.584 7.851q-3.382 8.049-12.774 9.473a17.543 17.543 0 0 1-13.492-3.059zM503.684 109.968q4.345-5.577 12.29-6.522t13.5 3.454q5.558 4.4 6.52 12.492t-3.408 13.673q-4.373 5.582-12.316 6.526t-13.47-3.458q-5.536-4.4-6.5-12.5t3.384-13.665zm5.715 24.773a13.721 13.721 0 0 0 20.357-2.421q3.3-5.025 2.419-12.473a20.724 20.724 0 0 0-2.772-8.482 13.126 13.126 0 0 0-13.252-6.43 12.71 12.71 0 0 0-9.61 5.775q-3.3 5.028-2.419 12.474t5.278 11.557zM585 132.218l.8-.067.042.5-10.813.906-.037-.449.747-.063a1.87 1.87 0 0 0 1.389-.793 1.815 1.815 0 0 0 .375-1.512l-4.341-24.874-8.514 24.144a19.655 19.655 0 0 0-1.269 5.224l-.5.042-15.079-26.587-.1 24.544a2.01 2.01 0 0 0 2.073 1.984l.8-.067.037.449-9.666.809-.041-.5.8-.067a3.68 3.68 0 0 0 2.346-1.049 3.481 3.481 0 0 0 1.028-2.4l1.064-32.251.5-.041 16.417 28.881 11.08-31.181.448-.038 6.511 31.617a3.323 3.323 0 0 0 2.226 2.624 3.852 3.852 0 0 0 1.677.215zM612.082 105.967a9.437 9.437 0 0 1-.681 4.142 9.313 9.313 0 0 1-5.528 5.252 7.834 7.834 0 0 1-2.47.632 11.6 11.6 0 0 1-5.4-.863l-.026-.5a9.728 9.728 0 0 0 6.7-1.158 7.371 7.371 0 0 0 3.5-4.793 6.618 6.618 0 0 0 .2-1.913c-.032-.6-.052-.965-.058-1.1a8.785 8.785 0 0 0-2.144-5.468 6.061 6.061 0 0 0-5-1.811l-5.742.306 1.59 29.807a3.206 3.206 0 0 0 1.092 2.17 3.029 3.029 0 0 0 2.271.806l.648-.035.028.5-10.935.583-.027-.5.649-.035a3.029 3.029 0 0 0 2.173-1.042 3.225 3.225 0 0 0 .855-2.274l-1.488-27.91a3.25 3.25 0 0 0-1.159-2.016 3.072 3.072 0 0 0-2.191-.709l-.6.032-.077-.5 13.032-.695a10.611 10.611 0 0 1 7.676 2.169 9.225 9.225 0 0 1 3.112 6.923zM648.732 129.654l.4-.012.014.5-11.245.339-.014-.5.449-.014a1.872 1.872 0 0 0 1.555-.722 2.121 2.121 0 0 0 .486-1.29 3.843 3.843 0 0 0-.236-1.194l-3.455-8.4-13.5.407-3.09 8.647a3.67 3.67 0 0 0-.164 1.18 2.093 2.093 0 0 0 .562 1.234 1.87 1.87 0 0 0 1.6.627l.449-.013.016.5-10.046.3-.015-.5.45-.014a4.375 4.375 0 0 0 2.425-.873 5.747 5.747 0 0 0 1.878-2.408l10.483-27.229q1.728-4.1 1.695-5.2l.449-.014 14.36 31.632a5.4 5.4 0 0 0 1.971 2.291 4.439 4.439 0 0 0 2.523.726zm-24.985-12.4l12.3-.371-6.481-15.861zM652.135 128.15a15.4 15.4 0 0 1-.167-2.7 13.456 13.456 0 0 1 .722-4.255h.451c-.032.368-.046.734-.043 1.1a7.231 7.231 0 0 0 1.881 5.063 6.316 6.316 0 0 0 4.914 1.994 7.26 7.26 0 0 0 5.163-1.933 6.271 6.271 0 0 0 1.994-4.787 6.069 6.069 0 0 0-1.98-4.663l-9.656-8.839a7.943 7.943 0 0 1-2.738-6.032 8.548 8.548 0 0 1 2.336-6.091 8.4 8.4 0 0 1 6.409-2.565 21.33 21.33 0 0 1 4.3.473l1.95-.013.039 6.15h-.45a4.7 4.7 0 0 0-1.649-3.74 6.17 6.17 0 0 0-4.183-1.373 5.854 5.854 0 0 0-4.265 1.727 5.722 5.722 0 0 0-1.7 4.261 5.792 5.792 0 0 0 2.028 4.387l9.907 9.037a8.133 8.133 0 0 1 2.54 6.284 8.953 8.953 0 0 1-2.507 6.592 9.143 9.143 0 0 1-6.784 2.617 17.742 17.742 0 0 1-4.679-.645 8.158 8.158 0 0 1-3.833-2.049zM676.5 128.061a15.465 15.465 0 0 1-.116-2.7 13.433 13.433 0 0 1 .805-4.24l.45.006q-.057.549-.065 1.1a7.248 7.248 0 0 0 1.785 5.1 6.318 6.318 0 0 0 4.874 2.087 7.261 7.261 0 0 0 5.2-1.833 6.275 6.275 0 0 0 2.086-4.749 6.075 6.075 0 0 0-1.89-4.7l-9.486-9.022a7.939 7.939 0 0 1-2.622-6.084 8.551 8.551 0 0 1 2.452-6.044 8.4 8.4 0 0 1 6.457-2.442 21.357 21.357 0 0 1 4.293.554l1.95.025-.079 6.15-.449-.006a4.708 4.708 0 0 0-1.578-3.771 6.175 6.175 0 0 0-4.157-1.453 5.856 5.856 0 0 0-4.3 1.646 5.724 5.724 0 0 0-1.779 4.227 5.8 5.8 0 0 0 1.943 4.426l9.734 9.225a8.139 8.139 0 0 1 2.419 6.331 8.95 8.95 0 0 1-2.634 6.542 9.141 9.141 0 0 1-6.832 2.488 17.8 17.8 0 0 1-4.666-.735 8.176 8.176 0 0 1-3.795-2.128zM739.206 98.546l-3.194-.18-1.678 29.753a3.028 3.028 0 0 0 .8 2.273 3.088 3.088 0 0 0 2.219 1.052l.6.034.022.5-10.933-.616.028-.5.649.036a3.076 3.076 0 0 0 2.272-.773 3.129 3.129 0 0 0 1.1-2.142l1.561-27.7A3.222 3.222 0 0 0 731.8 98a3.035 3.035 0 0 0-2.17-1.048l-.649-.037.028-.5 13.478.761a9.826 9.826 0 0 1 7 2.923 8.732 8.732 0 0 1 2.228 6.686 10.416 10.416 0 0 1-2.862 6.8 7.621 7.621 0 0 1-6.181 2.582 6.812 6.812 0 0 1 1.7 1.473 17.9 17.9 0 0 1 1.7 2.224q3.947 6.382 5.165 7.878t1.738 2.051a14.367 14.367 0 0 0 1.14 1.091 6.761 6.761 0 0 0 1.253.872 7.029 7.029 0 0 0 3.056.873l-.028.5-2.746-.154a10.261 10.261 0 0 1-3.951-1 10.038 10.038 0 0 1-2.679-1.754 17.923 17.923 0 0 1-1.508-1.687q-.63-.811-3.428-5.377t-3.262-5.217q-.463-.651-.979-1.282a4.514 4.514 0 0 0-3.1-1.877l.029-.5a9.011 9.011 0 0 0 1.045.109q.648.036 1.6.04 6.2.2 8.08-4.753a6.547 6.547 0 0 0 .4-1.855l.063-1.123a8.8 8.8 0 0 0-1.442-5.49 5.847 5.847 0 0 0-4.32-2.447q-1.198-.114-2.992-.216zM760.586 132.859a3.031 3.031 0 0 0 2.291-.744 3.223 3.223 0 0 0 1.15-2.14l2.237-27.911a3.205 3.205 0 0 0-.886-2.1 3.071 3.071 0 0 0-2.077-.994l-.6-.048-.01-.5 14.6 1.17a20.883 20.883 0 0 0 3.389-.029 13.823 13.823 0 0 0 2.614-.392l-.5 6.279-.5-.039.071-.9a2.949 2.949 0 0 0-2.555-3.164l-10.168-.815-1.233 15.4 8.423.675a2.5 2.5 0 0 0 1.754-.612 2.374 2.374 0 0 0 .838-1.688l.055-.7.5.04-.631 7.874-.5-.039.059-.748a2.352 2.352 0 0 0-.537-1.748 2.411 2.411 0 0 0-1.609-.882l-8.473-.679-1.194 14.9 7.127.57a8.517 8.517 0 0 0 5.763-1.193 12.232 12.232 0 0 0 3.632-4.624l.5.04-3.538 7.842-20.678-1.654.041-.5zM818.681 108.066a3.039 3.039 0 0 0-2.526-3.278l-9.448-.982-3.1 29.79a3.128 3.128 0 0 0 .742 2.289 3.079 3.079 0 0 0 2.121 1.125l.646.067-.052.5-10.891-1.131.051-.5.647.067a3.2 3.2 0 0 0 3.5-2.7l3.1-29.84-9.45-.981a2.847 2.847 0 0 0-2.109.711 2.922 2.922 0 0 0-1.035 1.978l-.088.845h-.5l.65-6.266a13.881 13.881 0 0 0 2.525.866 21.4 21.4 0 0 0 3.35.65l16.81 1.746a18.5 18.5 0 0 0 4.092.048 17.225 17.225 0 0 0 2.018-.318l-.65 6.266-.492-.1zM858.414 109.205l-.794-.105a2.685 2.685 0 0 0-1.9.431 2.285 2.285 0 0 0-1.036 1.552l-2.589 19.63a12.591 12.591 0 0 1-4.9 8.886 13.518 13.518 0 0 1-10.235 2.281 14.019 14.019 0 0 1-9.422-4.848 12.294 12.294 0 0 1-2.56-9.844l2.575-19.531a2.329 2.329 0 0 0-1-2.351 2.968 2.968 0 0 0-1.3-.474l-.793-.1.065-.5 10.063 1.327-.065.5-.793-.105a2.672 2.672 0 0 0-1.923.427 2.38 2.38 0 0 0-1.019 1.606l-2.5 18.936a12.892 12.892 0 0 0 1.75 9.107 9.865 9.865 0 0 0 7.319 4.345 10.53 10.53 0 0 0 8.3-2.109 11.519 11.519 0 0 0 4.113-7.855l2.582-19.58a2.38 2.38 0 0 0-.568-1.815 2.665 2.665 0 0 0-1.746-.911l-.793-.1.066-.5 9.17 1.209zM874.692 112.841l-3.159-.508-4.733 29.421a3.03 3.03 0 0 0 .559 2.344 3.09 3.09 0 0 0 2.1 1.275l.592.095-.03.5-10.811-1.74.079-.493.642.1a3.079 3.079 0 0 0 2.34-.535 3.129 3.129 0 0 0 1.312-2.017l4.408-27.4a3.215 3.215 0 0 0-.609-2.351 3.038 3.038 0 0 0-2.05-1.268l-.642-.1.08-.493 13.329 2.144a9.83 9.83 0 0 1 6.657 3.629 8.73 8.73 0 0 1 1.527 6.88 10.415 10.415 0 0 1-3.548 6.468 7.617 7.617 0 0 1-6.413 1.931 6.834 6.834 0 0 1 1.534 1.64 17.918 17.918 0 0 1 1.464 2.387q3.269 6.756 4.326 8.369t1.517 2.219a14.537 14.537 0 0 0 1.022 1.2 6.8 6.8 0 0 0 1.156 1 7.034 7.034 0 0 0 2.95 1.184l-.08.493-2.715-.437a10.231 10.231 0 0 1-3.826-1.4 10.046 10.046 0 0 1-2.485-2.021 17.781 17.781 0 0 1-1.326-1.834q-.543-.872-2.856-5.7T874.3 132.3q-.4-.7-.843-1.376a4.515 4.515 0 0 0-2.889-2.187l.08-.493a8.845 8.845 0 0 0 1.028.216q.642.1 1.588.2 6.144.837 8.527-3.895a6.563 6.563 0 0 0 .594-1.8q.14-.862.179-1.111a8.789 8.789 0 0 0-.871-5.609 5.84 5.84 0 0 0-4.044-2.879q-1.179-.237-2.957-.525zM933.364 122.3a2.978 2.978 0 0 0-2.275.457 3.027 3.027 0 0 0-1.331 1.91l-4.834 25.343a41.373 41.373 0 0 0-.688 5.468l-.07.9-.441-.084-21.316-33.694-4.665 24.459a2.9 2.9 0 0 0 1.035 2.844 2.969 2.969 0 0 0 1.4.674l.933.178-.093.492-10.119-1.928.094-.49.934.177a2.969 2.969 0 0 0 2.275-.456 2.91 2.91 0 0 0 1.292-1.968l4.862-25.491a38.087 38.087 0 0 0 .677-5.419l.052-.8.491.093 21.316 33.691 4.646-24.361a3.092 3.092 0 0 0-.525-2.314 2.982 2.982 0 0 0-1.949-1.263l-.933-.178.094-.491 10.118 1.93-.094.491zM933.68 157.169a3.035 3.035 0 0 0 2.372-.426 3.216 3.216 0 0 0 1.429-1.964l6.013-27.346a3.211 3.211 0 0 0-.591-2.2 3.07 3.07 0 0 0-1.923-1.267l-.585-.129.058-.5 14.308 3.145a20.891 20.891 0 0 0 3.361.432 13.8 13.8 0 0 0 2.644-.033l-1.353 6.153-.488-.107.193-.879a2.951 2.951 0 0 0-2.1-3.483l-9.962-2.189-3.318 15.089 8.253 1.814a2.5 2.5 0 0 0 1.822-.367 2.377 2.377 0 0 0 1.059-1.559l.15-.683.489.106-1.7 7.716-.488-.107.161-.733a2.357 2.357 0 0 0-.295-1.805 2.41 2.41 0 0 0-1.474-1.092l-8.3-1.825-3.21 14.6 6.983 1.535a8.526 8.526 0 0 0 5.873-.4 12.218 12.218 0 0 0 4.226-4.088l.488.108-4.571 7.288-20.266-4.455.107-.489zM997.444 141.656q3.664 5.883 1.77 13.5t-7.887 11.1q-5.993 3.483-13.756 1.552l-16.449-4.09.121-.486.631.157a3.027 3.027 0 0 0 2.382-.361 3.217 3.217 0 0 0 1.483-1.924l6.757-27.172a2.557 2.557 0 0 0-.458-2.2 3.348 3.348 0 0 0-1.96-1.337l-.582-.145.072-.5 16.45 4.09q7.761 1.932 11.426 7.816zm-21.344-8.735l-7.723 31.054 9.56 2.377a13.781 13.781 0 0 0 7.687-.149 13.354 13.354 0 0 0 6.21-4.252 18.809 18.809 0 0 0 3.743-7.7q1.739-6.986-1.01-12.2a13.116 13.116 0 0 0-8.909-6.749z"
          transform="translate(-127 -76.236)"
        />
      </svg>
    )
  }
}
