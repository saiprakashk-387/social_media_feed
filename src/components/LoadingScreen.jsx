const LoadingScreen = ({ style = {} }) => (
  <div className="min-h-screen flex justify-center items-center" style={style}>
    <svg className="w-40" viewBox="0 0 100 100">
      <g transform="translate(25 50)">
        <circle cx="0" cy="0" r="6" className="fill-secondary">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.3333333333333333s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </g>
      <g transform="translate(50 50)">
        <circle cx="0" cy="0" r="6" className="fill-primary">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.16666666666666666s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </g>
      <g transform="translate(75 50)">
        <circle cx="0" cy="0" r="6" className="fill-secondary">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="0s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </g>
    </svg>
  </div>
);

export default LoadingScreen;
