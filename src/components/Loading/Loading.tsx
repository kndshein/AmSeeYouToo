import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: 'auto',
        backgroundColor: 'rgba(255,255,255,0)',
      }}
      width={100}
      height={100}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
      className={styles.spinner}
    >
      <style>
        {
          '.prefix__ldio-uc5jiwk36sl-st0{opacity:.8;fill:none;stroke-width:.4811;stroke-miterlimit:10}.prefix__ldio-uc5jiwk36sl-st2{opacity:.8}.prefix__ldio-uc5jiwk36sl-st4{fill:none;stroke-width:.4694;stroke-miterlimit:10}'
        }
      </style>
      <g opacity={0.5}>
        <path
          stroke="#2d6472"
          className="prefix__ldio-uc5jiwk36sl-st0"
          d="M41.5 62H30l-5.8 10L30 82h11.5l5.8-10z"
        />
        <path
          stroke="#2d6472"
          className="prefix__ldio-uc5jiwk36sl-st0"
          d="M58.8 72H47.3l-5.8 10 5.8 10h11.5l5.8-10z"
        />
        <path
          stroke="#2d6472"
          className="prefix__ldio-uc5jiwk36sl-st0"
          d="M76.2 62H64.6l-5.8 10 5.8 10h11.6l5.7-10zM41.5 42H30l-5.8 10L30 62h11.5l5.8-10zM58.8 12H47.3l-5.8 10 5.8 10h11.5l5.8-10z"
        />
        <path
          stroke="#2d6472"
          className="prefix__ldio-uc5jiwk36sl-st0"
          d="M58.8 32H47.3l-5.8 10 5.8 10h11.5l5.8-10z"
        />
        <path
          stroke="#2d6472"
          className="prefix__ldio-uc5jiwk36sl-st0"
          d="M76.2 22H64.6l-5.8 10 5.8 10h11.6l5.7-10z"
        />
      </g>
      <g>
        <path
          fill="#66c0cc"
          d="M48.3 56.8l-4.4 1.5c-.9-1.3-1.5-2.7-1.7-4.3l-1.9.3c.5 2.6 1.7 5 3.6 6.9 1.9 1.9 4.3 3.1 6.9 3.6l.3-1.9c-1.6-.3-3-.9-4.3-1.7l1.5-4.4zM57.8 47.2l4.4-1.5c.9 1.3 1.5 2.7 1.7 4.3l1.9-.3c-.5-2.6-1.7-5-3.6-6.9-1.9-1.9-4.3-3.1-6.9-3.6l-.3 1.9c1.6.3 3 .9 4.3 1.7l-1.5 4.4zM62.2 58.2l-4.4-1.5 1.5 4.4c-1.3.9-2.8 1.5-4.3 1.8l.3 1.9c2.6-.5 5-1.7 6.9-3.6 1.9-1.9 3.1-4.3 3.6-6.9l-1.8-.4c-.3 1.6-.9 3-1.8 4.3zM43.9 42.8c-1.9 1.9-3.1 4.3-3.6 6.9l1.9.3c.3-1.6.9-3 1.7-4.3l4.4 1.5-1.5-4.4c1.3-.9 2.7-1.5 4.3-1.7l-.3-1.9c-2.6.5-5 1.7-6.9 3.6z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="4s"
          keyTimes="0;1"
          values="0 53.064 52;360 53.064 52"
        />
      </g>
      <g className="prefix__ldio-uc5jiwk36sl-st2">
        <path
          fill="#66c0cc"
          d="M36 61.9c-1.7-3-2.7-6.4-2.7-9.9 0-10.9 8.8-19.7 19.7-19.7v1c-10.3 0-18.8 8.4-18.8 18.8 0 3.3.9 6.5 2.5 9.4l-.7.4z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="2s"
          keyTimes="0;1"
          values="360 53.064 52;0 53.064 52"
        />
      </g>
      <g className="prefix__ldio-uc5jiwk36sl-st2">
        <path
          fill="#66c0cc"
          d="M57 75.3l-.5-3c9.9-1.7 17.2-10.2 17.2-20.3 0-11.4-9.2-20.6-20.6-20.6S32.5 40.6 32.5 52c0 1.6.2 3.2.5 4.7l-3 .7c-.4-1.8-.6-3.6-.6-5.4 0-13.1 10.6-23.7 23.7-23.7S76.7 38.9 76.7 52c0 11.6-8.3 21.4-19.7 23.3z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1.332s"
          keyTimes="0;1"
          values="0 53.064 52;360 53.064 52"
        />
      </g>
      <g>
        <path
          fill="#66c0cc"
          d="M90.5 45.4c-1.5-8.8-6.2-16.8-13-22.5-3.4-2.9-7.3-5.1-11.4-6.6s-8.5-2.3-13-2.3V20.2c3.7 0 7.4.6 10.9 1.9l.8-2.3c3.7 1.4 7.2 3.4 10.3 5.9l1.2-1.5-1.3 1.6-1.5 1.8c5.7 4.8 9.6 11.5 10.9 18.8l3.8-.7 2.3-.3zM29.7 22l4.7 6.1c3.5-2.8 7.5-4.6 11.9-5.6L44.6 15c-5.4 1.2-10.4 3.5-14.9 7z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="2s"
          keyTimes="0;1"
          values="360 53.064 52;0 53.064 52"
        />
      </g>
      <g className="prefix__ldio-uc5jiwk36sl-st2">
        <path
          fill="#66c0cc"
          d="M53.1 92.4v-1c21.8 0 39.5-17.7 39.5-39.5S74.9 12.4 53.1 12.4c-15.8 0-30 9.4-36.2 23.8l-1-.2c6.4-14.8 21-24.4 37.1-24.4 22.3 0 40.4 18.1 40.4 40.4.1 22.3-18.1 40.4-40.3 40.4z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1.332s"
          keyTimes="0;1"
          values="0 53.064 52;360 53.064 52"
        />
      </g>
      <path
        fill="#fff"
        d="M57.4 51.5h-3.9v-3.8h-.9v3.8h-3.9v1h3.9v3.8h.9v-3.8h3.9z"
      >
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1.332s"
          keyTimes="0;0.4;0.5;0.9;1"
          values="0;0;1;1;0"
        />
      </path>
      <g>
        <path
          fill="#66c0cc"
          d="M39.7 28.5l.6 1c3.9-2.2 8.3-3.4 12.8-3.4V25c-4.7 0-9.4 1.2-13.4 3.5zM28.6 60.6l-1.1.4c3.8 10.8 14.1 18 25.6 18v-1.2c-11 .1-20.8-6.9-24.5-17.2z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="4s"
          keyTimes="0;1"
          values="360 53.064 52;0 53.064 52"
        />
      </g>
      <path
        stroke="#fff"
        fill="none"
        strokeWidth={0.5}
        strokeMiterlimit={10}
        d="M35.5 77.5l-8 12H24"
      />
      <path
        stroke="#fff"
        className="prefix__ldio-uc5jiwk36sl-st4"
        d="M7 86h17v7H7z"
      />
      <g>
        <path
          stroke="#fff"
          className="prefix__ldio-uc5jiwk36sl-st4"
          d="M59 22l10-10h13"
        />
        <circle
          stroke="#fff"
          className="prefix__ldio-uc5jiwk36sl-st4"
          cx={87}
          cy={12}
          r={5}
        />
      </g>
    </svg>
  );
}
